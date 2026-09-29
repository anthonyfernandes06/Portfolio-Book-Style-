import { Body, InkLink, Page } from '@/components/page/Primitives'
import { Strike } from '@/components/svg/Strokes'
import { EMAIL, LINKS, MAILTO } from '@/content/links'
import s from './pages.module.css'

export default function P27ToBeContinued() {
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
          <span className={s.endStrike}>
            <Strike />
          </span>
        </span>
        <span className={s.tbc}>to be continued…</span>
      </div>
    </Page>
  )
}
