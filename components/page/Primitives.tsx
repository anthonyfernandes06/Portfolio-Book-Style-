'use client'
import Image from 'next/image'
import type { CSSProperties, ReactNode } from 'react'
import { IMAGES, type ImageKey } from '@/content/images'
import { EMAIL, MAILTO } from '@/content/links'
import { PAPERS, type PaperId } from '@/content/papers/registry'
import { openPaper, scrollToPage, store, useBookState } from '@/lib/progress'
import { BinderClip, PaperClip, Tape } from '@/components/svg/Attachments'
import { HandCircle, Squiggle } from '@/components/svg/Strokes'
import s from './page.module.css'

/* ------------------------------------------------------------------ */

type PageProps = {
  side: 'left' | 'right'
  number?: number
  runningHead?: string
  /** Page number + footer email (off for covers and the inside cover). */
  chrome?: boolean
  label?: string
  children: ReactNode
  areaStyle?: CSSProperties
}

export function Page({ side, number, runningHead, chrome = true, label, children, areaStyle }: PageProps) {
  const name = label ?? (number ? `Page ${number}` : undefined)
  return (
    <article className={s.page} data-side={side} aria-label={name}>
      {runningHead && (
        <div className={s.runningHead} aria-hidden>
          {runningHead}
        </div>
      )}
      <div className={s.area} style={areaStyle}>
        {children}
      </div>
      {chrome && <PageFooter number={number} />}
    </article>
  )
}

export function PageFooter({ number }: { number?: number }) {
  return (
    <footer className={s.footer}>
      <a className={s.footEmail} href={MAILTO} tabIndex={-1}>
        {EMAIL}
      </a>
      {number !== undefined && <span className={s.pageNo}>{number}</span>}
    </footer>
  )
}

/* ------------------------------------------------------------------ */

export function ChapterOpener({ label, title, style }: { label: string; title: ReactNode; style?: CSSProperties }) {
  return (
    <header className={s.opener} style={style}>
      <span className={s.chapterLabel}>{label}</span>
      <h2 className={s.chapterTitle}>{title}</h2>
    </header>
  )
}

export function Typed({ children, style, as: Tag = 'span' }: { children: ReactNode; style?: CSSProperties; as?: 'span' | 'p' | 'div' }) {
  return (
    <Tag className={s.typed} style={style}>
      {children}
    </Tag>
  )
}

export function Body({ children, style, small, indent }: { children: ReactNode; style?: CSSProperties; small?: boolean; indent?: boolean }) {
  return (
    <div className={`${s.body} ${small ? s.small : ''} ${indent ? s.indent : ''}`} style={style}>
      {children}
    </div>
  )
}

export function LessonHeadline({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <h3 className={s.lesson} style={style}>
      {children}
    </h3>
  )
}

export function ProjectTitle({ title, tags, style, as: Tag = 'h2' }: { title: ReactNode; tags?: string; style?: CSSProperties; as?: 'h2' | 'h3' }) {
  return (
    <header style={style}>
      <Tag className={s.projectTitle}>{title}</Tag>
      {tags && <span className={s.tags}>{tags}</span>}
    </header>
  )
}

/* ------------------------------------------------------------------ */

type TapeSpec = { corner: 'tl' | 'tr' | 'bl' | 'br' | 'top'; variant?: 0 | 1 | 2 }

type FigureProps = {
  img: ImageKey
  caption?: ReactNode
  captionPosition?: 'below' | 'side'
  attach?: 'paperclip' | 'binder' | 'tape' | 'none'
  /** Horizontal position of a clip, as % of the figure width. */
  clipAt?: number
  clipRotate?: number
  tapes?: TapeSpec[]
  rotate?: number
  /** Print width in cqw. */
  width: number
  /** Crop aspect (w/h). Defaults to the image's own. */
  ratio?: number
  kind?: 'photo' | 'screen' | 'bw'
  position?: 'center' | 'top' | string
  style?: CSSProperties
  priority?: boolean
}

const TAPE_POS: Record<TapeSpec['corner'], CSSProperties> = {
  tl: { top: '-1.2cqw', left: '-4.2cqw', transform: 'rotate(-38deg)' },
  tr: { top: '-1.2cqw', right: '-4.2cqw', transform: 'rotate(38deg)' },
  bl: { bottom: '-1.2cqw', left: '-4.2cqw', transform: 'rotate(38deg)' },
  br: { bottom: '-1.2cqw', right: '-4.2cqw', transform: 'rotate(-38deg)' },
  top: { top: '-1.8cqw', left: '50%', transform: 'translateX(-50%) rotate(-3deg)' },
}

export function Figure({
  img,
  caption,
  captionPosition = 'below',
  attach = 'none',
  clipAt = 16,
  clipRotate = -8,
  tapes,
  rotate = 0,
  width,
  ratio,
  kind = 'photo',
  position = 'center',
  style,
  priority,
}: FigureProps) {
  const im = IMAGES[img]
  const aspect = ratio ?? im.w / im.h
  const kindClass = kind === 'screen' ? s.screen : kind === 'bw' ? s.bw : ''
  const tapeList = attach === 'tape' ? (tapes ?? [{ corner: 'top' }]) : (tapes ?? [])
  return (
    <figure className={s.figure} style={{ width: `${width}cqw`, transform: rotate ? `rotate(${rotate}deg)` : undefined, ...style }}>
      <div className={`${s.print} ${kindClass}`} style={{ aspectRatio: String(aspect) }}>
        <Image
          src={im.src}
          alt={im.alt}
          width={im.w}
          height={im.h}
          sizes="(max-width: 768px) 80vw, 30vw"
          loading={priority ? 'eager' : 'lazy'}
          priority={priority}
          style={{ objectPosition: position }}
        />
      </div>
      {attach === 'paperclip' && (
        <PaperClip className={s.paperclip} style={{ left: `${clipAt}%`, transform: `rotate(${clipRotate}deg)` }} />
      )}
      {attach === 'binder' && <BinderClip className={s.binder} style={{ left: `${clipAt}%`, transform: `translateX(-50%) rotate(${clipRotate}deg)` }} />}
      {tapeList.map((t, i) => (
        <Tape key={i} className={s.tape} variant={t.variant ?? ((i % 3) as 0 | 1 | 2)} style={TAPE_POS[t.corner]} />
      ))}
      {caption && <figcaption className={`${s.caption} ${captionPosition === 'side' ? s.captionSide : ''}`}>{caption}</figcaption>}
    </figure>
  )
}

/* ------------------------------------------------------------------ */

export function MarginNote({ children, rotate = -3, style, as: Tag = 'p' }: { children: ReactNode; rotate?: number; style?: CSSProperties; as?: 'p' | 'span' }) {
  return (
    <Tag className={s.note} style={{ transform: `rotate(${rotate}deg)`, ...style }}>
      {children}
    </Tag>
  )
}

export function CrossRef({ toPage, children, style }: { toPage: number; children?: ReactNode; style?: CSSProperties }) {
  return (
    <button className={s.crossRef} style={style} onClick={() => scrollToPage(toPage)} aria-label={`Go to page ${toPage}`}>
      {children ?? 'see p.'}
      <span className={s.crossNum}>
        {toPage}
        <HandCircle className={s.crossCircle} />
      </span>
    </button>
  )
}

export function InkLink({ href, children, style, className, newTab = true }: { href: string | null; children: ReactNode; style?: CSSProperties; className?: string; newTab?: boolean }) {
  const external = !!href && /^https?:/.test(href)
  return (
    <a
      className={`${s.link} ${className ?? ''}`}
      href={href ?? '#'}
      style={style}
      onClick={href ? undefined : (e) => e.preventDefault()}
      aria-disabled={href ? undefined : true}
      target={external && newTab ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      {children}
      <Squiggle className={s.squiggle} />
    </a>
  )
}

export function CaseStudyLink({ href, children = 'Read the full case study', style }: { href: string | null; children?: ReactNode; style?: CSSProperties }) {
  return (
    <InkLink href={href} className={s.caseLink} style={style}>
      {children}
    </InkLink>
  )
}

/** Like a case-study link, but it pulls the full paper out of the folder on the desk. */
export function PaperLink({ paper, children = 'Read the paper', style }: { paper: PaperId; children?: ReactNode; style?: CSSProperties }) {
  return (
    <a
      className={`${s.link} ${s.caseLink}`}
      href={`#${PAPERS[paper].slug}`}
      style={style}
      onClick={(e) => {
        e.preventDefault()
        openPaper(paper)
      }}
    >
      {children}
      <Squiggle className={s.squiggle} />
    </a>
  )
}

/* ------------------------------------------------------------------ */

export function Stamp({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  const frame = (
    <svg className={s.stampFrame} viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden>
      <g fill="none" stroke="currentColor" vectorEffect="non-scaling-stroke">
        <rect x="1" y="1" width="98" height="58" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
        <rect x="3.2" y="4" width="93.6" height="52" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
      </g>
    </svg>
  )
  return (
    <div className={s.stamp} style={style}>
      <div className={s.stampInk}>
        {frame}
        {children}
      </div>
      <div className={`${s.stampInk} ${s.stampGhost}`} aria-hidden>
        {frame}
        <div style={{ visibility: 'hidden' }}>{children}</div>
      </div>
    </div>
  )
}

/** Deterministic irregular edge, so each label tears differently but renders identically on server and client. */
function tornPolygon(seed: number) {
  let x = seed * 9301 + 49297
  const rnd = () => ((x = (x * 9301 + 49297) % 233280) / 233280)
  const top: string[] = []
  const bottom: string[] = []
  for (let i = 0; i <= 10; i++) {
    top.push(`${i * 10}% ${(rnd() * 9).toFixed(1)}%`)
    bottom.unshift(`${i * 10}% ${(100 - rnd() * 9).toFixed(1)}%`)
  }
  return `polygon(${[...top, `${100 - rnd() * 2}% 50%`, ...bottom, `${rnd() * 2}% 50%`].join(', ')})`
}

export function TornLabel({ children, seed = 1, rotate = 0, style }: { children: ReactNode; seed?: number; rotate?: number; style?: CSSProperties }) {
  return (
    <span className={s.torn} style={{ clipPath: tornPolygon(seed), transform: `rotate(${rotate}deg)`, ...style }}>
      {children}
    </span>
  )
}

export function IndexCard({ children, rotate = -1.5, style }: { children: ReactNode; rotate?: number; style?: CSSProperties }) {
  return (
    <div className={s.card} style={{ transform: `rotate(${rotate}deg)`, ...style }}>
      <Tape className={s.tape} variant={1} style={TAPE_POS.top} />
      {children}
    </div>
  )
}

export function Letter({ children }: { children: ReactNode }) {
  return (
    <div className={s.letter}>
      <div className={s.foldH} />
      <div className={s.foldV} />
      <div className={s.letterInner}>{children}</div>
    </div>
  )
}

/** A hand-drawn SVG that draws itself when the spread holding `page` settles (or always, without `page`). */
export function HandDrawnSVG({ children, page, style, className, duration = 1.2, delay = 0 }: { children: ReactNode; page?: number; style?: CSSProperties; className?: string; duration?: number; delay?: number }) {
  const st = useBookState()
  const spread = page === undefined ? undefined : store.cfg.pageToSpread(page)
  const play = spread === undefined ? true : st.atRest && st.settled === spread
  const drawn = spread !== undefined && st.settled > spread
  return (
    <div
      className={`${s.drawn} ${play ? s.play : ''} ${drawn ? s.static : ''} ${className ?? ''}`}
      style={{ ...style, ['--draw-dur' as string]: `${duration}s`, ['--draw-delay' as string]: `${delay}s` }}
    >
      {children}
    </div>
  )
}

export { s as pageStyles }
