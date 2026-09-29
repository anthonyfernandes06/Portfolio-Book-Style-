import { useId } from 'react'

/**
 * A round die-cut sticker: a hand-drawn pink brain with a line of text
 * running around it. Static, like everything else on the page.
 */
export function BrainSticker({ className, text }: { className?: string; text: string }) {
  const id = useId()
  const ring = `${id}-ring`
  return (
    <svg className={className} viewBox="0 0 200 200" role="img" aria-label={`Brain sticker: ${text}`}>
      <defs>
        {/* Text circle, starting on the left and running over the top */}
        <path id={ring} d="M 100 100 m -80 0 a 80 80 0 1 1 160 0 a 80 80 0 1 1 -160 0" />
      </defs>
      {/* sticker */}
      <circle cx="100" cy="100" r="97" fill="#fbfaf6" />
      <circle cx="100" cy="100" r="97" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
      <circle cx="100" cy="100" r="64" fill="#F8D7DD" />
      {/* brain */}
      <g transform="translate(100 99) scale(0.66) translate(-100 -95)" fill="#F29BB0" stroke="#7A2E45" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M100 58 C 88 44, 64 46, 60 60 C 46 60, 38 74, 44 86 C 34 94, 36 112, 50 116 C 50 130, 64 140, 78 134 C 86 144, 100 142, 100 132 C 100 142, 114 144, 122 134 C 136 140, 150 130, 150 116 C 164 112, 166 94, 156 86 C 162 74, 154 60, 140 60 C 136 46, 112 44, 100 58 Z" />
        <g fill="none">
          <path d="M100 58 C 96 80, 104 104, 100 132" />
          <path d="M62 78 C 72 72, 80 82, 72 92" />
          <path d="M54 106 C 66 98, 78 108, 70 120" />
          <path d="M84 62 C 92 70, 88 80, 80 86" />
          <path d="M82 104 C 90 98, 94 110, 88 120" />
          <path d="M138 78 C 128 72, 120 82, 128 92" />
          <path d="M146 106 C 134 98, 122 108, 130 120" />
          <path d="M116 62 C 108 70, 112 80, 120 86" />
          <path d="M118 104 C 110 98, 106 110, 112 120" />
        </g>
      </g>
      {/* ring text */}
      <text fill="#2b2a26" fontFamily="var(--typed)" fontSize="16" fontWeight="700">
        <textPath href={`#${ring}`} startOffset="0" textLength="470" lengthAdjust="spacing">
          {text} ✦
        </textPath>
      </text>
    </svg>
  )
}
