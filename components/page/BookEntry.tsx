import { Figure } from '@/components/page/Primitives'
import type { Book } from '@/content/books'
import s from '@/content/pages/pages.module.css'

export function BookEntry({ book, style }: { book: Book; style?: React.CSSProperties }) {
  return (
    <div className={s.bookEntry} style={style}>
      <Figure img={book.img} width={14} rotate={book.rotate} ratio={432 / 684} />
      <div>
        <h3 className={s.bookTitle}>{book.title}</h3>
        <span className={s.bookAuthor}>{book.author}</span>
        <p className={s.bookText}>{book.note}</p>
      </div>
    </div>
  )
}
