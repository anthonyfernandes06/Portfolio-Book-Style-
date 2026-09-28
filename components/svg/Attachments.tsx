import { useId, type CSSProperties } from 'react'

type P = { className?: string; style?: CSSProperties }

/** Steel gem paper clip, thin wire with a silver gradient. */
export function PaperClip({ className, style }: P) {
  const id = useId()
  return (
    <svg className={className} style={style} viewBox="-3 -3 30 82" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" x2="1" y1="0" y2="0.15">
          <stop offset="0" stopColor="#8d9196" />
          <stop offset="0.35" stopColor="#eef0f2" />
          <stop offset="0.55" stopColor="#a9adb2" />
          <stop offset="0.8" stopColor="#dfe2e5" />
          <stop offset="1" stopColor="#7c8085" />
        </linearGradient>
      </defs>
      <path
        d="M17 24 V60 a6 6 0 0 1 -12 0 V11 a9 9 0 0 1 18 0 V64 a11.5 11.5 0 0 1 -23 0 V22"
        fill="none"
        stroke={`url(#${id})`}
        strokeWidth="2.3"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Black binder clip with folded silver handles. */
export function BinderClip({ className, style }: P) {
  const id = useId()
  return (
    <svg className={className} style={style} viewBox="0 0 60 50" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" x2="1">
          <stop offset="0" stopColor="#8b8f94" />
          <stop offset="0.5" stopColor="#e9ebed" />
          <stop offset="1" stopColor="#8b8f94" />
        </linearGradient>
      </defs>
      <path d="M17 24 L12 3 H25 L23 24" fill="none" stroke={`url(#${id})`} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M43 24 L48 3 H35 L37 24" fill="none" stroke={`url(#${id})`} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M5 21 H55 L51.5 46 H8.5 Z" fill="#1b1b1a" />
      <path d="M5 21 H55 L54.4 25 H5.6 Z" fill="#3a3a38" />
      <path d="M9 44 H51" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <rect x="4" y="19.5" width="52" height="3" rx="1.5" fill="#2a2a28" />
    </svg>
  )
}

const TAPE_EDGES = [
  // three torn-end variants
  'M2 1 L4 3 L1 5 L3 8 L1 11 L4 14 L2 17 L3 19 L98 19 L96 16 L99 13 L97 10 L99 7 L96 4 L98 1 Z',
  'M3 1 L1 4 L3 6 L2 9 L4 12 L1 15 L3 19 L97 19 L99 16 L97 13 L98 10 L96 7 L99 4 L97 1 Z',
  'M1 1 L3 4 L2 7 L4 10 L2 13 L3 16 L1 19 L99 19 L97 15 L98 12 L96 9 L98 6 L97 3 L99 1 Z',
]

/** Translucent tape strip with torn ends. */
export function Tape({ className, style, variant = 0 }: P & { variant?: 0 | 1 | 2 }) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden>
      <path d={TAPE_EDGES[variant]} fill="rgba(232,228,208,0.62)" stroke="rgba(0,0,0,0.1)" strokeWidth="0.4" />
      <g stroke="rgba(255,255,255,0.35)" strokeWidth="0.3">
        <path d="M6 5 H94" />
        <path d="M6 10 H94" />
        <path d="M6 15 H94" />
      </g>
    </svg>
  )
}
