import { Letter, Page } from '@/components/page/Primitives'
import s from './pages.module.css'

export default function P03Prologue() {
  return (
    <Page side="right" number={3} runningHead="Prologue">
      <Letter>
        {/* [EDIT to launch month] */}
        <span className={s.date}>September 2026</span>
        <h2 className="visually-hidden">Prologue: From my desk to yours</h2>
        <div className={s.letterBody}>
          <p className={s.salutation}>From my desk to yours,</p>
          <p>Most portfolios want to be skimmed. This one would rather be read.</p>
          <p style={{ textIndent: '1.5em' }}>
            What you’re holding is a short book about the last five years of my life: the products I’ve shaped, the people I’ve led, the lessons that came the hard way, and a few things I do when nobody is paying me to design.
          </p>
          <p style={{ textIndent: '1.5em' }}>
            You don’t have to read it cover to cover. But if you do, I think you’ll know me a little better by the end than any résumé could manage.
          </p>
          <p style={{ textIndent: '1.5em' }}>Thank you for turning the page.</p>
          <p style={{ marginTop: '0.9em' }}>Best,</p>
          <span className={s.signature}>Anthony</span>
        </div>
      </Letter>
    </Page>
  )
}
