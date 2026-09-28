'use client'
import { useEffect, useState } from 'react'
import { initEngine, scrollLengthVh, scrollToPage, useBookState, type Mode } from '@/lib/progress'
import Book from './book/Book'
import MobileBook from './book/MobileBook'
import Desk from './Desk'
import HeroText from './HeroText'
import ClosingText from './ClosingText'
import s from './stage.module.css'

export default function Stage() {
  const [mode, setMode] = useState<Mode>('spread')
  const st = useBookState()

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const on = () => setMode(mq.matches ? 'single' : 'spread')
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  useEffect(() => initEngine(mode), [mode])

  return (
    <>
      <a
        className={s.skip}
        href="#p-1"
        onClick={(e) => {
          e.preventDefault()
          scrollToPage(1)
        }}
      >
        Skip to contents
      </a>
      <main className={`${s.main} ${st.deepLinked ? s.noIntro : ''}`} style={{ height: `${(scrollLengthVh(mode) + 1) * 100}vh` }}>
        <div className={s.stage}>
          <Desk />
          <HeroText />
          {mode === 'single' ? <MobileBook /> : <Book />}
          <ClosingText />
        </div>
      </main>
    </>
  )
}
