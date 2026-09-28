import { memo } from 'react'
import { LOOPS, loopY } from './Leaf'
import s from './book.module.css'

/**
 * Twin-loop wire-O binding. Drawn in a 90×1000 box stretched over the spine:
 * spine at x=45, holes at x=45±22 (2.2cqw from each page's spine edge).
 * Strokes use non-scaling widths so the wire stays crisp at any size.
 */
function BindingSvg({ side = 'both' }: { side?: 'both' | 'right' }) {
  const x0 = side === 'right' ? 36 : 23
  const x1 = 67
  const loops = Array.from({ length: LOOPS }, (_, k) => loopY(k) * 1000)
  const wire = (y: number, dy: number) => {
    const a = y + dy
    return `M${x0},${a + 3} C${x0 + 6},${a - 13} ${x1 - 6},${a - 13} ${x1},${a + 3}`
  }
  return (
    <svg className={s.binding} viewBox="0 0 90 1000" preserveAspectRatio="none" aria-hidden>
      <g fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke">
        {loops.map((y) => (
          <g key={y}>
            {/* soft shadow on the paper */}
            <path d={wire(y + 5, 0)} stroke="rgba(0,0,0,0.28)" strokeWidth={2.6} vectorEffect="non-scaling-stroke" />
            <path d={wire(y + 5, 7)} stroke="rgba(0,0,0,0.22)" strokeWidth={2.6} vectorEffect="non-scaling-stroke" />
            {/* the wires */}
            <path d={wire(y, 0)} stroke="var(--wire)" strokeWidth={1.9} vectorEffect="non-scaling-stroke" />
            <path d={wire(y, 7)} stroke="var(--wire)" strokeWidth={1.9} vectorEffect="non-scaling-stroke" />
            {/* specular highlight */}
            <path d={wire(y - 1.2, 0)} stroke="rgba(255,255,255,0.32)" strokeWidth={0.6} vectorEffect="non-scaling-stroke" />
            <path d={wire(y - 1.2, 7)} stroke="rgba(255,255,255,0.32)" strokeWidth={0.6} vectorEffect="non-scaling-stroke" />
          </g>
        ))}
      </g>
    </svg>
  )
}

export default memo(BindingSvg)
