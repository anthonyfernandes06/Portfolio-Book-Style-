import { MarginNote, Stamp } from '@/components/page/Primitives'
import { EMAIL, MAILTO } from '@/content/links'
import SoundToggle from '@/components/page/SoundToggle'
import s from './pages.module.css'

export default function InsideFront() {
  return (
    <article className={s.inside} aria-label="Inside front cover">
      <Stamp style={{ width: '56cqw' }}>
        <span className={s.exLibris}>Ex libris</span>
        <span className={s.plateText}>This book belongs to whoever is curious enough to open it.</span>
      </Stamp>
      <p className={s.returnTo}>
        If found, please return to its author:
        <br />
        <a href={MAILTO}>{EMAIL}</a>
      </p>
      <MarginNote rotate={-3} style={{ marginTop: 'auto', maxWidth: '36ch', textAlign: 'left', fontSize: '2.8cqw' }}>
        Scroll to turn the pages, or lift a corner if you prefer. The contents are on the right, for those who like to skip ahead.
      </MarginNote>
      <SoundToggle />
    </article>
  )
}
