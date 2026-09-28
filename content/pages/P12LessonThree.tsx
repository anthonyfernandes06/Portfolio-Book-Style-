import { Figure, LessonHeadline, Page, Typed } from '@/components/page/Primitives'

export default function P12LessonThree() {
  return (
    <Page side="left" number={12} runningHead="Anthony Fernandes">
      <Typed style={{ marginBottom: '1.6cqw', marginTop: '3cqw' }}>Lesson three</Typed>
      <LessonHeadline>The product that taught me not to execute every idea at once.</LessonHeadline>
      <Figure
        img="gold"
        width={74}
        kind="screen"
        tapes={[{ corner: 'tl', variant: 1 }, { corner: 'tr', variant: 2 }]}
        rotate={0.5}
        caption="Fig. 05. Agent sales platform"
        style={{ marginTop: '11cqw' }}
      />
    </Page>
  )
}
