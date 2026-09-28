import type { CSSProperties } from 'react'

// Deterministic "EAN-ish" bar pattern: widths 1–3, alternating bar/space.
const PATTERN = '31112212322111411312221311131412113221123111214112213113121211'

export default function Barcode({ className, style }: { className?: string; style?: CSSProperties }) {
  let x = 4
  const bars: { x: number; w: number; tall: boolean }[] = []
  PATTERN.split('').forEach((c, i) => {
    const w = parseInt(c, 10) * 0.9
    if (i % 2 === 0) bars.push({ x, w, tall: i < 4 || i > PATTERN.length - 5 || i === 30 || i === 32 })
    x += w
  })
  return (
    <svg className={className} style={style} viewBox={`0 0 ${x + 4} 44`} aria-hidden>
      <rect width={x + 4} height="44" fill="#f4f3ee" />
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y="3" width={b.w} height={b.tall ? 38 : 34} fill="#22211e" />
      ))}
    </svg>
  )
}
