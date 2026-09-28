'use client'
import { useEffect, useRef } from 'react'
import { store } from '@/lib/progress'
import { range } from '@/lib/easing'
import { HeroArrow } from './svg/Strokes'
import s from './stage.module.css'

export default function HeroText() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(
    () =>
      store.onProgress((p) => {
        const el = ref.current
        if (!el) return
        const k = range(p, 0, 0.25)
        el.style.opacity = (1 - k).toFixed(3)
        el.style.visibility = k >= 1 ? 'hidden' : 'visible'
        el.style.translate = `${(-24 * k).toFixed(2)}px 0`
      }),
    [],
  )
  return (
    <div ref={ref} className={s.hero} data-hero>
      <h2 className={`${s.heroLine} ${s.rise}`} style={{ animationDelay: '1.3s' }}>
        I’m an open book.
      </h2>
      <p className={`${s.heroSub} ${s.rise}`} style={{ animationDelay: '1.42s' }}>
        Keep scrolling to get to know me.
      </p>
      <p className={`${s.heroNote} ${s.rise}`} style={{ animationDelay: '1.54s' }}>
        it’s short, I promise — just a few chapters
        <HeroArrow className={s.heroArrow} />
      </p>
    </div>
  )
}
