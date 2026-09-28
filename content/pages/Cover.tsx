import { Figure } from '@/components/page/Primitives'
import s from './pages.module.css'

export default function Cover() {
  return (
    <article className={s.cover} aria-label="Front cover">
      <p className={`${s.edition} ${s.deboss}`}>An open book, first edition</p>
      <h1 className={`${s.coverTitle} ${s.deboss}`}>
        The Designer with a knack for Management
      </h1>
      <Figure
        img="coverPortrait"
        width={46}
        ratio={1}
        position="50% 20%"
        rotate={-1}
        tapes={[
          { corner: 'tl', variant: 0 },
          { corner: 'br', variant: 2 },
        ]}
        priority
        style={{ marginTop: '11cqw' }}
      />
      {/* [CONFIRM city] */}
      <p className={`${s.place} ${s.deboss}`}>Mumbai, 2026</p>
    </article>
  )
}
