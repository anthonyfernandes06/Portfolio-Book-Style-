'use client'
import { CONFIGS, openPaper, useBookState } from '@/lib/progress'
import { PAPERS, PAPER_IDS } from '@/content/papers/registry'
import f from './folder.module.css'

/**
 * A manila folder at the bottom edge of the desk, holding the full papers
 * behind the playground pages. It comes into view on the spread that cites
 * them; a sheet leaves the folder while it's being read.
 */
export default function Folder() {
  const st = useBookState()
  const cfg = CONFIGS[st.mode]
  const cited = PAPER_IDS.some((id) => cfg.pageToSpread(PAPERS[id].page) === st.spread)
  const show = (cited && !st.riffling) || !!st.paper

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
