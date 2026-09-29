'use client'
import { useEffect, useRef } from 'react'
import { store, useBookState } from '@/lib/progress'
import { range } from '@/lib/easing'
import s from './stage.module.css'

export default function ClosingText() {
  const ref = useRef<HTMLDivElement>(null)
  const st = useBookState()
  const steps = store.cfg.steps
  useEffect(
    () =>
      store.onProgress((p) => {
        const el = ref.current
        if (!el) return
        const N = store.cfg.steps
        Array.from(el.children).forEach((child, i) => {
          const k = range(p, N - 0.55 + i * 0.12, N - 0.2 + i * 0.12)
          const c = child as HTMLElement
          c.style.opacity = k.toFixed(3)
          c.style.transform = `translateY(${((1 - k) * 10).toFixed(2)}px)`
        })
        el.style.visibility = p < N - 0.6 ? 'hidden' : 'visible'
      }),
    [st.mode],
  )
  const live = st.atRest && st.settled === steps
  return (
    <div ref={ref} data-closing className={`${s.closing} ${live ? s.live : ''}`} aria-hidden={!live} inert={!live}>
      <h2 className={s.closeLine}>
        That’s all, folks.
        <br />
        <span className={s.closeRest}>I told you it would be a quick read.</span>
      </h2>
    </div>
  )
}
