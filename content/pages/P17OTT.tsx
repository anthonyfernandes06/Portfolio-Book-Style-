import { Body, CaseStudyLink, Figure, LessonHeadline, Page, Typed } from '@/components/page/Primitives'
import { LINKS } from '@/content/links'

export default function P17OTT() {
  return (
    <Page side="right" number={17} runningHead="The playground">
      <Typed style={{ marginBottom: '1.6cqw', marginTop: '3cqw' }}>Playground</Typed>
      <LessonHeadline style={{ marginBottom: '3.5cqw' }}>
        <span style={{ fontSize: '1.2em' }}>Solving account sharing for OTTs</span>
      </LessonHeadline>
      <Body small>
        {/* [EDIT: add your angle and outcome in 1–2 sentences] */}
        <p>
          Almost everyone knows someone who shares a streaming account. This concept explores how an OTT platform might approach that reality through design.
        </p>
      </Body>
      <Figure
        img="ott"
        width={64}
        kind="screen"
        rotate={1}
        tapes={[{ corner: 'tl', variant: 0 }, { corner: 'br', variant: 2 }]}
        style={{ marginTop: '9cqw', alignSelf: 'center' }}
      />
      <div style={{ marginTop: 'auto' }}>
        <CaseStudyLink href={LINKS.ott}>See the exploration</CaseStudyLink>
      </div>
    </Page>
  )
}
