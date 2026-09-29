'use client'
import { useEffect, useRef } from 'react'
import { store, turnNext, turnPrev, useBookState } from '@/lib/progress'
import { clamp, easeInOutSine, range } from '@/lib/easing'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { FACES } from '@/content/leaves'
import { Face } from './Leaf'
import { TopBinding } from './Binding'
import s from './book.module.css'

const M = FACES.length
const Blank = () => null

/**
 * Single-page mode (< 768px): a top-bound desk calendar. One face at a time;
 * each page lifts from its bottom edge, swings up over the spiral and drops
 * away behind it. Same progress engine as desktop, 29 turns instead of 15.
 */
export default function MobileBook() {
  const st = useBookState()
  const reduced = useReducedMotion()
  const posRef = useRef<HTMLDivElement>(null)
  const leavesRef = useRef<HTMLDivElement>(null)
  const sheets = useRef<(HTMLDivElement | null)[]>([])
  const faces = useRef<(HTMLElement | null)[]>([])
  const backs = useRef<(HTMLElement | null)[]>([])
  const stack = useRef<HTMLDivElement>(null)

  useEffect(
    () =>
      store.onProgress((p) => {
        const active = Math.floor(p)
        for (let k = 0; k < M; k++) {
          const el = sheets.current[k]
          if (!el) continue
          const raw = clamp(p - k)
          const t = reduced ? (raw >= 0.5 ? 1 : 0) : easeInOutSine(raw)
          // Lift from the bottom edge, towards the reader, up and over the top.
          // A slight bow while the page is in the air, so it isn't a rigid card.
          const bow = Math.sin(t * Math.PI)
          el.style.transform = `rotateX(${(180 * t).toFixed(2)}deg)${reduced || bow < 0.001 ? '' : ` skewX(${(0.6 * bow).toFixed(3)}deg)`}`
          // Once it's over the spiral it drops behind the calendar and out of sight.
          // (Faded on the back face only: opacity on the sheet itself would
          // flatten its two sides together and show the front through the back.)
          const back = backs.current[k]
          if (back) back.style.opacity = reduced ? '0' : (1 - range(t, 0.5, 0.7)).toFixed(3)
          if (reduced) el.style.opacity = raw >= 0.5 ? '0' : '1'
          else if (el.style.opacity) el.style.opacity = ''
          const gone = !reduced && raw >= 0.999
          el.style.zIndex = String(raw > 0 && raw < 1 ? 100 : raw >= 1 ? 0 : M - k)
          el.style.visibility = !gone && k >= active - 1 && k <= active + 1 ? 'visible' : 'hidden'
          const face = faces.current[k]
          // Show only the side that faces the reader (explicit culling; the
          // browser's backface culling leaks shading layers on rotateX).
          const frontSide = t < 0.5
          if (face) face.style.visibility = frontSide ? '' : 'hidden'
          if (back) back.style.visibility = frontSide ? 'hidden' : ''
          const shade = face?.querySelector<HTMLElement>('[data-shade]')
          if (shade) shade.style.opacity = reduced ? '0' : (bow * 0.85).toFixed(3)
          const cast = face?.querySelector<HTMLElement>('[data-cast]')
          if (cast) {
            const prev = k > 0 ? clamp(p - (k - 1)) : 0
            cast.style.opacity = reduced ? '0' : (Math.sin(easeInOutSine(prev) * Math.PI) * 0.9).toFixed(3)
          }
        }
        if (stack.current) stack.current.style.transform = `scaleY(${clamp((M - 1 - p) / (M - 1)).toFixed(3)})`
        // Hero: cover sits below the hero text. End: back cover sits above the closing text.
        const pos = posRef.current
        if (pos) {
          const H = pos.offsetHeight
          const vh = window.innerHeight
          const room = Math.max(0, (vh - H) / 2 - 12)
          const natTop = (vh - H) / 2
          const heroEl = document.querySelector('[data-hero]')
          const closeEl = document.querySelector('[data-closing]')
          const heroBottom = heroEl ? heroEl.getBoundingClientRect().bottom : 0
          const down = clamp(heroBottom + 24 - natTop, 0, room)
          const up = closeEl ? clamp(natTop + H + 24 - (vh - closeEl.getBoundingClientRect().height - Math.max(vh * 0.04, 20)), 0, room) : room
          const y = down * (1 - range(p, 0, 0.5)) - up * range(p, M - 1.5, M - 1)
          pos.style.transform = `translateY(calc(-50% + ${y.toFixed(1)}px))`
        }
      }),
    [reduced],
  )

  // Swiping up/down is ordinary scrolling, which already drives the flip.
  // A sideways swipe turns pages too, for anyone who tries it.
  useEffect(() => {
    let x0 = 0
    let y0 = 0
    const down = (e: TouchEvent) => {
      x0 = e.touches[0].clientX
      y0 = e.touches[0].clientY
    }
    const up = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - x0
      const dy = e.changedTouches[0].clientY - y0
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        if (dx < 0) turnNext()
        else turnPrev()
      }
    }
    window.addEventListener('touchstart', down, { passive: true })
    window.addEventListener('touchend', up, { passive: true })
    return () => {
      window.removeEventListener('touchstart', down)
      window.removeEventListener('touchend', up)
    }
  }, [])

  useEffect(() => {
    if (reduced) leavesRef.current?.animate([{ opacity: 0.2 }, { opacity: 1 }], { duration: 200 })
  }, [st.spread, reduced])

  const shown = st.atRest ? st.settled : st.spread
  const ready = st.atRest && !st.riffling

  return (
    <div ref={posRef} className={`${s.singlePos} single ${s.single} ${st.deepLinked ? s.noIntro : ''} ${st.riffling ? s.fast : ''}`}>
      <div className={s.intro}>
        <div className={s.tilt} style={{ transform: 'none' }}>
          <div className={s.shadowBlur} />
          <div className={`${s.shadow} ${s.shadowRight}`} />
          <div ref={stack} className={s.stackBottom} aria-hidden />
          <div ref={leavesRef} className={s.leaves}>
            {FACES.map((f, k) => (
              <div key={k} ref={(el) => void (sheets.current[k] = el)} className={s.leaf}>
                <Face
                  side="front"
                  edge="top"
                  material={f.material}
                  Content={f.Content}
                  showThrough={false}
                  hidden={k !== shown}
                  faceRef={(el) => void (faces.current[k] = el)}
                />
                <Face
                  side="back"
                  edge="top"
                  material={f.material === 'board' ? 'board' : 'paper'}
                  Content={Blank}
                  showThrough={false}
                  hidden
                  faceRef={(el) => void (backs.current[k] = el)}
                  extraClass={s.sheetBack}
                />
              </div>
            ))}
          </div>
          <TopBinding />
          {ready && (
            <div className={s.curlLayer}>
              {st.settled > 0 && <button className={`${s.tapZone} ${s.tapPrev}`} aria-label="Turn to previous page" onClick={() => turnPrev()} />}
              {st.settled < M - 1 && <button className={`${s.tapZone} ${s.tapNext}`} aria-label="Turn to next page" onClick={() => turnNext()} />}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
