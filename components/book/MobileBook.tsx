'use client'
import { useEffect, useRef } from 'react'
import { store, turnNext, turnPrev, useBookState } from '@/lib/progress'
import { clamp, easeInOutSine, range } from '@/lib/easing'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { FACES } from '@/content/leaves'
import { Face } from './Leaf'
import Binding from './Binding'
import s from './book.module.css'

const M = FACES.length
const Blank = () => null

/**
 * Single-page mode (< 768px): one face at a time, each turning around the
 * left-edge binding. Same progress engine, 29 turns instead of 15.
 */
export default function MobileBook() {
  const st = useBookState()
  const reduced = useReducedMotion()
  const posRef = useRef<HTMLDivElement>(null)
  const leavesRef = useRef<HTMLDivElement>(null)
  const sheets = useRef<(HTMLDivElement | null)[]>([])
  const faces = useRef<(HTMLElement | null)[]>([])

  useEffect(
    () =>
      store.onProgress((p) => {
        const active = Math.floor(p)
        for (let k = 0; k < M; k++) {
          const el = sheets.current[k]
          if (!el) continue
          const raw = clamp(p - k)
          const t = reduced ? (raw >= 0.5 ? 1 : 0) : easeInOutSine(raw)
          el.style.transform = `rotateY(${(-180 * t).toFixed(2)}deg)`
          el.style.opacity = reduced ? (raw >= 0.5 ? '0' : '1') : (1 - range(t, 0.5, 0.95)).toFixed(3)
          el.style.zIndex = String(raw > 0 && raw < 1 ? 100 : raw >= 1 ? 0 : M - k)
          el.style.visibility = k >= active - 1 && k <= active + 1 ? 'visible' : 'hidden'
          const cast = faces.current[k]?.querySelector<HTMLElement>('[data-cast]')
          if (cast) {
            const prev = k > 0 ? clamp(p - (k - 1)) : 0
            cast.style.opacity = reduced ? '0' : (Math.sin(easeInOutSine(prev) * Math.PI) * 0.9).toFixed(3)
          }
        }
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

  // Horizontal swipe turns pages.
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
          <div ref={leavesRef} className={s.leaves}>
            {FACES.map((f, k) => (
              <div key={k} ref={(el) => void (sheets.current[k] = el)} className={s.leaf}>
                <Face
                  side="front"
                  material={f.material}
                  Content={f.Content}
                  showThrough={false}
                  hidden={k !== shown}
                  faceRef={(el) => void (faces.current[k] = el)}
                />
                <Face
                  side="back"
                  material={f.material === 'board' ? 'board' : 'paper'}
                  Content={Blank}
                  showThrough={false}
                  hidden
                  faceRef={() => {}}
                  extraClass={s.sheetBack}
                />
              </div>
            ))}
          </div>
          <Binding />
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
