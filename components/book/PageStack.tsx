import { forwardRef } from 'react'
import s from './book.module.css'

/** Stacked page edges on one side of the book. Thickness is set per frame via scaleX. */
const PageStack = forwardRef<HTMLDivElement, { side: 'left' | 'right' }>(function PageStack({ side }, ref) {
  return <div ref={ref} className={`${s.stack} ${side === 'left' ? s.stackLeft : s.stackRight}`} aria-hidden />
})

export default PageStack
