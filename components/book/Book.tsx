'use client'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { store, useBookState } from '@/lib/progress'
import { clamp, easeInOutSine, power2InOut, range } from '@/lib/easing'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { LEAVES } from '@/content/leaves'
import { Face, Leaf } from './Leaf'
import Binding from './Binding'
import PageStack from './PageStack'
import IndexTab from './IndexTab'
import CornerCurl, { type FaceRefs } from './CornerCurl'
import s from './book.module.css'

const N = LEAVES.length

/**
 * Index tabs, each glued to the leaf where its section begins. Staggered along
 * the top edge so they never overlap, on either stack.
 */
const TABS = [
  { label: 'Contents', page: 1, leaf: 1, at: 0.7 },
  { label: 'Projects', page: 8, leaf: 4, at: 0.52 },
]
const MATERIALS = LEAVES.map((l) => ({ front: l.frontMaterial, back: l.backMaterial }))

function useLowPower() {
  const [low, setLow] = useState(false)
  useEffect(() => {
    setLow((navigator.hardwareConcurrency ?? 8) <= 4)
  }, [])
  return low
}

export default function Book() {
  const st = useBookState()
  const reduced = useReducedMotion()
  const lowPower = useLowPower()

  const leafEls = useRef<(HTMLDivElement | null)[]>([])
  const faces = useRef<FaceRefs[]>(LEAVES.map(() => ({ front: null, back: null })))
  const layers = useRef<{ shade: HTMLElement | null; cast: HTMLElement | null }[][]>([])
  const tiltRef = useRef<HTMLDivElement>(null)
  const leavesRef = useRef<HTMLDivElement>(null)
  const shadowL = useRef<HTMLDivElement>(null)
  const shadowR = useRef<HTMLDivElement>(null)
  const stackL = useRef<HTMLDivElement>(null)
  const stackR = useRef<HTMLDivElement>(null)

  const faceRef = useCallback(
    (i: number, side: 'front' | 'back') => (el: HTMLElement | null) => {
      faces.current[i][side] = el
    },
    [],
  )

  // Per-frame: rotate leaves, order them, shade them. Transform + opacity only.
  useEffect(() => {
    const layerOf = (i: number, side: 'front' | 'back') => {
      const f = faces.current[i]?.[side]
      if (!f) return { shade: null, cast: null }
      layers.current[i] ??= []
      const idx = side === 'front' ? 0 : 1
      if (!layers.current[i][idx]) {
        layers.current[i][idx] = {
          shade: f.querySelector<HTMLElement>('[data-shade]'),
          cast: f.querySelector<HTMLElement>('[data-cast]'),
        }
      }
      return layers.current[i][idx]
    }
    const setOp = (el: HTMLElement | null, v: number) => {
      if (!el) return
      const str = v < 0.004 ? '0' : v.toFixed(3)
      if (el.style.opacity !== str) el.style.opacity = str
    }

    return store.onProgress((p) => {
      const active = Math.min(Math.floor(p), N - 1)
      const ts: number[] = []

      for (let k = 0; k < N; k++) {
        const el = leafEls.current[k]
        if (!el) continue
        const raw = clamp(p - k)
        const board = LEAVES[k].kind === 'board'
        const t = reduced ? (raw >= 0.5 ? 1 : 0) : board ? power2InOut(raw) : easeInOutSine(raw)
        ts[k] = t
        const bendAmt = Math.sin(t * Math.PI)
        const bend = board || reduced || bendAmt < 0.001 ? '' : ` rotateZ(${(-0.9 * bendAmt).toFixed(3)}deg) skewY(${(-0.6 * bendAmt).toFixed(3)}deg)`
        el.style.transform = `rotateY(${(-180 * t).toFixed(3)}deg)${bend}`

        const turned = reduced ? raw >= 0.5 : raw >= 1
        const turning = !reduced && raw > 0 && raw < 1
        el.style.zIndex = String(turning ? 100 : turned ? k + 1 : N - k)
        el.style.willChange = Math.abs(p - k - 0.5) < 1.6 ? 'transform' : 'auto'

        // Only the leaves around the active one need painting.
        const vis = k >= active - 1 && k <= active + 2 ? 'visible' : 'hidden'
        const f = faces.current[k]
        if (f.front && f.front.style.visibility !== vis) f.front.style.visibility = vis
        if (f.back && f.back.style.visibility !== vis) f.back.style.visibility = vis
      }

      // Shading: turning page darkens toward the spine; revealed & covered pages catch its shadow.
      for (let k = 0; k < N; k++) {
        const turningAmt = reduced ? 0 : Math.sin(ts[k] * Math.PI)
        const strong = LEAVES[k].kind === 'board' ? 1 : 0.85
        setOp(layerOf(k, 'front').shade, turningAmt * strong)
        setOp(layerOf(k, 'back').shade, turningAmt * strong)
        const prevT = k > 0 ? ts[k - 1] : 0
        const nextT = k < N - 1 ? ts[k + 1] : 0
        const prevBoard = k > 0 && LEAVES[k - 1].kind === 'board' ? 1.15 : 0.9
        setOp(layerOf(k, 'front').cast, reduced ? 0 : Math.sin(prevT * Math.PI) * prevBoard)
        setOp(layerOf(k, 'back').cast, reduced || nextT < 0.5 ? 0 : Math.sin(nextT * Math.PI) * 0.9)
      }

      // Stacks, desk shadows, tilt.
      if (stackR.current) stackR.current.style.transform = `scaleX(${clamp((N - 1 - p) / (N - 1)).toFixed(3)})`
      if (stackL.current) stackL.current.style.transform = `scaleX(${clamp((p - 1) / (N - 1)).toFixed(3)})`
      if (shadowR.current) shadowR.current.style.opacity = clamp(N - p).toFixed(3)
      if (shadowL.current) shadowL.current.style.opacity = clamp(p).toFixed(3)

      if (tiltRef.current) {
        const tilt = reduced ? 0 : -2 * (1 - range(p, 0, 0.25)) + 2 * range(p, N - 0.6, N)
        const origin = p < N / 2 ? 0.5 : -0.5
        tiltRef.current.style.transform = `rotate(${tilt.toFixed(3)}deg)`
        tiltRef.current.style.transformOrigin = `calc(var(--page-w) * ${origin}) 50%`
      }
    })
  }, [reduced])

  // Reduced motion: a 200ms crossfade whenever the spread changes.
  const lastSpread = useRef(st.spread)
  useEffect(() => {
    if (reduced && lastSpread.current !== st.spread) {
      leavesRef.current?.animate([{ opacity: 0.2 }, { opacity: 1 }], { duration: 200, easing: 'ease-out' })
    }
    lastSpread.current = st.spread
  }, [st.spread, reduced])

  // Keyboard turns move focus to the new spread's first heading.
  useEffect(() => {
    if (!st.atRest || !st.viaKeyboard) return
    const sp = st.settled
    const candidates = [faces.current[sp - 1]?.back, faces.current[sp]?.front].filter(Boolean) as HTMLElement[]
    for (const f of candidates) {
      const h = f.querySelector<HTMLElement>('[data-content] :is(h1, h2, h3)')
      if (h) {
        h.tabIndex = -1
        h.focus({ preventScroll: true })
        break
      }
    }
  }, [st.atRest, st.settled, st.viaKeyboard])

  // The one-time "you can open me" corner lift.
  useEffect(() => {
    if (st.deepLinked) return
    let hinted = false
    try {
      hinted = sessionStorage.getItem('book-hinted') === '1'
    } catch {}
    if (hinted) return
    const id = setTimeout(() => {
      if (store.progress !== 0 || !store.state.atRest) return
      store.emit('hint')
      try {
        sessionStorage.setItem('book-hinted', '1')
      } catch {}
    }, 400 + 900 + 2500)
    return () => clearTimeout(id)
  }, [st.deepLinked])

  // Which faces are "on the desk" right now (the rest are inert for AT and tab order).
  const shown = st.atRest ? st.settled : st.spread
  const nearby = (k: number) => Math.abs(k - shown) <= 2

  const leaves = useMemo(() => LEAVES, [])

  return (
    <div className={`${s.bookPos} ${st.deepLinked ? s.noIntro : ''} ${st.riffling ? s.fast : ''} ${lowPower ? s.lowPower : ''} ${reduced ? s.reduced : ''}`}>
      <div className={s.intro}>
        <div ref={tiltRef} className={s.tilt}>
          <div className={s.shadowBlur} />
          <div ref={shadowR} className={`${s.shadow} ${s.shadowRight}`} />
          <div ref={shadowL} className={`${s.shadow} ${s.shadowLeft}`} />
          <div ref={leavesRef} className={s.leaves}>
            <PageStack side="left" ref={stackL} />
            <PageStack side="right" ref={stackR} />
            {leaves.map((leaf, k) => (
              <Leaf key={k} index={k} leafRef={(el) => (leafEls.current[k] = el)}>
                <Face
                  side="front"
                  material={leaf.frontMaterial}
                  Content={leaf.front}
                  Reverse={leaf.back}
                  showThrough={leaf.kind === 'paper' && nearby(k)}
                  hidden={k !== shown}
                  faceRef={faceRef(k, 'front')}
                />
                <Face
                  side="back"
                  material={leaf.backMaterial}
                  Content={leaf.back}
                  Reverse={leaf.front}
                  showThrough={leaf.kind === 'paper' && nearby(k)}
                  hidden={k !== shown - 1}
                  faceRef={faceRef(k, 'back')}
                />
                {TABS.filter((t) => t.leaf === k).map((t) => (
                  <IndexTab key={t.label} label={t.label} page={t.page} at={t.at} />
                ))}
              </Leaf>
            ))}
          </div>
          <Binding />
          <CornerCurl faces={faces} materials={MATERIALS} />
        </div>
      </div>
    </div>
  )
}
