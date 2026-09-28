import { ChapterOpener, InkLink, Page } from '@/components/page/Primitives'
import { essayHref } from '@/content/links'
import s from './pages.module.css'

const ESSAYS = [
  'Good design is often subtle',
  'Understanding perceived value from Swiggy and Zomato cashback',
  'How to solve the chicken-and-egg problem',
  'What I’ve learnt about stepping into leadership roles early in your career',
]

export default function P19Notes() {
  return (
    <Page side="right" number={19}>
      <ChapterOpener label="Chapter six" title="Notes in the margins" style={{ marginBottom: '3.5cqw' }} />
      <p style={{ fontStyle: 'italic', fontSize: '2.75cqw', lineHeight: 1.45, textWrap: 'pretty' }}>
        If you think I’m young and dumb, here’s some proof that I can be intellectual as well.
      </p>
      <ol className={s.essays}>
        {ESSAYS.map((title, i) => (
          <li key={title}>
            <span className={s.essayTitle}>{title}</span>
            <InkLink href={essayHref(i)} className={s.essayLink}>
              Read on LinkedIn
            </InkLink>
          </li>
        ))}
      </ol>
    </Page>
  )
}
