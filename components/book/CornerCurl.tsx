'use client'
import { useCallback, useEffect, useRef, type PointerEvent, type RefObject } from 'react'
import { store, turnNext, turnPrev, useBookState } from '@/lib/progress'
import { clamp } from '@/lib/easing'
import { useReducedMotion } from '@/lib/useReducedMotion'
import type { Material } from './Leaf'
import s from './book.module.css'

export type FaceRefs = { front: HTMLElement | null; back: HTMLElement | null }

type Spot = 'next' | 'prev' | 'spine'
type Spec = { spot: Spot; leaf: number; side: 'front' | 'back'; corner: 'tr' | 'tl'; material: Material }

type Props = {
  faces: RefObject<FaceRefs[]>
  materials: { front: Material; back: Material }[]
}

/**
 * Dog-ear corners. Hovering the top outer corner peels it back on a spring
 * (stiffness 260, damping 18); clicking turns the page via the scroll engine,
 * so clicks and scrolling always agree.
 */
export default function CornerCurl({ faces, materials }: Props) {
  const st = useBookState()
  const reduced = useReducedMotion()
  const N = materials.length
  const flapWrap = useRef<HTMLDivElement>(null)
  const sim = useRef({ c: 0, v: 0, target: 0, spec: null as Spec | null, raf: 0, last: 0 })
  const touchTurn = useRef(false)
  const reducedRef = useRef(reduced)
  reducedRef.current = reduced

  const s0 = st.settled
  const ready = st.atRest && !st.riffling
  const specs: Partial<Record<Spot, Spec>> = {}
  if (s0 < N) specs.next = { spot: 'next', leaf: s0, side: 'front', corner: 'tr', material: materials[s0].front }
  if (s0 >= 1 && s0 < N) specs.prev = { spot: 'prev', leaf: s0 - 1, side: 'back', corner: 'tl', material: materials[s0 - 1].back }
  if (s0 === N) specs.spine = { spot: 'spine', leaf: N - 1, side: 'back', corner: 'tr', material: materials[N - 1].back }

  const pageW = () => faces.current?.[0]?.front?.offsetWidth ?? 450

  const apply = useCallback(() => {
    const { c, spec } = sim.current
    const wrap = flapWrap.current
    if (!spec || !wrap) return
    const face = faces.current?.[spec.leaf]?.[spec.side]
    const W = pageW()
    const px = Math.max(0, c)
    if (face) {
      face.style.setProperty('--curl', `${px}px`)
      if (px > 0.5) face.dataset.curl = spec.corner
      else delete face.dataset.curl
    }
    const left = spec.spot === 'next' ? W - px : spec.spot === 'prev' ? -W : -px
    wrap.style.width = `${px}px`
    wrap.style.height = `${px}px`
    wrap.style.transform = `translateX(${left}px)`
    wrap.style.opacity = px > 0.5 ? '1' : '0'
    wrap.dataset.corner = spec.corner
    wrap.dataset.material = spec.material
  }, [faces])

  const step = useCallback(
    (now: number) => {
      const m = sim.current
      const dt = Math.min(0.032, (now - (m.last || now)) / 1000 || 0.016)
      m.last = now
      const a = -260 * (m.c - m.target) - 18 * m.v
      m.v += a * dt
      m.c += m.v * dt
      apply()
      if (Math.abs(m.c - m.target) < 0.05 && Math.abs(m.v) < 0.05) {
        m.c = m.target
        apply()
        m.raf = 0
        m.last = 0
        return
      }
      m.raf = requestAnimationFrame(step)
    },
    [apply],
  )

  const kick = useCallback(() => {
    if (!sim.current.raf) sim.current.raf = requestAnimationFrame(step)
  }, [step])

  const setSpec = useCallback(
    (spec: Spec | null) => {
      const m = sim.current
      if (m.spec && (!spec || m.spec.leaf !== spec.leaf || m.spec.side !== spec.side)) {
        const old = faces.current?.[m.spec.leaf]?.[m.spec.side]
        if (old) delete old.dataset.curl
        m.c = 0
        m.v = 0
      }
      if (spec) m.spec = spec
    },
    [faces],
  )

  const peel = useCallback(
    (spec: Spec, amount: number) => {
      setSpec(spec)
      if (reducedRef.current) {
        sim.current.c = sim.current.target = amount
        apply()
        return
      }
      sim.current.target = amount
      kick()
    },
    [apply, kick, setSpec],
  )

  const release = useCallback(() => {
    sim.current.target = 0
    if (reducedRef.current) {
      sim.current.c = 0
      apply()
      return
    }
    kick()
  }, [apply, kick])

  // Leaving rest (a turn began) drops any curl so the leaf rotation takes over.
  useEffect(() => {
    if (!ready) release()
  }, [ready, release])

  // One-time hint on the cover.
  useEffect(
    () =>
      store.on('hint', () => {
        const spec = { spot: 'next', leaf: 0, side: 'front', corner: 'tr', material: materials[0].front } as Spec
        peel(spec, pageW() * 0.075)
        setTimeout(release, 650)
      }),
    [materials, peel, release],
  )

  useEffect(() => () => cancelAnimationFrame(sim.current.raf), [])

  const onMove = (spec: Spec) => (e: PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    // distance from the page corner, 0 (at the corner) … ~1.4 (far edge of hotspot)
    const cx = spec.corner === 'tr' ? r.right : r.left
    const d = Math.hypot(e.clientX - cx, e.clientY - r.top) / r.width
    const W = pageW()
    peel(spec, W * 0.09 + clamp(d - 0.6, -0.6, 0.6) * 2 * W * 0.015 * 1.6)
  }

  const onDown = (spec: Spec) => (e: PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType === 'mouse') return
    touchTurn.current = true
    peel(spec, pageW() * 0.09)
    setTimeout(() => (spec.spot === 'next' ? turnNext() : turnPrev()), 180)
  }

  const onClick = (spec: Spec) => () => {
    if (touchTurn.current) {
      touchTurn.current = false
      return
    }
    if (spec.spot === 'next') turnNext()
    else turnPrev()
  }

  const spotClass = { next: s.hotNext, prev: s.hotPrev, spine: s.hotSpine }
  const labels = { next: 'Turn to next page', prev: 'Turn to previous page', spine: 'Open the book again' }

  return (
    <div className={s.curlLayer}>
      <div ref={flapWrap} className={s.flapWrap} style={{ opacity: 0 }} aria-hidden>
        <div className={s.flap} />
      </div>
      {ready &&
        (Object.values(specs) as Spec[]).map((spec) => (
          <button
            key={spec.spot}
            className={`${s.hotspot} ${spotClass[spec.spot]}`}
            aria-label={labels[spec.spot]}
            onPointerEnter={(e) => e.pointerType === 'mouse' && peel(spec, pageW() * 0.09)}
            onPointerMove={onMove(spec)}
            onPointerLeave={release}
            onPointerDown={onDown(spec)}
            onFocus={() => peel(spec, pageW() * 0.06)}
            onBlur={release}
            onClick={onClick(spec)}
          />
        ))}
    </div>
  )
}
