import { Body, ChapterOpener, Figure, Page, Typed } from '@/components/page/Primitives'

export default function P14Playground() {
  return (
    <Page side="left" number={14}>
      <ChapterOpener label="Chapter four" title="The playground" style={{ marginBottom: '3.5cqw' }} />
      <Body small>
        <p>
          I’m not always designing for clients. Sometimes I design purely for the fun of it, to chase a question that won’t leave me alone. These are a few of those.
        </p>
      </Body>
      <div style={{ position: 'relative', marginTop: '7cqw', height: '44cqw' }}>
        <Figure img="lumora1" width={52} kind="screen" style={{ position: 'absolute', left: 0, top: 0 }} />
        <Figure
          img="lumora2"
          width={28}
          kind="screen"
          rotate={3}
          tapes={[{ corner: 'top', variant: 2 }]}
          style={{ position: 'absolute', left: '44cqw', top: '10cqw' }}
        />
      </div>
      <Typed style={{ fontSize: '1.55cqw' }} as="p">
        Fig. 06. Lumora, concept
      </Typed>
    </Page>
  )
}
