'use client'
import { scrollToPage } from '@/lib/progress'
import s from './book.module.css'

type Props = {
  label: string
  /** Page number the tab jumps to. */
  page: number
  /** Horizontal position along the top edge, as a fraction of page width. */
  at: number
}

/** A physical index tab glued to a leaf. It rides with its leaf from the right stack to the left. */
export default function IndexTab({ label, page, at }: Props) {
  const go = () => scrollToPage(page)
  return (
    <div className={s.tab} style={{ left: `calc(var(--page-w) * ${at})` }}>
      <button className={s.tabFace} onClick={go} aria-label={`Go to ${label.toLowerCase()}, page ${page}`}>
        {label}
      </button>
      <button className={`${s.tabFace} ${s.tabBack}`} onClick={go} tabIndex={-1} aria-hidden>
        {label}
      </button>
    </div>
  )
}
