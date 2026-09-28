import { Figure, Page } from '@/components/page/Primitives'
import s from './pages.module.css'

export default function P21BooksContinued() {
  return (
    <Page side="right" number={21} runningHead="The books inside this book">
      <div className={`${s.bookEntry} ${s.compact}`} style={{ marginTop: '1cqw' }}>
        <Figure img="book2" width={17} rotate={1.2} />
        <div>
          <h3 className={s.bookTitle}>High Output Management</h3>
          <span className={s.bookAuthor}>Andrew S. Grove</span>
          <p className={s.bookText}>
            My early days as a lead UX designer were a struggle. This was the book that taught me how to run operations, instil leadership in my team and reduce the risk of things falling apart. Every other book taught me how to be a designer. This one taught me how to be a manager.
          </p>
        </div>
      </div>
      <div className={`${s.bookEntry} ${s.compact}`} style={{ marginTop: '6cqw' }}>
        <Figure img="book3" width={17} rotate={-1.4} />
        <div>
          <h3 className={s.bookTitle}>The Lean Startup</h3>
          <span className={s.bookAuthor}>Eric Ries</span>
          <p className={s.bookText}>
            Once, while building something new, I got excited and packed the first version with far too much. It delayed the launch, and when users didn’t like it, months of effort went to waste. This book gave me a founder’s mindset and taught me to build minimum viable products properly.
          </p>
        </div>
      </div>
    </Page>
  )
}
