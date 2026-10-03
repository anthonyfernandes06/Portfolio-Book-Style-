'use client'
import { useEffect, useRef } from 'react'
import { CONFIGS, openPaper, useBookState } from '@/lib/progress'
import { PAPERS, PAPER_IDS } from '@/content/papers/registry'
import f from './folder.module.css'

/** The folder stays out from the Projects chapter to the end of the playground. */
const FIRST_PAGE = 8
const LAST_PAGE = 17

/**
 * A manila folder at the bottom edge of the desk, holding the full papers
 * behind the project pages, all of them fanned out together. It comes into
 * view with the Projects chapter and goes away after the playground; a sheet
 * leaves the folder while it's being read.
 */
export default function Folder() {
  const st = useBookState()
  const cfg = CONFIGS[st.mode]
  const inRange = st.spread >= cfg.pageToSpread(FIRST_PAGE) && st.spread <= cfg.pageToSpread(LAST_PAGE)
  // A riffle passing through (or within) the chapters shouldn't bob the folder up and down.
  const shown = useRef(false)
  const show = !!st.paper || (st.riffling ? shown.current : inRange)
  useEffect(() => {
    shown.current = show
  })

  return (
    <div className={f.folder} data-show={show} inert={!show}>
      <div className={f.back} aria-hidden />
      {PAPER_IDS.map((id) => (
        <button
          key={id}
          type="button"
          className={f.sheet}
          data-paper={id}
          data-out={st.paper === id}
          inert={st.paper === id}
          onClick={() => openPaper(id)}
          aria-label={`Read the paper: ${PAPERS[id].title}`}
        >
          <span className={f.title}>{PAPERS[id].label}</span>
          <span className={f.lines} />
        </button>
      ))}
      <div className={f.front} aria-hidden />
    </div>
  )
}
