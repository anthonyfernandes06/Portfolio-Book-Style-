import { useId } from 'react'
import s from './desk.module.css'

/*
 * Things on the desk around the book. All static illustrations, drawn in
 * SVG so they stay crisp at any size. Light comes from the window at the
 * upper right, so every prop casts its shadow down and to the left.
 */

/* ---------- a seeded wobble, so the sketch looks hand-drawn (and SSR-stable) ---------- */

function prng(seed: number) {
  let x = seed % 2147483647
  if (x <= 0) x += 2147483646
  return () => (x = (x * 16807) % 2147483647) / 2147483647
}

type R = () => number
const j = (r: R, a: number) => (r() - 0.5) * a

/** A pencil stroke from A to B with a slight bow and overshoot. */
function line(r: R, x1: number, y1: number, x2: number, y2: number, wob = 2) {
  const mx = (x1 + x2) / 2 + j(r, wob)
  const my = (y1 + y2) / 2 + j(r, wob)
  return `M${(x1 + j(r, 1.6)).toFixed(1)},${(y1 + j(r, 1.6)).toFixed(1)} Q${mx.toFixed(1)},${my.toFixed(1)} ${(x2 + j(r, 1.6)).toFixed(1)},${(y2 + j(r, 1.6)).toFixed(1)}`
}

/** A sketched box: four separate strokes that overshoot the corners a little. */
function box(r: R, x: number, y: number, w: number, h: number) {
  const o = 3
  return [
    line(r, x - o, y, x + w + o, y),
    line(r, x + w, y - o, x + w, y + h + o),
    line(r, x + w + o, y + h, x - o, y + h),
    line(r, x, y + h + o, x, y - o),
  ].join(' ')
}

/** An image placeholder: box with a cross through it. */
function imageBox(r: R, x: number, y: number, w: number, h: number) {
  return `${box(r, x, y, w, h)} ${line(r, x + 2, y + 2, x + w - 2, y + h - 2, 3)} ${line(r, x + w - 2, y + 2, x + 2, y + h - 2, 3)}`
}

function textLines(r: R, x: number, y: number, widths: number[], gap = 9) {
  return widths.map((w, i) => line(r, x, y + i * gap, x + w, y + i * gap, 1.2)).join(' ')
}

function circle(r: R, cx: number, cy: number, rad: number) {
  const k = rad * 0.56
  const p = (dx: number, dy: number) => `${(cx + dx + j(r, 1.2)).toFixed(1)},${(cy + dy + j(r, 1.2)).toFixed(1)}`
  return `M${p(rad, 0)} C${p(rad, k)} ${p(k, rad)} ${p(0, rad)} C${p(-k, rad)} ${p(-rad, k)} ${p(-rad, 0)} C${p(-rad, -k)} ${p(-k, -rad)} ${p(0, -rad)} C${p(k, -rad)} ${p(rad, -k + 2)} ${p(rad + 1, 2)}`
}

/** A phone outline, drawn twice slightly offset the way a quick sketch is. */
function phone(r: R, x: number, y: number, w: number, h: number) {
  const rr = 14
  const one = (dx: number, dy: number) =>
    `M${x + rr + dx},${y + dy} H${x + w - rr + dx} Q${x + w + dx},${y + dy} ${x + w + dx},${y + rr + dy} V${y + h - rr + dy} Q${x + w + dx},${y + h + dy} ${x + w - rr + dx},${y + h + dy} H${x + rr + dx} Q${x + dx},${y + h + dy} ${x + dx},${y + h - rr + dy} V${y + rr + dy} Q${x + dx},${y + dy} ${x + rr + dx},${y + dy}`
  return `${one(0, 0)} ${one(j(r, 2.4), j(r, 2.4))} ${line(r, x + w / 2 - 12, y + 9, x + w / 2 + 12, y + 9, 1)}`
}

function arrow(r: R, x1: number, y1: number, x2: number, y2: number, bend: number) {
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2 - bend
  const ang = Math.atan2(y2 - my, x2 - mx)
  const h = (a: number) => `${(x2 - 9 * Math.cos(ang + a)).toFixed(1)},${(y2 - 9 * Math.sin(ang + a)).toFixed(1)}`
  return `M${x1},${y1} Q${mx + j(r, 4)},${my} ${x2},${y2} M${h(0.45)} L${x2},${y2} L${h(-0.45)}`
}

/* ---------- sticky note ---------- */

function StickyNote({ color, lines, className, fontSize = 23 }: { color: string; lines: string[]; className?: string; fontSize?: number }) {
  const id = useId()
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden>
      <defs>
        <linearGradient id={`${id}-curl`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.18" />
          <stop offset="0.16" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.78" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.16" />
        </linearGradient>
      </defs>
      {/* the bottom edge lifts a little off the desk */}
      <path d="M2 2 H198 V188 Q150 200 100 197 Q50 200 2 190 Z" fill={color} />
      <path d="M2 2 H198 V188 Q150 200 100 197 Q50 200 2 190 Z" fill={`url(#${id}-curl)`} />
      <text fill="#3a3530" fillOpacity="0.86" style={{ fontFamily: 'var(--hand)' }} fontSize={fontSize}>
        {lines.map((l, i) => (
          <tspan key={i} x="20" y={58 + i * (fontSize + 13)}>
            {l}
          </tspan>
        ))}
      </text>
    </svg>
  )
}

/* ---------- wireframe sketch sheet ---------- */

export function SketchSheet() {
  const r = prng(17)
  const g: string[] = []
  // screen 1: landing
  g.push(phone(r, 54, 118, 124, 236))
  g.push(textLines(r, 70, 148, [40, 0]))
  g.push(imageBox(r, 70, 164, 92, 62))
  g.push(textLines(r, 70, 242, [88, 70, 80]))
  g.push(box(r, 70, 290, 92, 22))
  g.push(textLines(r, 70, 330, [50]))
  // screen 2: list
  g.push(phone(r, 238, 118, 124, 236))
  g.push(textLines(r, 254, 148, [56]))
  for (let i = 0; i < 4; i++) {
    g.push(circle(r, 268, 182 + i * 40, 10))
    g.push(textLines(r, 286, 177 + i * 40, [58, 40]))
  }
  // screen 3: detail
  g.push(phone(r, 422, 118, 124, 236))
  g.push(imageBox(r, 438, 140, 92, 74))
  g.push(textLines(r, 438, 232, [86, 92, 60, 78]))
  g.push(imageBox(r, 438, 278, 42, 34))
  g.push(imageBox(r, 488, 278, 42, 34))
  // flow arrows
  g.push(arrow(r, 182, 200, 232, 214, 18))
  g.push(arrow(r, 366, 238, 416, 226, 16))
  const graphite = g.join(' ')
  const r2 = prng(5)
  return (
    <svg className={`${s.sketch} ${s.shaded}`} viewBox="0 0 600 440" aria-hidden>
      <defs>
        <linearGradient id="sketch-paper" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ece8dd" />
          <stop offset="1" stopColor="#e2ddd0" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="600" height="440" fill="url(#sketch-paper)" />
      <path d={graphite} fill="none" stroke="#56534d" strokeOpacity="0.78" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* scribbled heading and a margin note */}
      <text x="54" y="74" fill="#4c4944" fillOpacity="0.85" style={{ fontFamily: 'var(--hand)' }} fontSize="30">
        onboarding, v2
      </text>
      <path d={line(r2, 54, 86, 236, 84, 3)} fill="none" stroke="#4c4944" strokeOpacity="0.7" strokeWidth="1.4" strokeLinecap="round" />
      <text x="250" y="402" fill="#4c4944" fillOpacity="0.8" style={{ fontFamily: 'var(--hand)' }} fontSize="22">
        fewer steps?
      </text>
      <path d={arrow(r2, 372, 392, 440, 360, -10)} fill="none" stroke="#4c4944" strokeOpacity="0.7" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

/* ---------- pencil ---------- */

export function Pencil() {
  const id = useId()
  return (
    <svg className={`${s.pencil} ${s.shaded}`} viewBox="0 0 600 36" aria-hidden>
      <defs>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4a4a4d" />
          <stop offset="0.3" stopColor="#2c2c2f" />
          <stop offset="0.36" stopColor="#3b3b3e" />
          <stop offset="0.66" stopColor="#242426" />
          <stop offset="0.72" stopColor="#313134" />
          <stop offset="1" stopColor="#161618" />
        </linearGradient>
        <linearGradient id={`${id}-wood`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e6c49a" />
          <stop offset="1" stopColor="#b98e62" />
        </linearGradient>
      </defs>
      {/* sharpened wood cone and graphite */}
      <path d="M78 4 L22 18 L78 32 Z" fill={`url(#${id}-wood)`} />
      <path d="M78 4 Q70 9 72 12 Q66 15 70 18 Q64 22 72 25 Q68 29 78 32" fill="none" stroke="#2a2a2c" strokeWidth="1.6" />
      <path d="M36 14.6 L4 18 L36 21.4 Z" fill="#3a3a3c" />
      <path d="M12 17.2 L4 18 L12 18.8 Z" fill="#1b1b1c" />
      {/* hexagonal barrel */}
      <rect x="77" y="4" width="515" height="28" fill={`url(#${id}-body)`} />
      <rect x="590" y="4" width="6" height="28" rx="1.5" fill="#1e1e20" />
      <text x="470" y="22.5" fill="#c6a463" fillOpacity="0.75" fontSize="10" letterSpacing="2" style={{ fontFamily: 'var(--typed)' }}>
        HB
      </text>
    </svg>
  )
}

/* ---------- reading glasses, folded ---------- */

/** A soft-cornered lens outline (squarish, like everyday tortoiseshell frames). */
function lensPath(x: number, y: number, w: number, h: number, r: number) {
  return `M${x + r},${y} H${x + w - r} Q${x + w},${y} ${x + w},${y + r} V${y + h - r * 1.15} Q${x + w},${y + h} ${x + w - r * 1.25},${y + h} H${x + r * 1.25} Q${x},${y + h} ${x},${y + h - r * 1.15} V${y + r} Q${x},${y} ${x + r},${y} Z`
}

export function Specs() {
  const id = useId()
  const r = prng(29)
  // tortoiseshell: soft amber pools and dark mottling, blurred together
  const spots = Array.from({ length: 140 }, () => ({
    x: r() * 400,
    y: r() * 170,
    rx: 4 + r() * 14,
    ry: 3 + r() * 7,
    a: r() * 180,
    dark: r() < 0.62,
  }))
  const L = { x: 22, y: 26, w: 160, h: 122, r: 40 }
  const Rt = { x: 220, y: 26, w: 160, h: 122, r: 40 }
  const rimW = 13
  const outer = (o: typeof L) => lensPath(o.x, o.y, o.w, o.h, o.r)
  const inner = (o: typeof L) => lensPath(o.x + rimW, o.y + rimW, o.w - 2 * rimW, o.h - 2 * rimW, o.r - rimW * 0.8)
  const frame = `${outer(L)} ${inner(L)} ${outer(Rt)} ${inner(Rt)}`
  const bridge = 'M178 52 Q201 36 224 52 L224 66 Q201 54 178 66 Z'
  return (
    <svg className={`${s.specs} ${s.shaded}`} viewBox="0 0 402 172" aria-hidden>
      <defs>
        <clipPath id={`${id}-frame`}>
          <path d={frame} clipRule="evenodd" />
          <path d={bridge} />
        </clipPath>
        <filter id={`${id}-soft`} x="0" y="0" width="1" height="1">
          <feGaussianBlur stdDeviation="2.6" />
        </filter>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.16" />
          <stop offset="0.4" stopColor="#fff" stopOpacity="0.02" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id={`${id}-arm`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8a5a33" />
          <stop offset="1" stopColor="#3d2414" />
        </linearGradient>
        <linearGradient id={`${id}-sheen`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.28" />
          <stop offset="0.22" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      {/* the arms, folded behind the lenses at a slight angle */}
      <path d="M30 78 L372 70 L372 80 L30 88 Z" fill={`url(#${id}-arm)`} />
      <path d="M34 98 L376 92 L376 101 L34 107 Z" fill={`url(#${id}-arm)`} opacity="0.9" />
      {/* lenses: faintly tinted, catching the window */}
      <path d={inner(L)} fill="#1d130c" fillOpacity="0.14" />
      <path d={inner(Rt)} fill="#1d130c" fillOpacity="0.14" />
      <path d={inner(L)} fill={`url(#${id}-glass)`} />
      <path d={inner(Rt)} fill={`url(#${id}-glass)`} />
      <path d="M128 44 L152 44 L104 132 L82 132 Z" fill="#fff" opacity="0.08" />
      <path d="M326 44 L350 44 L302 132 L280 132 Z" fill="#fff" opacity="0.08" />
      {/* tortoiseshell frame */}
      <g clipPath={`url(#${id}-frame)`}>
        <rect width="402" height="172" fill="#9a6232" />
        <g filter={`url(#${id}-soft)`}>
          {spots.map((p, i) => (
            <ellipse
              key={i}
              cx={p.x}
              cy={p.y}
              rx={p.rx}
              ry={p.ry}
              transform={`rotate(${p.a} ${p.x} ${p.y})`}
              fill={p.dark ? '#2b160a' : '#c98a45'}
              opacity={p.dark ? 0.75 : 0.5}
            />
          ))}
        </g>
        <rect width="402" height="172" fill={`url(#${id}-sheen)`} />
      </g>
      <path d={frame} fill="none" stroke="#1d0f07" strokeOpacity="0.45" strokeWidth="1" />
      {/* metal pins at the hinges */}
      <circle cx="32" cy="44" r="2.4" fill="#e2dccd" />
      <circle cx="38" cy="44" r="2.4" fill="#e2dccd" />
      <circle cx="364" cy="44" r="2.4" fill="#e2dccd" />
      <circle cx="370" cy="44" r="2.4" fill="#e2dccd" />
    </svg>
  )
}

/* ---------- the desk's notes ---------- */

export function NoteOnSketch() {
  return <StickyNote className={`${s.noteSketch} ${s.shaded}`} color="#efd27a" lines={['talk to users', 'before opening', 'Figma']} />
}

export function NoteCorner() {
  return <StickyNote className={s.noteCorner} color="#e8a99a" lines={['done > perfect', '(mostly)']} fontSize={25} />
}
