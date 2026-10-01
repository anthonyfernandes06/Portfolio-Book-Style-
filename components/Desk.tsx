import { BASE_PATH } from '@/content/images'
import { NoteCorner, NoteOnSketch, Pencil, SketchSheet, Specs } from './desk/Props'
import d from './desk/desk.module.css'
import s from './stage.module.css'

/** The desk the book lies on: walnut in late-afternoon window light, with a few working things. */
export default function Desk() {
  return (
    <>
      <div className={d.wood} style={{ backgroundImage: `url(${BASE_PATH}/images/desk.webp)` }} aria-hidden />
      <div className={d.props} aria-hidden>
        <SketchSheet />
        <NoteOnSketch />
        <Pencil />
        <Specs />
        <NoteCorner />
      </div>
      <div className={s.vignette} aria-hidden />
      <div className={s.blackout} aria-hidden />
    </>
  )
}

/** Window light over everything, book included (kept faint so the pages stay easy to read). */
export function Sunlight() {
  return <div className={d.sunlight} style={{ backgroundImage: `url(${BASE_PATH}/images/sunlight.webp)` }} aria-hidden />
}
