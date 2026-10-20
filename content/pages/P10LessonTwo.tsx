import { Figure, LessonHeadline, Page, Typed } from '@/components/page/Primitives'

export default function P10LessonTwo() {
  return (
    <Page side="left" number={10} runningHead="Anthony Fernandes">
      <LessonHeadline style={{ marginTop: '3cqw' }}>The product that taught me to think like a product manager.</LessonHeadline>
      {/* Three prints, loosely taped down and overlapping */}
      <div style={{ position: 'relative', height: '56cqw', marginTop: '7cqw' }}>
        <Figure
          img="researchAi"
          width={62}
          kind="screen"
          rotate={-1}
          tapes={[{ corner: 'top', variant: 1 }]}
          style={{ position: 'absolute', left: 0, top: 0 }}
        />
        <Figure
          img="researchAiLogic"
          width={40}
          kind="screen"
          rotate={2}
          tapes={[{ corner: 'tr', variant: 0 }]}
          style={{ position: 'absolute', left: '34cqw', top: '20cqw' }}
        />
        <Figure
          img="researchAiInsights"
          width={35}
          kind="screen"
          rotate={-2.5}
          tapes={[{ corner: 'tl', variant: 2 }]}
          style={{ position: 'absolute', left: '3cqw', top: '33cqw' }}
        />
      </div>
      <Typed as="p" style={{ fontSize: '1.55cqw', marginTop: '3cqw' }}>
        Fig. 03. Research AI: survey builder, survey logic and AI insights
      </Typed>
    </Page>
  )
}
