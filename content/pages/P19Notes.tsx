import { ChapterOpener, InkLink, Page } from '@/components/page/Primitives'
import { LINKS } from '@/content/links'
import s from './pages.module.css'

export default function P19Notes() {
  return (
    <Page side="right" number={19}>
      <ChapterOpener label="Chapter six" title="Notes in the margins" style={{ marginBottom: '3.5cqw' }} />
      <p style={{ fontStyle: 'italic', fontSize: '2.75cqw', lineHeight: 1.45, textWrap: 'pretty' }}>
        If you think I’m young and dumb, here’s some proof that I can be intellectual as well.
      </p>
      <ol className={s.essays}>
        {LINKS.essays.map(({ title, url }) => (
          <li key={title}>
            <span className={s.essayTitle}>{title}</span>
            <InkLink href={url} className={s.essayLink}>
              Read on LinkedIn
            </InkLink>
          </li>
        ))}
      </ol>
    </Page>
  )
}
