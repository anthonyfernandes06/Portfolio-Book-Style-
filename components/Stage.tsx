'use client'
import { useEffect, useState } from 'react'
import { initEngine, scrollLengthVh, scrollToPage, useBookState, type Mode } from '@/lib/progress'
import { initSound } from '@/lib/sound'
import Book from './book/Book'
import MobileBook from './book/MobileBook'
import Desk, { Sunlight } from './Desk'
import Folder from './desk/Folder'
import PaperReader from './paper/PaperReader'
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
  useEffect(() => initSound(), [])

  return (
    <>
      <a
        className={s.skip}
        inert={!!st.paper}
        href="#p-1"
        onClick={(e) => {
          e.preventDefault()
          scrollToPage(1)
        }}
      >
        Skip to contents
      </a>
      {/* While a paper is open, the book waits underneath, out of reach of keyboard and screen reader. */}
      <main
        className={`${s.main} ${st.deepLinked ? s.noIntro : ''}`}
        style={{ height: `${(scrollLengthVh(mode) + 1) * 100}vh` }}
        inert={!!st.paper}
      >
        <div className={s.stage}>
          <Desk />
          <HeroText />
          <Folder />
          {mode === 'single' ? <MobileBook /> : <Book />}
          <Sunlight />
          <ClosingText />
        </div>
      </main>
      <PaperReader />
    </>
  )
}
