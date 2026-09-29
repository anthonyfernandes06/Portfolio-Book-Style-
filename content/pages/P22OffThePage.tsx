import { ChapterOpener, Figure, Page } from '@/components/page/Primitives'
import s from './pages.module.css'

export default function P22OffThePage() {
  return (
    <Page side="left" number={22}>
      <ChapterOpener label="Chapter eight" title="Off the record" style={{ marginBottom: '3cqw' }} />
      <p style={{ fontSize: '2.45cqw', lineHeight: 1.5 }}>
        Here’s what I’m doing when I’m not designing. (Trust me, I’m designing quite often, though.)
      </p>
      <p className={s.hobby} style={{ marginTop: '3.4cqw' }}>
        <strong>Improv.</strong> Lately, one of my favourite things to do is perform improv. I’ve always been drawn to theatre and comedy, and improv turned out to be the perfect middle ground.
      </p>
      {/* Four prints from the stage, loosely taped and overlapping */}
      <div style={{ position: 'relative', height: '56cqw', marginTop: '5cqw' }}>
        <Figure img="improv1" width={42} kind="bw" rotate={-2} tapes={[{ corner: 'tl', variant: 0 }]} style={{ position: 'absolute', left: 0, top: 0 }} />
        <Figure img="improv3" width={33} kind="bw" rotate={2.5} tapes={[{ corner: 'tr', variant: 1 }]} style={{ position: 'absolute', left: '43cqw', top: '2cqw' }} />
        <Figure img="improv4" width={37} kind="bw" rotate={1.5} tapes={[{ corner: 'top', variant: 2 }]} style={{ position: 'absolute', left: '3cqw', top: '25cqw' }} />
        <Figure img="improv2" width={34} kind="bw" rotate={-2.5} tapes={[{ corner: 'top', variant: 0 }]} style={{ position: 'absolute', left: '42cqw', top: '29cqw' }} />
      </div>
    </Page>
  )
}
