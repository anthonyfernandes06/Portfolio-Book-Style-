'use client'
/**
 * The book's single source of truth: a float `progress` (integer = resting spread)
 * derived from scroll position. Lenis smooths the scroll, GSAP's ticker drives it,
 * ScrollTrigger keeps in sync, and a directional snap guarantees the book never
 * rests half-turned. Everything that moves reads from here.
 */
import { useSyncExternalStore } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { clamp, easeInOutCubic, power2InOut, power3InOut } from './easing'
import { playPageTurn, playRiffle } from './sound'

export type Mode = 'spread' | 'single'

type Config = {
  /** Number of turns: spreads run 0..steps. */
  steps: number
  /** Scroll distances, in viewport heights. */
  heroDwell: number
  turn: number
  endDwell: number
  /** Page number (as printed) → spread index. */
  pageToSpread: (page: number) => number
  spreadToHash: (spread: number) => string
}

export const CONFIGS: Record<Mode, Config> = {
  // 15 leaves → spreads 0 (closed, cover) … 15 (closed, back cover)
  spread: {
    steps: 15,
    heroDwell: 0.4,
    turn: 1,
    endDwell: 0.6,
    pageToSpread: (p) => (p <= 0 ? 0 : Math.floor(p / 2) + 1),
    spreadToHash: (s) => (s <= 0 ? '' : s >= 15 ? '#back-cover' : s === 1 ? '#p-1' : `#p-${2 * s - 2}`),
  },
  // One face per step: cover, inside cover, p.1 … p.27, back cover
  single: {
    steps: 29,
    heroDwell: 0.4,
    turn: 0.8,
    endDwell: 0.6,
    pageToSpread: (p) => (p <= 0 ? 0 : p + 1),
    spreadToHash: (s) => (s <= 0 ? '' : s >= 29 ? '#back-cover' : s === 1 ? '#inside-cover' : `#p-${s - 1}`),
  },
}

export type BookState = {
  /** Nearest spread to the current progress. */
  spread: number
  /** Last spread the book came to rest on. */
  settled: number
  /** True while the book is at rest on `settled`. */
  atRest: boolean
  /** A fast multi-page jump is in flight. */
  riffling: boolean
  /** The last turn came from the keyboard (for focus management). */
  viaKeyboard: boolean
  /** Visitor arrived on a deep link: skip the intro. */
  deepLinked: boolean
  mode: Mode
}

type ProgressFn = (p: number) => void
type EventName = 'hint'

class BookStore {
  progress = 0
  cfg: Config = CONFIGS.spread
  state: BookState = {
    spread: 0,
    settled: 0,
    atRest: true,
    riffling: false,
    viaKeyboard: false,
    deepLinked: false,
    mode: 'spread',
  }
  private progressFns = new Set<ProgressFn>()
  private stateFns = new Set<() => void>()
  private eventFns = new Map<EventName, Set<() => void>>()

  onProgress(fn: ProgressFn) {
    this.progressFns.add(fn)
    fn(this.progress)
    return () => {
      this.progressFns.delete(fn)
    }
  }

  setProgress(p: number) {
    const prev = this.progress
    this.progress = p
    this.turnSound(prev, p)
    this.progressFns.forEach((fn) => fn(p))
    const spread = Math.round(p)
    if (spread !== this.state.spread) this.patch({ spread })
  }

  /** True while a click/key turn is in flight; it already played its own sound. */
  soundLock = false

  kindOf(k: number): 'board' | 'paper' {
    return k === 0 || k === this.cfg.steps - 1 ? 'board' : 'paper'
  }

  /**
   * Scroll-driven turns sound once the page has lifted far enough to commit
   * (the same 15% point the snap uses), so a nudge that falls back is silent.
   * Jumps (deep links, resizes) and riffles are skipped; riffles have their own sound.
   */
  private turnSound(prev: number, p: number) {
    if (this.state.riffling || this.soundLock || Math.abs(p - prev) > 1) return
    const T = 0.15
    const last = this.cfg.steps - 1
    if (p > prev) {
      const k = Math.floor(p - T)
      if (k >= 0 && prev < k + T && p >= k + T) playPageTurn(this.kindOf(k), 0.6, 1)
    } else if (p < prev) {
      const k = Math.floor(prev - (1 - T))
      if (k >= 0 && k <= last && prev > k + 1 - T && p <= k + 1 - T) playPageTurn(this.kindOf(k), 0.6, -1)
    }
  }

  patch(next: Partial<BookState>) {
    this.state = { ...this.state, ...next }
    this.stateFns.forEach((fn) => fn())
  }

  subscribe = (fn: () => void) => {
    this.stateFns.add(fn)
    return () => {
      this.stateFns.delete(fn)
    }
  }
  getState = () => this.state

  on(name: EventName, fn: () => void) {
    if (!this.eventFns.has(name)) this.eventFns.set(name, new Set())
    this.eventFns.get(name)!.add(fn)
    return () => {
      this.eventFns.get(name)!.delete(fn)
    }
  }
  emit(name: EventName) {
    this.eventFns.get(name)?.forEach((fn) => fn())
  }
}

export const store = new BookStore()

const SERVER_STATE = store.state
export function useBookState() {
  return useSyncExternalStore(store.subscribe, store.getState, () => SERVER_STATE)
}

/* ------------------------------------------------------------------ */
/* Engine                                                              */
/* ------------------------------------------------------------------ */

let lenis: Lenis | null = null
let programmatic = false
let target = 0
let snapTimer: ReturnType<typeof setTimeout> | undefined
let safetyTimer: ReturnType<typeof setTimeout> | undefined

const vh = () => window.innerHeight

/** Total scroll distance in viewport heights (excluding the sticky stage itself). */
export function scrollLengthVh(mode: Mode) {
  const c = CONFIGS[mode]
  return c.heroDwell + c.steps * c.turn + c.endDwell
}

const maxScroll = () => Math.max(0, document.documentElement.scrollHeight - vh())

function spreadToY(n: number) {
  const c = store.cfg
  if (n <= 0) return 0
  if (n >= c.steps) return maxScroll()
  return (c.heroDwell + n * c.turn) * vh()
}

function yToProgress(y: number) {
  const c = store.cfg
  return clamp((y - c.heroDwell * vh()) / (c.turn * vh()), 0, c.steps)
}

function settle(n: number) {
  store.patch({ settled: n, atRest: true })
  store.setProgress(n)
  const hash = store.cfg.spreadToHash(n)
  const url = window.location.pathname + window.location.search + hash
  history.replaceState(null, '', url)
}

type GoOptions = { duration?: number; easing?: (t: number) => number; keyboard?: boolean }

function go(n: number, opts: GoOptions = {}) {
  if (!lenis) return
  n = clamp(Math.round(n), 0, store.cfg.steps)
  const y = spreadToY(n)
  const from = store.state.settled
  const pages = Math.abs(n - (programmatic ? target : from))
  const riffle = pages > 1 && opts.duration === undefined
  const duration =
    opts.duration ?? (riffle ? clamp(0.12 * pages, 0.6, 1.8) : reducedMotion() ? 0.35 : 0.9)
  const easing = opts.easing ?? (riffle ? power3InOut : easeInOutCubic)

  clearTimeout(snapTimer)
  store.patch({ viaKeyboard: !!opts.keyboard, riffling: riffle })
  const moving = Math.abs(lenis.scroll - y) >= 1
  if (riffle && moving) playRiffle(pages, duration, n > from ? 1 : -1)
  // Click and keyboard turns sound straight away; snaps finish a scroll turn that already sounded.
  store.soundLock = !riffle && moving && opts.duration === undefined
  if (store.soundLock) {
    const dir = n > store.progress ? 1 : -1
    playPageTurn(store.kindOf(dir > 0 ? Math.floor(store.progress) : Math.ceil(store.progress) - 1), duration, dir)
  }

  if (Math.abs(lenis.scroll - y) < 1) {
    programmatic = false
    store.patch({ riffling: false })
    settle(n)
    return
  }

  programmatic = true
  target = n
  const done = () => {
    clearTimeout(safetyTimer)
    if (!programmatic || target !== n) return
    programmatic = false
    store.soundLock = false
    store.patch({ riffling: false })
    settle(n)
  }
  clearTimeout(safetyTimer)
  safetyTimer = setTimeout(done, duration * 1000 + 400)
  lenis.scrollTo(y, { duration, easing, lock: true, force: true, onComplete: done })
}

/** Directional snap: a small push in either direction finishes the turn. */
function snap() {
  if (!lenis || programmatic) return
  const c = store.cfg
  const y = lenis.scroll
  const ys = Array.from({ length: c.steps + 1 }, (_, i) => spreadToY(i))
  let k = 0
  while (k < c.steps - 1 && y > ys[k + 1]) k++
  const span = ys[k + 1] - ys[k]
  const frac = clamp((y - ys[k]) / span)
  const restY = ys[store.state.settled]

  let t: number
  if (Math.abs(y - restY) < 2) t = store.state.settled
  else if (y > restY) t = frac > 0.15 ? k + 1 : k
  else t = 1 - frac > 0.15 ? k : k + 1

  const d = Math.abs(t - (k + frac))
  go(t, { duration: clamp(0.35 + 0.4 * d, 0.35, 0.7), easing: power2InOut })
}

function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function scrollToSpread(n: number, opts?: GoOptions) {
  go(n, opts)
}

export function scrollToPage(page: number) {
  go(store.cfg.pageToSpread(page))
}

export function turnNext(keyboard = false) {
  go((programmatic ? target : store.state.settled) + 1, { keyboard })
}

export function turnPrev(keyboard = false) {
  go((programmatic ? target : store.state.settled) - 1, { keyboard })
}

function parseHash(): number | null {
  const h = window.location.hash.replace('#', '')
  if (!h) return null
  if (h === 'back-cover') return store.cfg.steps
  if (h === 'contents') return store.cfg.pageToSpread(1)
  if (h === 'inside-cover') return 1
  const m = h.match(/^p-(\d+)$/)
  if (m) return clamp(store.cfg.pageToSpread(parseInt(m[1], 10)), 0, store.cfg.steps)
  return null
}

function onKey(e: KeyboardEvent) {
  const el = e.target as HTMLElement | null
  if (el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) return
  if (e.metaKey || e.ctrlKey || e.altKey) return
  const k = e.key
  if (k === 'ArrowRight' || k === 'PageDown' || (k === ' ' && !e.shiftKey)) {
    e.preventDefault()
    turnNext(true)
  } else if (k === 'ArrowLeft' || k === 'PageUp' || (k === ' ' && e.shiftKey)) {
    e.preventDefault()
    turnPrev(true)
  } else if (k === 'Home') {
    e.preventDefault()
    go(0, { keyboard: true })
  } else if (k === 'End') {
    e.preventDefault()
    go(store.cfg.steps, { keyboard: true })
  } else if (k === 'ArrowDown' || k === 'ArrowUp') {
    // Arrow keys scroll by a sliver natively; make them turn pages instead.
    e.preventDefault()
    if (k === 'ArrowDown') turnNext(true)
    else turnPrev(true)
  }
}

export function initEngine(mode: Mode) {
  gsap.registerPlugin(ScrollTrigger)
  store.cfg = CONFIGS[mode]
  store.patch({ mode })
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

  lenis = new Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 0.9 })
  const l = lenis

  const tick = (time: number) => l.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)

  const trigger = ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => store.setProgress(yToProgress(self.scroll())),
  })

  l.on('scroll', () => {
    ScrollTrigger.update()
    store.setProgress(yToProgress(l.scroll))
    if (programmatic) return
    if (store.state.atRest && Math.abs(l.scroll - spreadToY(store.state.settled)) < 2) return
    if (store.state.atRest) store.patch({ atRest: false })
    clearTimeout(snapTimer)
    snapTimer = setTimeout(snap, 120)
  })

  // Deep link: jump straight to the spread, no intro.
  const fromHash = parseHash()
  if (fromHash !== null && fromHash > 0) {
    store.patch({ deepLinked: true })
    requestAnimationFrame(() => {
      l.scrollTo(spreadToY(fromHash), { immediate: true, force: true })
      settle(fromHash)
    })
  } else {
    l.scrollTo(0, { immediate: true, force: true })
    settle(0)
  }

  let resizeTimer: ReturnType<typeof setTimeout> | undefined
  const onResize = () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      l.resize()
      ScrollTrigger.refresh()
      l.scrollTo(spreadToY(store.state.settled), { immediate: true, force: true })
      store.setProgress(store.state.settled)
    }, 120)
  }

  window.addEventListener('keydown', onKey)
  window.addEventListener('resize', onResize)
  if (process.env.NODE_ENV !== 'production') Object.assign(window, { __book: { store, go } })

  return () => {
    window.removeEventListener('keydown', onKey)
    window.removeEventListener('resize', onResize)
    clearTimeout(snapTimer)
    clearTimeout(safetyTimer)
    gsap.ticker.remove(tick)
    trigger.kill()
    l.destroy()
    lenis = null
    programmatic = false
  }
}
