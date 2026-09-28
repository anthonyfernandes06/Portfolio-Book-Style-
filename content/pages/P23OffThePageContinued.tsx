import { Figure, MarginNote, Page } from '@/components/page/Primitives'
import s from './pages.module.css'

export default function P23OffThePageContinued() {
  return (
    <Page side="right" number={23} runningHead="Off the record">
      <div className={s.hobbyRow} style={{ marginTop: '3cqw' }}>
        <Figure img="dance" width={24} kind="bw" rotate={-1.2} ratio={0.8} position="50% 40%" tapes={[{ corner: 'top', variant: 2 }]} />
        <p className={s.hobby}>
          <strong>Dance.</strong> I love dancing. I’ve learnt multiple styles and spent a good part of my life teaching other people how to dance.
        </p>
      </div>
      <div className={s.hobbyRow} style={{ marginTop: '7cqw' }}>
        <Figure img="writing" width={18} kind="bw" rotate={1.4} ratio={0.8} position="50% 30%" />
        <p className={s.hobby}>
          <strong>Writing.</strong> I enjoy writing and telling stories, and I’ve spent some time writing quirky sketches for promotional content.
        </p>
      </div>
      {/* [EDIT] */}
      <MarginNote rotate={-3} style={{ marginTop: 'auto', maxWidth: '40ch' }}>
        notice a theme? a stage, a story, an audience. design isn’t so different.
      </MarginNote>
    </Page>
  )
}
