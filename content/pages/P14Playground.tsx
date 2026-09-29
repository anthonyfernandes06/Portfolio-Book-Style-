import { Body, ChapterOpener, Figure, MarginNote, Page, Typed } from '@/components/page/Primitives'

export default function P14Playground() {
  return (
    <Page side="left" number={14}>
      <ChapterOpener label="Chapter four" title="The playground" style={{ marginBottom: '3.5cqw' }} />
      <Body small>
        <p>
          I&apos;m not always designing for clients. Sometimes, I design purely for the fun of it, to answer a question that won’t leave me alone, put an inspiration to some use, or simply because I’m bored. Here’s some of that after-hours work.
        </p>
      </Body>
      {/* Three Lumora prints, loosely taped and overlapping */}
      <div style={{ position: 'relative', height: '49cqw', marginTop: '6cqw' }}>
        <Figure
          img="lumoraBenefits"
          width={52}
          kind="screen"
          rotate={-0.8}
          tapes={[{ corner: 'tl', variant: 1 }]}
          style={{ position: 'absolute', left: 0, top: 0 }}
        />
        <Figure
          img="lumoraInsights"
          width={40}
          kind="screen"
          rotate={2}
          tapes={[{ corner: 'tr', variant: 0 }]}
          style={{ position: 'absolute', left: '36cqw', top: '16cqw' }}
        />
        <Figure
          img="lumoraLiteracy"
          width={30}
          kind="screen"
          rotate={-2.5}
          tapes={[{ corner: 'top', variant: 2 }]}
          style={{ position: 'absolute', left: '3cqw', top: '29cqw' }}
        />
      </div>
      <Typed style={{ fontSize: '1.55cqw' }} as="p">
        Fig. 07. Lumora, concept
      </Typed>
      <MarginNote rotate={-3} style={{ marginTop: 'auto', marginLeft: '8cqw', maxWidth: '44cqw' }}>
        P.S. In my free time, I give people unsolicited financial advice.
      </MarginNote>
    </Page>
  )
}
