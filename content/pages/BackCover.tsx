'use client'
import Barcode from '@/components/svg/Barcode'
import { InkLink } from '@/components/page/Primitives'
import { EMAIL, LINKS, MAILTO } from '@/content/links'
import { scrollToSpread } from '@/lib/progress'
import s from './pages.module.css'

export default function BackCover() {
  return (
    <article className={`${s.cover} ${s.back}`} aria-label="Back cover">
      <p className={s.blurb}>
        A short, honest account of a designer looking for the next chapter of his story.
      </p>
      {/* [One real testimonial from a colleague or client, with name and role. Omitted until supplied.] */}
      <div className={s.getInTouch}>
        <h2 style={{ font: 'inherit' }}>Get in touch</h2>
        <InkLink href={MAILTO}>{EMAIL}</InkLink>
        <div>
          <InkLink href={LINKS.linkedin}>LinkedIn</InkLink>
          <span aria-hidden> · </span>
          <InkLink href={LINKS.resume}>Résumé</InkLink>
        </div>
      </div>
      <div className={s.backBottom}>
        <div className={s.isbn}>
          <Barcode />
          ISBN 978-0-ANTHONY-F
        </div>
        <p className={s.colophon}>
          Set in Newsreader and Courier Prime.
          <br />
          Designed by Anthony Fernandes.
          <br />
          Built, page by page, with Claude Code.
        </p>
      </div>
      <p className={s.tagline}>Your friendly neighbourhood product designer</p>
      <button className={s.again} onClick={() => scrollToSpread(0)}>
        <span style={{ borderBottom: '1px solid rgba(47,62,99,0.5)' }}>Read it again</span>
      </button>
    </article>
  )
}
