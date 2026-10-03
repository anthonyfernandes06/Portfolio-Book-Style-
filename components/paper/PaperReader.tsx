'use client'
import { useEffect, useRef, useState, type ComponentType } from 'react'
import { closePaper, useBookState } from '@/lib/progress'
import type { PaperId } from '@/content/papers/registry'
import LumoraPaper from '@/content/papers/LumoraPaper'
import SpotifyPaper from '@/content/papers/SpotifyPaper'
import OttPaper from '@/content/papers/OttPaper'
import r from './reader.module.css'

const CONTENT: Record<PaperId, ComponentType> = { lumora: LumoraPaper, spotify: SpotifyPaper, ott: OttPaper }

/** Matches the slide-out in reader.module.css. */
const LEAVE_MS = 460

type Phase = 'enter' | 'open' | 'leave'

/**
 * A paper pulled from the folder, held up over the book. The eye focuses on
 * the paper, so everything behind it (book, desk) drifts out of focus.
 */
export default function PaperReader() {
  const { paper } = useBookState()
  const [shown, setShown] = useState<PaperId | null>(null)
  const [phase, setPhase] = useState<Phase>('enter')
  const scroller = useRef<HTMLDivElement>(null)
  const opener = useRef<HTMLElement | null>(null)
  const pressedOutside = useRef(false)

  // Mount and slide in on open; slide out, then unmount, on close.
  useEffect(() => {
    if (paper) {
      if (!opener.current) opener.current = document.activeElement as HTMLElement | null
      setShown(paper)
      setPhase('enter')
      let raf = requestAnimationFrame(() => {
        raf = requestAnimationFrame(() => setPhase('open'))
      })
      return () => cancelAnimationFrame(raf)
    }
    setPhase('leave')
    const back = opener.current
    opener.current = null
    if (back?.isConnected) back.focus({ preventScroll: true })
    const t = setTimeout(() => setShown(null), LEAVE_MS)
    return () => clearTimeout(t)
  }, [paper])

  // Keyboard: the paper scrolls with the usual keys once it has focus; Escape puts it away.
  useEffect(() => {
    if (!shown) return
    scroller.current?.scrollTo(0, 0)
    scroller.current?.focus({ preventScroll: true })
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        closePaper()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [shown])

  if (!shown) return null
  const Content = CONTENT[shown]
  const outside = (el: EventTarget) => !(el as Element).closest('[data-sheet], button, a')

  return (
    <>
      {/* Its own layer straight on the page: nested inside the dialog, the blur would only see the dialog. */}
      <div className={r.blur} data-phase={phase} aria-hidden />
      <div className={r.reader} data-phase={phase} role="dialog" aria-modal="true" aria-labelledby={`${shown}-title`}>
        <div
          ref={scroller}
          className={r.scroller}
          tabIndex={-1}
          data-lenis-prevent
          onPointerDown={(e) => {
            pressedOutside.current = outside(e.target)
          }}
          onClick={(e) => {
            // Clicking the blurred desk around the paper puts it away (but not a text selection that strays off the sheet).
            if (pressedOutside.current && outside(e.target)) closePaper()
          }}
        >
          <div className={r.stack}>
            <Content />
            <button type="button" className={`${r.tag} ${r.putBack}`} onClick={closePaper}>
              Put it back in the folder
            </button>
          </div>
        </div>
        <button type="button" className={`${r.tag} ${r.close}`} onClick={closePaper} aria-label="Close the paper and go back to the book">
          <span className={r.closeLabel}>Back to the book</span>
          <span className={r.cross} aria-hidden>
            ×
          </span>
        </button>
      </div>
    </>
  )
}
