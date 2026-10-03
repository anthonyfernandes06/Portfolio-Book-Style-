'use client'
/**
 * Paper sounds, synthesised live with Web Audio (no audio files).
 *
 * A single turn is three layers: the page lifting off (a dry crinkle), the
 * swish of air as it swings over (band-passed noise sweeping up then down),
 * and the soft slap as it lands. A riffle is many short flicks that speed
 * up and slow down, over a bed of moving air, ending in one heavier landing.
 *
 * Browsers only allow audio after the visitor interacts (click, tap, key),
 * so the AudioContext is created lazily and unlocked on the first gesture.
 */

type Kind = 'paper' | 'board'

const STORAGE_KEY = 'book-sound'
const MASTER = 3.2

let ctx: AudioContext | null = null
let master: GainNode | null = null
let noise: AudioBuffer | null = null
let enabled = true
let unlocked = false
let lastTurn = -Infinity
const listeners = new Set<(on: boolean) => void>()

try {
  if (typeof window !== 'undefined') enabled = localStorage.getItem(STORAGE_KEY) !== 'off'
} catch {}

function audio() {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!AC) return null
    ctx = new AC()
    const comp = ctx.createDynamicsCompressor()
    comp.threshold.value = -18
    comp.ratio.value = 3
    master = ctx.createGain()
    master.gain.value = MASTER
    master.connect(comp).connect(ctx.destination)
    // Two seconds of white noise, shared by every sound.
    noise = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate)
    const d = noise.getChannelData(0)
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
  }
  return ctx
}

/** Call once on the client: unlocks audio on the visitor's first gesture. */
export function initSound() {
  const unlock = () => {
    const a = audio()
    if (!a) return
    a.resume().then(() => {
      unlocked = true
    }).catch(() => {})
    if (a.state === 'running') unlocked = true
  }
  // Capture phase, so audio is unlocked before the same gesture turns a page.
  const events = ['pointerdown', 'keydown', 'touchstart', 'wheel'] as const
  events.forEach((e) => window.addEventListener(e, unlock, { passive: true, capture: true }))
  return () => events.forEach((e) => window.removeEventListener(e, unlock, { capture: true }))
}

export function isSoundOn() {
  return enabled
}

export function setSoundOn(on: boolean) {
  enabled = on
  try {
    localStorage.setItem(STORAGE_KEY, on ? 'on' : 'off')
  } catch {}
  listeners.forEach((fn) => fn(on))
}

export function onSoundChange(fn: (on: boolean) => void) {
  listeners.add(fn)
  return () => {
    listeners.delete(fn)
  }
}

function ready() {
  if (!enabled) return null
  const a = audio()
  if (!a || !master || !noise) return null
  if (a.state !== 'running') {
    // Before any real gesture the browser won't play audio; don't queue sounds
    // that would all fire at once later. After one, resuming is allowed.
    const activated =
      unlocked || (navigator as Navigator & { userActivation?: { hasBeenActive: boolean } }).userActivation?.hasBeenActive
    if (!activated) return null
    a.resume().catch(() => {})
  }
  return a
}

const rand = (a: number, b: number) => a + Math.random() * (b - a)

/** A burst of filtered noise with its own envelope. */
function burst(
  a: AudioContext,
  t: number,
  opts: {
    dur: number
    gain: number
    type: BiquadFilterType
    freq: number
    freqEnd?: number
    q?: number
    attack?: number
    pan?: number
  },
) {
  const src = a.createBufferSource()
  src.buffer = noise
  src.playbackRate.value = rand(0.9, 1.1)
  const f = a.createBiquadFilter()
  f.type = opts.type
  f.Q.value = opts.q ?? 0.8
  f.frequency.setValueAtTime(opts.freq, t)
  if (opts.freqEnd) f.frequency.exponentialRampToValueAtTime(opts.freqEnd, t + opts.dur)
  const g = a.createGain()
  const atk = opts.attack ?? 0.004
  g.gain.setValueAtTime(0.0001, t)
  g.gain.exponentialRampToValueAtTime(opts.gain, t + atk)
  g.gain.exponentialRampToValueAtTime(0.0001, t + opts.dur)
  const p = a.createStereoPanner()
  p.pan.value = opts.pan ?? 0
  src.connect(f).connect(g).connect(p).connect(master!)
  const offset = Math.random() * 1.5
  src.start(t, offset, opts.dur + 0.05)
}

/** One page turning, lift to landing. `dur` roughly matches the visual turn. */
export function playPageTurn(kind: Kind = 'paper', dur = 0.6, direction: 1 | -1 = 1) {
  const a = ready()
  if (!a) return
  const now = a.currentTime
  if (now - lastTurn < 0.09) return
  lastTurn = now
  const t = now + 0.005
  const board = kind === 'board'
  const len = Math.min(Math.max(dur, 0.35), 0.8)
  // Pages travel across the stereo field in the direction they turn.
  const from = 0.35 * direction
  const to = -0.35 * direction

  if (!board) {
    // Lift: a few dry crinkles as the paper leaves the stack.
    const crinkles = 3 + Math.floor(Math.random() * 3)
    for (let i = 0; i < crinkles; i++) {
      burst(a, t + i * rand(0.012, 0.03), {
        dur: rand(0.012, 0.03),
        gain: rand(0.05, 0.12),
        type: 'bandpass',
        freq: rand(3500, 6500),
        q: rand(1.5, 3),
        pan: from,
      })
    }
  } else {
    // Board: a low creak of the cover hinge.
    burst(a, t, { dur: 0.12, gain: 0.08, type: 'bandpass', freq: 380, freqEnd: 260, q: 4, pan: from })
  }

  // Swish: air moving past the page, rising then falling.
  const swishDur = len * 0.85
  const lo = board ? 500 : 900
  const hi = board ? 1500 : 3200
  const src = a.createBufferSource()
  src.buffer = noise
  const f = a.createBiquadFilter()
  f.type = 'bandpass'
  f.Q.value = board ? 0.9 : 0.7
  f.frequency.setValueAtTime(lo, t)
  f.frequency.exponentialRampToValueAtTime(hi * rand(0.9, 1.1), t + swishDur * 0.45)
  f.frequency.exponentialRampToValueAtTime(lo * 1.2, t + swishDur)
  const g = a.createGain()
  const peak = board ? 0.16 : rand(0.13, 0.18)
  g.gain.setValueAtTime(0.0001, t)
  g.gain.exponentialRampToValueAtTime(peak, t + swishDur * 0.4)
  g.gain.exponentialRampToValueAtTime(0.0001, t + swishDur)
  const p = a.createStereoPanner()
  p.pan.setValueAtTime(from, t)
  p.pan.linearRampToValueAtTime(to, t + swishDur)
  src.connect(f).connect(g).connect(p).connect(master!)
  src.start(t, Math.random() * 1.2, swishDur + 0.05)

  // A little flutter of the paper edge mid-swing.
  if (!board) {
    for (let i = 0; i < 4; i++) {
      burst(a, t + swishDur * rand(0.25, 0.6), {
        dur: rand(0.01, 0.025),
        gain: rand(0.02, 0.05),
        type: 'highpass',
        freq: rand(4000, 7000),
        pan: 0,
      })
    }
  }

  // Landing: a soft slap of paper on paper (a heavier thud for a cover).
  const land = t + swishDur * 0.92
  burst(a, land, {
    dur: board ? 0.14 : 0.07,
    gain: board ? 0.4 : 0.16,
    type: 'lowpass',
    freq: board ? 380 : 900,
    attack: 0.002,
    pan: to,
  })
  burst(a, land, {
    dur: board ? 0.05 : 0.035,
    gain: board ? 0.08 : 0.07,
    type: 'bandpass',
    freq: board ? 1800 : 2800,
    q: 1.2,
    pan: to,
  })
}

/** Many pages flicking past at once (Contents, Projects, cross-references). */
export function playRiffle(pages: number, dur: number, direction: 1 | -1 = 1) {
  const a = ready()
  if (!a) return
  const t = a.currentTime + 0.01
  lastTurn = a.currentTime + dur
  const flicks = Math.max(4, Math.min(pages * 2, 40))
  const from = 0.3 * direction

  // Bed of moving air under the whole riffle.
  const src = a.createBufferSource()
  src.buffer = noise
  const f = a.createBiquadFilter()
  f.type = 'bandpass'
  f.Q.value = 0.6
  f.frequency.setValueAtTime(1200, t)
  f.frequency.exponentialRampToValueAtTime(2600, t + dur * 0.5)
  f.frequency.exponentialRampToValueAtTime(1100, t + dur)
  const g = a.createGain()
  g.gain.setValueAtTime(0.0001, t)
  g.gain.exponentialRampToValueAtTime(0.1, t + dur * 0.25)
  g.gain.setValueAtTime(0.1, t + dur * 0.7)
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  src.connect(f).connect(g).connect(master!)
  src.start(t, 0, dur + 0.05)

  // Flicks: dense in the middle, sparse at the ends, like a thumb riffling.
  for (let i = 0; i < flicks; i++) {
    const u = (i + rand(-0.3, 0.3)) / flicks
    const eased = u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2
    const at = t + Math.max(0, eased) * dur * 0.9
    burst(a, at, {
      dur: rand(0.018, 0.04),
      gain: rand(0.06, 0.13),
      type: 'bandpass',
      freq: rand(2500, 5500),
      q: rand(0.8, 1.8),
      pan: from - (2 * from * i) / flicks + rand(-0.1, 0.1),
    })
    // A tiny tick as each page edge slips off the thumb.
    if (Math.random() < 0.6) {
      burst(a, at + 0.004, { dur: 0.008, gain: rand(0.03, 0.06), type: 'highpass', freq: 6000, pan: 0 })
    }
  }

  // The last page settling.
  burst(a, t + dur * 0.95, { dur: 0.08, gain: 0.2, type: 'lowpass', freq: 800, attack: 0.002 })
  burst(a, t + dur * 0.95, { dur: 0.035, gain: 0.07, type: 'bandpass', freq: 2600, q: 1.2 })
}

/**
 * A sheet sliding out of the folder (direction 1) or back into it (-1):
 * a crinkle as it's picked up, then a long, soft brush of paper on card.
 */
export function playPaperSlide(direction: 1 | -1 = 1) {
  const a = ready()
  if (!a) return
  const t = a.currentTime + 0.005
  lastTurn = a.currentTime
  const out = direction > 0
  const dur = out ? 0.5 : 0.42

  if (out) {
    for (let i = 0; i < 3; i++) {
      burst(a, t + i * rand(0.015, 0.03), { dur: rand(0.012, 0.025), gain: rand(0.04, 0.08), type: 'bandpass', freq: rand(3500, 6000), q: 2 })
    }
  }

  // The slide: friction noise, brightest mid-way, fading as the sheet comes free.
  const start = t + (out ? 0.05 : 0)
  const src = a.createBufferSource()
  src.buffer = noise
  const f = a.createBiquadFilter()
  f.type = 'bandpass'
  f.Q.value = 0.6
  f.frequency.setValueAtTime(out ? 1400 : 2600, start)
  f.frequency.exponentialRampToValueAtTime(out ? 3000 : 1300, start + dur)
  const g = a.createGain()
  g.gain.setValueAtTime(0.0001, start)
  g.gain.exponentialRampToValueAtTime(0.07, start + dur * 0.35)
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur)
  src.connect(f).connect(g).connect(master!)
  src.start(start, Math.random() * 1.2, dur + 0.05)

  // Putting it back ends with a soft tap as it settles in the folder.
  if (!out) {
    burst(a, start + dur * 0.9, { dur: 0.06, gain: 0.12, type: 'lowpass', freq: 700, attack: 0.002 })
  }
}
