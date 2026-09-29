import { Figure, LessonHeadline, Page, Typed } from '@/components/page/Primitives'

export default function P12LessonThree() {
  return (
    <Page side="left" number={12} runningHead="Anthony Fernandes">
      <Typed style={{ marginBottom: '1.6cqw', marginTop: '3cqw' }}>Lesson three</Typed>
      <LessonHeadline>The product that taught me not to execute every idea at once.</LessonHeadline>
      {/* The overview print, with two close-up screens taped below it */}
      <div style={{ position: 'relative', height: '64cqw', marginTop: '8cqw' }}>
        <Figure
          img="gold"
          width={70}
          kind="screen"
          tapes={[{ corner: 'tl', variant: 1 }, { corner: 'tr', variant: 2 }]}
          rotate={0.5}
          style={{ position: 'absolute', left: 0, top: 0 }}
        />
        <Figure
          img="goldClient"
          width={32}
          kind="screen"
          rotate={-2}
          tapes={[{ corner: 'top', variant: 0 }]}
          style={{ position: 'absolute', left: '4cqw', top: '27cqw' }}
        />
        <Figure
          img="goldDashboard"
          width={28}
          kind="screen"
          rotate={2.5}
          tapes={[{ corner: 'top', variant: 2 }]}
          style={{ position: 'absolute', left: '41cqw', top: '24cqw' }}
        />
      </div>
      <Typed as="p" style={{ fontSize: '1.55cqw', marginTop: '2cqw' }}>
        Fig. 05. Agent sales platform
      </Typed>
    </Page>
  )
}
