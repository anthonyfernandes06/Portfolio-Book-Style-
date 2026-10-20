import { Body, ChapterOpener, Figure, LessonHeadline, Page, Typed } from '@/components/page/Primitives'

export default function P08ChapterThree() {
  return (
    <Page side="left" number={8}>
      <ChapterOpener label="Chapter three" title="Some of my work" style={{ marginBottom: '3cqw' }} />
      <Body small>
        <p>I’ve worked on more than forty products. These are four of them &amp; what these projects taught me.</p>
      </Body>
      <LessonHeadline style={{ marginTop: '5cqw' }}>The product that taught me to balance the needs of two user groups.</LessonHeadline>
      {/* Two prints, loosely taped down and overlapping */}
      <div style={{ position: 'relative', height: '45cqw', marginTop: '6cqw' }}>
        <Figure
          img="shoonyaPhones"
          width={60}
          kind="screen"
          rotate={-1}
          tapes={[{ corner: 'top', variant: 1 }]}
          style={{ position: 'absolute', left: 0, top: 0 }}
        />
        <Figure
          img="shoonyaScreens"
          width={38}
          kind="screen"
          rotate={2}
          tapes={[{ corner: 'tr', variant: 0 }]}
          style={{ position: 'absolute', left: '33cqw', top: '20cqw' }}
        />
      </div>
      <Typed as="p" style={{ fontSize: '1.55cqw', marginTop: '2cqw' }}>
        Fig. 02. Shoonya: step-up SIPs for investors, swipe to trade for traders
      </Typed>
    </Page>
  )
}
