import { ChapterOpener, Figure, Page } from '@/components/page/Primitives'
import s from './pages.module.css'

export default function P22OffThePage() {
  return (
    <Page side="left" number={22}>
      <ChapterOpener label="Chapter eight" title="Off the record" style={{ marginBottom: '3cqw' }} />
      <p style={{ fontSize: '2.45cqw', lineHeight: 1.5 }}>
        Here’s what I’m doing when I’m not designing. (Trust me, I’m designing quite often, though.)
      </p>
      <Figure
        img="improv"
        width={56}
        kind="bw"
        rotate={-1}
        tapes={[{ corner: 'tl', variant: 0 }, { corner: 'tr', variant: 1 }]}
        style={{ marginTop: '5.5cqw', marginLeft: '3cqw' }}
      />
      <p className={s.hobby} style={{ marginTop: '3.4cqw' }}>
        <strong>Improv.</strong> Lately, one of my favourite things to do is perform improv. I’ve always been drawn to theatre and comedy, and improv turned out to be the perfect middle ground.
      </p>
      <div className={s.hobbyRow} style={{ marginTop: '4cqw' }}>
        <Figure img="standup" width={13} kind="bw" rotate={1.5} ratio={0.75} position="50% 35%" />
        <p className={s.hobby}>
          <strong>Stand-up.</strong> I tried my hand at stand-up comedy too, and failed miserably. So now I just crack bad jokes on team calls.
        </p>
      </div>
    </Page>
  )
}
