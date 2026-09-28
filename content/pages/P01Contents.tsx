'use client'
import { Page } from '@/components/page/Primitives'
import { scrollToPage } from '@/lib/progress'
import s from './pages.module.css'

const ROWS: { numeral?: string; title: string; page: number }[] = [
  { title: 'Prologue: From my desk to yours', page: 3 },
  { numeral: 'I.', title: 'Hello, I’m Anthony', page: 4 },
  { numeral: 'II.', title: 'The journey so far', page: 6 },
  { numeral: 'III.', title: 'Some of my work', page: 8 },
  { numeral: 'IV.', title: 'The playground', page: 14 },
  { numeral: 'V.', title: 'The toolbox', page: 18 },
  { numeral: 'VI.', title: 'Notes in the margins', page: 19 },
  { numeral: 'VII.', title: 'The books inside this book', page: 20 },
  { numeral: 'VIII.', title: 'Off the record', page: 22 },
  { numeral: 'IX.', title: 'What keeps me up at night', page: 24 },
  { title: 'Epilogue: To be continued', page: 26 },
]

export default function P01Contents() {
  return (
    <Page side="right" number={1} runningHead="Contents">
      <h2 className={s.contentsTitle}>Contents</h2>
      <nav aria-label="Contents">
        <ol className={s.toc}>
          {ROWS.map((r) => (
            <li key={r.page + r.title}>
              <a
                className={s.tocRow}
                href={`#p-${r.page}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToPage(r.page)
                }}
              >
                <span className={s.tocTitle}>
                  {r.numeral && <span className={s.numeral}>{r.numeral}</span>}
                  {r.title}
                  <svg viewBox="0 0 100 6" preserveAspectRatio="none" aria-hidden>
                    <path pathLength={1} d="M1 3.6 C 20 2.2, 45 4.4, 70 3 S 92 2.6, 99 3.4" fill="none" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </span>
                <span className={s.leader} aria-hidden />
                <span className={s.tocNum}>{r.page}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </Page>
  )
}
