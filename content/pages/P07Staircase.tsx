import { IndexCard, MarginNote, Page } from '@/components/page/Primitives'
import { Staircase } from '@/components/svg/Strokes'
import s from './pages.module.css'

const STEPS = [
  { label: 'Junior UX designer', left: '1%', top: '96.4%' },
  { label: 'Lead UX', left: '25%', top: '78.2%' },
  { label: 'Head of UX', left: '43%', top: '60%' },
  { label: 'Head of design', left: '61%', top: '41.8%' },
  { label: 'Coming Soon!', left: '83.5%', top: '23.6%' },
]

export default function P07Staircase() {
  return (
    <Page side="right" number={7} runningHead="The journey so far">
      <h3 className="visually-hidden">The staircase: from junior UX designer to head of design, with more coming soon</h3>
      <div className={s.stairs}>
        <Staircase />
        <ol style={{ listStyle: 'none' }}>
          {STEPS.map((st) => (
            <li key={st.label} className={s.stepLabel} style={{ left: st.left, top: st.top }}>
              {st.label}
            </li>
          ))}
        </ol>
        <MarginNote rotate={-5} style={{ position: 'absolute', left: '0%', top: '12%', width: '36cqw' }} as="span">
          first time managing people can be extremely humbling...... &amp; frustrating
        </MarginNote>
      </div>
      <IndexCard rotate={-1.5} style={{ marginTop: 'auto', width: '66cqw', alignSelf: 'center' }}>
        What no one warns you about in management: You can be great at designing screens, but designing how a team works is a whole different ball game.
      </IndexCard>
    </Page>
  )
}
