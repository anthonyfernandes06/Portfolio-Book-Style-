import { Body, PaperLink, Figure, LessonHeadline, Page, Typed } from '@/components/page/Primitives'

export default function P16Spotify() {
  return (
    <Page side="left" number={16} runningHead="Anthony Fernandes">
      <Typed style={{ marginBottom: '1.6cqw', marginTop: '3cqw' }}>Playground</Typed>
      <LessonHeadline style={{ marginBottom: '3.5cqw' }}>
        <span style={{ fontSize: '1.2em' }}>What if Spotify had a DJ mode?</span>
      </LessonHeadline>
      <Body small>
        <p>Some projects start with a brief. This one started with a question: what if Spotify could be the DJ at my house party?</p>
      </Body>
      <div style={{ marginTop: '3.4cqw' }}>
        <PaperLink paper="spotify">Read More</PaperLink>
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
