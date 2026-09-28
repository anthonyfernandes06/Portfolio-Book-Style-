import { Body, CaseStudyLink, Figure, LessonHeadline, Page, Typed } from '@/components/page/Primitives'
import { LINKS } from '@/content/links'

export default function P16Spotify() {
  return (
    <Page side="left" number={16} runningHead="Anthony Fernandes">
      <Typed style={{ marginBottom: '1.6cqw', marginTop: '3cqw' }}>Playground</Typed>
      <LessonHeadline style={{ marginBottom: '3.5cqw' }}>
        <span style={{ fontSize: '1.2em' }}>What if Spotify had a DJ mode?</span>
      </LessonHeadline>
      <Body small>
        {/* [EDIT: add 1–2 sentences on your premise and the key design decision] */}
        <p>
          Some projects start with a brief. This one started with a question: what would it look like if the music app I open every day behaved a little more like a DJ?
        </p>
      </Body>
      <div style={{ marginTop: '3.4cqw' }}>
        <CaseStudyLink href={LINKS.spotify}>See the exploration</CaseStudyLink>
      </div>
      <Figure
        img="spotify"
        width={66}
        kind="screen"
        tapes={[{ corner: 'tl', variant: 0 }, { corner: 'tr', variant: 1 }]}
        rotate={-0.8}
        style={{ marginTop: 'auto', alignSelf: 'center' }}
      />
    </Page>
  )
}
