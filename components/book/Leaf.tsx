'use client'
import { memo, type ComponentType, type ReactNode } from 'react'
import s from './book.module.css'

export type Material = 'paper' | 'board' | 'endpaper'

export const LOOPS = 22
/** Vertical position (0–1) of loop k: shared by the holes and the wire binding. */
export const loopY = (k: number) => 0.04 + (k * 0.92) / (LOOPS - 1)

const Holes = memo(function Holes() {
  return (
    <div className={s.holes} aria-hidden>
      {Array.from({ length: LOOPS }, (_, k) => (
        <span key={k} className={s.hole} style={{ top: `${loopY(k) * 100}%` }} />
      ))}
    </div>
  )
})

type FaceProps = {
  side: 'front' | 'back'
  material: Material
  Content: ComponentType
  Reverse?: ComponentType
  showThrough: boolean
  hidden: boolean
  faceRef: (el: HTMLElement | null) => void
  extraClass?: string
}

export function Face({ side, material, Content, Reverse, showThrough, hidden, faceRef, extraClass }: FaceProps) {
  const matClass = material === 'board' ? s.board : material === 'endpaper' ? s.endpaper : ''
  return (
    <div
      ref={faceRef}
      className={`${s.face} ${side === 'front' ? s.front : s.back} ${matClass} ${extraClass ?? ''}`}
      aria-hidden={hidden || undefined}
      inert={hidden}
      data-face={side}
    >
      {showThrough && Reverse && material === 'paper' && (
        <div className={s.showThrough} aria-hidden inert>
          <Reverse />
        </div>
      )}
      <div className={s.content} data-content>
        <Content />
      </div>
      <div className={s.fibres} />
      <div className={s.grain} />
      <div className={s.gutter} />
      <Holes />
      <div className={s.shade} data-shade />
      <div className={s.cast} data-cast />
    </div>
  )
}

type LeafProps = {
  index: number
  leafRef: (el: HTMLDivElement | null) => void
  children: ReactNode
}

export function Leaf({ index, leafRef, children }: LeafProps) {
  return (
    <div ref={leafRef} className={s.leaf} data-leaf={index}>
      {children}
    </div>
  )
}
