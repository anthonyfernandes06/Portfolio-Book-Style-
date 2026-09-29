import { memo } from 'react'
import { LOOPS, TOP_LOOPS, loopX, loopY } from './Leaf'
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

/**
 * The same twin-loop wire, running along the top edge like a desk calendar.
 * Drawn in a 1000×90 box: the page's top edge sits at y=45, holes at y=67
 * (2.2cqw below it), and each loop arcs up over the edge to the back.
 */
export const TopBinding = memo(function TopBinding() {
  // Each wire leaves the hole (y=67), rises in front of the page edge (y=45)
  // to the top of the hoop (y=26), then curves back down behind the page.
  const hole = 67
  const top = 26
  const loops = Array.from({ length: TOP_LOOPS }, (_, k) => loopX(k) * 1000)
  const front = (x: number) => `M${x},${hole} C${x + 7},${hole - 8} ${x + 8},${top + 6} ${x + 1},${top}`
  const back = (x: number) => `M${x + 1},${top} C${x - 6},${top + 4} ${x - 8},${top + 13} ${x - 5},45`
  return (
    <svg className={s.bindingTop} viewBox="0 0 1000 90" preserveAspectRatio="none" aria-hidden>
      <g fill="none" strokeLinecap="round">
        {loops.map((x) =>
          [0, 8].map((dx) => (
            <g key={`${x}-${dx}`}>
              {/* the half of the hoop that runs behind the page */}
              <path d={back(x + dx)} stroke="#3a3a38" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
              {/* shadow on the paper, then the wire in front */}
              <path d={front(x + dx + 2) } stroke="rgba(0,0,0,0.25)" strokeWidth={2.4} vectorEffect="non-scaling-stroke" transform="translate(0 3)" />
              <path d={front(x + dx)} stroke="var(--wire)" strokeWidth={1.9} vectorEffect="non-scaling-stroke" />
              <path d={front(x + dx + 1)} stroke="rgba(255,255,255,0.35)" strokeWidth={0.6} vectorEffect="non-scaling-stroke" />
            </g>
          )),
        )}
      </g>
    </svg>
  )
})
