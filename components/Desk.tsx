import s from './stage.module.css'

export default function Desk() {
  return (
    <>
      <div className={s.desk} aria-hidden />
      <div className={s.vignette} aria-hidden />
      <div className={s.blackout} aria-hidden />
    </>
  )
}
