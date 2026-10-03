/**
 * Typesetting for the papers in the folder: printed sheets laid out like a
 * research paper (masthead, title block, abstract, numbered sections,
 * captioned figures, a booktabs table). Sizes are in em off the sheet's base
 * size, which scales with the sheet's width, so every sheet holds the same
 * amount on any desktop screen.
 */
import type { CSSProperties, ReactNode } from 'react'
import { BASE_PATH } from '@/content/images'
import { EMAIL, MAILTO } from '@/content/links'
import { PAPERS, type PaperId } from '@/content/papers/registry'
import s from './paper.module.css'

/** The whole paper: one printed sheet per entry in `sheets`, numbered, with running heads after the first. */
export function Paper({ id, sheets }: { id: PaperId; sheets: ReactNode[] }) {
  const meta = PAPERS[id]
  return (
    <article className={s.paper} aria-labelledby={`${id}-title`}>
      {sheets.map((content, i) => (
        <section key={i} className={s.sheet} data-sheet aria-label={`Page ${i + 1} of ${sheets.length}`}>
          {i === 0 ? (
            <Staple />
          ) : (
            <header className={s.runningHead} aria-hidden>
              <span>A. Fernandes</span>
              <span>{meta.short}</span>
            </header>
          )}
          <div className={s.body}>{content}</div>
          <footer className={s.folio} aria-hidden>
            {i + 1}
          </footer>
        </section>
      ))}
    </article>
  )
}

function Staple() {
  return <span className={s.staple} aria-hidden />
}

/** First-page furniture: journal line, title, author, date. */
export function TitleBlock({ id, kicker, tags }: { id: PaperId; kicker: string; tags: string }) {
  const { date } = PAPERS[id]
  return (
    <>
      <div className={s.masthead}>
        <span>{kicker}</span>
        <span>{tags}</span>
      </div>
      <h1 id={`${id}-title`} className={s.title}>
        {PAPERS[id].title}
      </h1>
      <div className={s.authors}>
        <p className={s.author}>Anthony Fernandes</p>
        <p className={s.affiliation}>Your friendly neighbourhood Product Designer</p>
        <p className={s.email}>
          <a href={MAILTO}>{EMAIL}</a>
        </p>
        <p className={s.date}>{date}</p>
      </div>
    </>
  )
}

/** The abstract, with an optional link set on its own line beneath it. */
export function Abstract({ children, cta }: { children: ReactNode; cta?: ReactNode }) {
  return (
    <div className={s.abstract}>
      <h2 className={s.abstractHead}>Abstract</h2>
      <p>{children}</p>
      {cta && <p className={s.abstractCta}>{cta}</p>}
    </div>
  )
}

export function H2({ n, children }: { n?: string; children: ReactNode }) {
  return (
    <h2 className={s.h2}>
      {n && <span className={s.num}>{n}</span>}
      {children}
    </h2>
  )
}

export function H3({ n, children }: { n: string; children: ReactNode }) {
  return (
    <h3 className={s.h3}>
      <span className={s.num}>{n}</span>
      {children}
    </h3>
  )
}

/** A paragraph heading that runs into what follows ("Expected impact."). */
export function Para({ children }: { children: ReactNode }) {
  return <h4 className={s.para}>{children}</h4>
}

export function Items({ children, numbered }: { children: ReactNode; numbered?: boolean }) {
  return numbered ? <ol className={s.list}>{children}</ol> : <ul className={s.list}>{children}</ul>
}

export function Fig({
  n,
  src,
  w,
  h,
  alt,
  width = 100,
  eager,
  children,
  style,
}: {
  n: number
  src: string
  w: number
  h: number
  alt: string
  /** Percent of the text width. */
  width?: number
  eager?: boolean
  children: ReactNode
  style?: CSSProperties
}) {
  return (
    <figure className={s.fig} style={style}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${BASE_PATH}/images/papers/${src}`}
        width={w}
        height={h}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        style={{ width: `${width}%` }}
      />
      <figcaption>
        <span className={s.figLabel}>Figure {n}.</span> {children}
      </figcaption>
    </figure>
  )
}

type Pie = { value: number; label: string; rest: string }

/** One slice from twelve o'clock, clockwise, on a unit circle. */
function slice(value: number) {
  const a = (value / 100) * 2 * Math.PI
  return `M0 0 L0 -1 A1 1 0 ${value > 50 ? 1 : 0} 1 ${Math.sin(a).toFixed(4)} ${(-Math.cos(a)).toFixed(4)} Z`
}

/** Pie charts set as one figure with lettered panels, as a paper would print them. */
export function PieFigure({ n, pies, children }: { n: number; pies: Pie[]; children: ReactNode }) {
  return (
    <figure className={s.fig}>
      <div className={s.pies}>
        {pies.map((p, i) => (
          <div key={p.label} className={s.pie}>
            <svg viewBox="-1.05 -1.05 2.1 2.1" aria-hidden>
              <circle r="1" className={s.pieRest} />
              <path d={slice(p.value)} className={s.pieValue} />
            </svg>
            <ul className={s.legend}>
              <li>
                <span className={s.swatch} data-tone="value" />
                <b>{p.value}%</b> {p.label}
              </li>
              <li>
                <span className={s.swatch} data-tone="rest" />
                <b>{100 - p.value}%</b> {p.rest}
              </li>
            </ul>
            <span className={s.panel}>({String.fromCharCode(97 + i)})</span>
          </div>
        ))}
      </div>
      <figcaption>
        <span className={s.figLabel}>Figure {n}.</span> {children}
      </figcaption>
    </figure>
  )
}

/** An outbound link, set in the text. */
export function Link({ href, children }: { href: string | null; children: ReactNode }) {
  return (
    <a className={s.mail} href={href ?? '#'} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

/** A booktabs table: thick rule, header, thin rule, rows, thick rule. Caption above, as journals set them. */
export function Table({ n, caption, head, rows }: { n: number; caption: ReactNode; head: [string, string]; rows: [string, string][] }) {
  return (
    <figure className={s.table}>
      <figcaption>
        <span className={s.figLabel}>Table {n}.</span> {caption}
      </figcaption>
      <table>
        <thead>
          <tr>
            <th scope="col">{head[0]}</th>
            <th scope="col">{head[1]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([a, b]) => (
            <tr key={a}>
              <th scope="row">{a}</th>
              <td>{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  )
}

/** The closing note: how to reach the author. */
export function Correspondence({ children }: { children: ReactNode }) {
  return (
    <div className={s.correspondence}>
      <H2>Correspondence</H2>
      <p>
        {children}{' '}
        <a className={s.mail} href={MAILTO}>
          {EMAIL}
        </a>
      </p>
    </div>
  )
}
