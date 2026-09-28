import type { CSSProperties } from 'react'

type P = { className?: string; style?: CSSProperties; strokeWidth?: number }

const stroke = (w = 1.2) =>
  ({
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: w,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }) as const

// Paths that draw themselves use pathLength={1}; that only works without
// non-scaling strokes, so static-only paths opt into non-scaling separately.
const fixed = { vectorEffect: 'non-scaling-stroke' } as const

/** Hand-drawn wavy underline (links). */
export function Squiggle({ className, style }: P) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 6" preserveAspectRatio="none" aria-hidden>
      <path
        pathLength={1}
        d="M1 3.4 C 9 1.6, 15 4.6, 24 3.1 S 40 1.8, 50 3.3 S 66 4.4, 76 2.9 S 92 2.4, 99 3.6"
        fill="none"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Hand-drawn loose circle (cross-references). */
export function HandCircle({ className, style }: P) {
  return (
    <svg className={className} style={style} viewBox="0 0 60 30" preserveAspectRatio="none" aria-hidden>
      <path pathLength={1} d="M33 3.5 C 50 2, 59 10, 55 19 C 50 28, 15 29, 6 20 C -1 12, 12 3, 38 5.5" {...stroke(2)} />
    </svg>
  )
}

/** Curving arrow from the hero note toward the book. */
export function HeroArrow({ className, style }: P) {
  return (
    <svg className={className} style={style} viewBox="0 0 220 90" aria-hidden>
      <path pathLength={1} d="M6 62 C 44 84, 104 82, 148 56 S 196 20, 208 14" {...stroke(1.4)} />
      <path pathLength={1} d="M191 9 L209 13 L199 29" {...stroke(1.4)} />
    </svg>
  )
}

/** Short curved pointer (margin note → paragraph). */
export function Pointer({ className, style }: P) {
  return (
    <svg className={className} style={style} viewBox="0 0 60 80" aria-hidden>
      <path d="M40 76 C 18 64, 10 40, 22 6" {...stroke(1.1)} {...fixed} />
      <path d="M13 14 L22 5 L28 16" {...stroke(1.1)} {...fixed} />
    </svg>
  )
}

/** Strikethrough scribble for "The End". */
export function Strike({ className, style }: P) {
  return (
    <svg className={className} style={style} viewBox="0 0 200 24" preserveAspectRatio="none" aria-hidden>
      <path pathLength={1} d="M3 15 C 40 9, 70 14, 110 10 S 170 7, 197 11" {...stroke(2)} />
    </svg>
  )
}

/**
 * Hand-drawn career staircase, rising from lower-left to upper-right.
 * Four solid steps, a flag on the fourth (where I am now), and a dashed
 * fifth step for what comes next.
 */
export function Staircase({ className, style }: P) {
  return (
    <svg className={className} style={style} viewBox="0 0 400 330" aria-hidden>
      <path
        d="M4 318 C 40 317, 70 319, 96 317 C 97 297, 95 277, 97 258 C 120 259, 145 257, 168 258 C 169 238, 167 218, 169 198 C 192 199, 217 197, 240 198 C 241 178, 239 158, 241 138 C 270 139, 300 137, 330 138"
        {...stroke(1.3)}
      />
      {/* the step still to come */}
      <path d="M330 138 C 331 118, 329 98, 331 78 C 352 79, 375 77, 396 78" {...stroke(1.3)} strokeDasharray="5 5" opacity="0.75" />
      {/* faint ground line, like a pencil sketch */}
      <path d="M2 322 C 90 323, 200 321, 398 322" {...stroke(0.7)} opacity="0.45" />
      {/* flag: you are here */}
      <path d="M324 138 C 323 124, 325 108, 324 94" {...stroke(1.2)} />
      <path d="M324 95 C 316 98, 310 101, 302 104 C 310 107, 316 110, 324 113" {...stroke(1.2)} />
    </svg>
  )
}

/** A handwritten-looking tick-mark bracket. */
export function Bracket({ className, style }: P) {
  return (
    <svg className={className} style={style} viewBox="0 0 20 100" preserveAspectRatio="none" aria-hidden>
      <path d="M16 3 C 8 4, 9 20, 9 40 C 9 46, 6 49, 3 50 C 6 51, 9 54, 9 60 C 9 80, 8 96, 16 97" {...stroke(1)} {...fixed} />
    </svg>
  )
}
