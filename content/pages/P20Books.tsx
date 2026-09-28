import { ChapterOpener, Figure, Page } from '@/components/page/Primitives'
import s from './pages.module.css'

export default function P20Books() {
  return (
    <Page side="left" number={20}>
      <ChapterOpener label="Chapter seven" title="The books inside this book" style={{ marginBottom: '3.5cqw' }} />
      <p style={{ fontSize: '2.45cqw', lineHeight: 1.5, textWrap: 'pretty' }}>
        I’m not much of a book reader, which, I’ll admit, is a strange thing to confess inside a book. But a few have shaped the way I work.
      </p>
      <div className={s.bookEntry} style={{ marginTop: '7cqw' }}>
        <Figure img="book1" width={22} rotate={-1.5} tapes={[{ corner: 'top', variant: 1 }]} />
        <div>
          <h3 className={s.bookTitle}>Contagious</h3>
          <span className={s.bookAuthor}>Jonah Berger</span>
          <p className={s.bookText}>
            I thought it was a book for marketers. Then I started designing membership programmes, and it quietly taught me how to structure and position them so people would actually want to talk about them.
          </p>
        </div>
      </div>
    </Page>
  )
}
