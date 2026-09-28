import { Body, ChapterOpener, Figure, LessonHeadline, Page, Typed } from '@/components/page/Primitives'

export default function P08ChapterThree() {
  return (
    <Page side="left" number={8}>
      <ChapterOpener label="Chapter three" title="Some of my work" style={{ marginBottom: '3cqw' }} />
      <Body small>
        <p>I’ve worked on more than forty products. These are three of them &amp; what these projects taught me.</p>
      </Body>
      <LessonHeadline style={{ marginTop: '5cqw' }}>The product that taught me to think like a product manager.</LessonHeadline>
      {/* Three prints, loosely taped down and overlapping */}
      <div style={{ position: 'relative', height: '47cqw', marginTop: '6cqw' }}>
        <Figure
          img="researchAi"
          width={54}
          kind="screen"
          rotate={-1}
          tapes={[{ corner: 'top', variant: 1 }]}
          style={{ position: 'absolute', left: 0, top: 0 }}
        />
        <Figure
          img="researchAiLogic"
          width={36}
          kind="screen"
          rotate={2}
          tapes={[{ corner: 'tr', variant: 0 }]}
          style={{ position: 'absolute', left: '36cqw', top: '15cqw' }}
        />
        <Figure
          img="researchAiInsights"
          width={31}
          kind="screen"
          rotate={-2.5}
          tapes={[{ corner: 'tl', variant: 2 }]}
          style={{ position: 'absolute', left: '3cqw', top: '27cqw' }}
        />
      </div>
      <Typed as="p" style={{ fontSize: '1.55cqw', marginTop: '2cqw' }}>
        Fig. 02. Research AI: survey builder, survey logic and AI insights
      </Typed>
    </Page>
  )
}
