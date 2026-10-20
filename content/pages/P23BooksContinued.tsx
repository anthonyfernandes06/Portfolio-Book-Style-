import { Page } from '@/components/page/Primitives'
import { BookEntry } from '@/components/page/BookEntry'
import { BOOKS } from '@/content/books'

export default function P23BooksContinued() {
  return (
    <Page side="right" number={23} runningHead="The books inside this book">
      <BookEntry book={BOOKS[2]} style={{ marginTop: '1cqw' }} />
      <BookEntry book={BOOKS[3]} style={{ marginTop: '4cqw' }} />
      <BookEntry book={BOOKS[4]} style={{ marginTop: '4cqw' }} />
    </Page>
  )
}
