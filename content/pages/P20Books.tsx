import { ChapterOpener, Page } from '@/components/page/Primitives'
import { BookEntry } from '@/components/page/BookEntry'
import { BOOKS } from '@/content/books'

export default function P20Books() {
  return (
    <Page side="left" number={20}>
      <ChapterOpener label="Chapter seven" title="The books inside this book" style={{ marginBottom: '3cqw' }} />
      <p style={{ fontSize: '2.35cqw', lineHeight: 1.5, textWrap: 'pretty' }}>
        I’m not much of a book reader, which, I’ll admit, is a strange thing to confess inside a book. But a few have shaped the way I work.
      </p>
      <BookEntry book={BOOKS[0]} style={{ marginTop: '4.5cqw' }} />
      <BookEntry book={BOOKS[1]} style={{ marginTop: '4cqw' }} />
    </Page>
  )
}
