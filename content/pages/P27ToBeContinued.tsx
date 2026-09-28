'use client'
import { Body, HandDrawnSVG, InkLink, Page } from '@/components/page/Primitives'
import { Strike } from '@/components/svg/Strokes'
import { EMAIL, LINKS, MAILTO } from '@/content/links'
import { store, useBookState } from '@/lib/progress'
import s from './pages.module.css'

export default function P27ToBeContinued() {
  const st = useBookState()
  const spread = store.cfg.pageToSpread(27)
  const shown = (st.atRest && st.settled === spread) || st.settled > spread
  return (
    <Page side="right" number={27} runningHead="To be continued">
      <h2 className="visually-hidden">To be continued</h2>
      <Body style={{ marginTop: '2cqw' }}>
        <p>These are just a few chapters of my life. The rest are still being written, and I’d love for you to be part of the next one.</p>
        <p>If something in these pages stayed with you, write to me.</p>
      </Body>
      <div className={s.contact}>
        <InkLink href={MAILTO}>{EMAIL}</InkLink>
        <InkLink href={LINKS.linkedin}>LinkedIn</InkLink>
        <InkLink href={LINKS.resume}>Résumé</InkLink>
      </div>
      <div className={s.theEnd}>
        <span className={s.endWord}>
          The End
          <HandDrawnSVG page={27} duration={0.7} delay={0.3} className={s.endStrike}>
            <Strike />
          </HandDrawnSVG>
        </span>
        <span className={`${s.tbc} ${shown ? s.shown : ''}`}>to be continued…</span>
      </div>
    </Page>
  )
}
