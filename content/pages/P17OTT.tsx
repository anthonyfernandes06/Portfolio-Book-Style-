import { Body, PaperLink, Figure, LessonHeadline, MarginNote, Page, Typed } from '@/components/page/Primitives'

export default function P17OTT() {
  return (
    <Page side="right" number={17} runningHead="The playground">
      <Typed style={{ marginBottom: '1.6cqw', marginTop: '3cqw' }}>Playground</Typed>
      <LessonHeadline style={{ marginBottom: '3.5cqw' }}>
        <span style={{ fontSize: '1.2em' }}>Solving account sharing for OTTs</span>
      </LessonHeadline>
      <Body small>
        <p>
          Almost everyone knows someone who shares a streaming account. In this concept, I explored how account sharing could be made more restrictive - but only for users who actively exploit the service, without penalising genuine sharing.
        </p>
      </Body>
      {/* Three prints, loosely taped and overlapping */}
      <div style={{ position: 'relative', height: '45cqw', marginTop: '6cqw' }}>
        <Figure
          img="ott"
          width={48}
          kind="screen"
          rotate={-1}
          tapes={[{ corner: 'tl', variant: 0 }]}
          style={{ position: 'absolute', left: 0, top: 0 }}
        />
        <Figure
          img="ottTv"
          width={40}
          kind="screen"
          rotate={2}
          tapes={[{ corner: 'tr', variant: 1 }]}
          style={{ position: 'absolute', left: '36cqw', top: '12cqw' }}
        />
        <Figure
          img="ottDevices"
          width={36}
          kind="screen"
          rotate={-2}
          tapes={[{ corner: 'top', variant: 2 }]}
          style={{ position: 'absolute', left: '5cqw', top: '24cqw' }}
        />
      </div>
      <MarginNote rotate={-3} style={{ marginTop: '4cqw', marginLeft: '4cqw', maxWidth: '52cqw' }}>
        P.S. I only came up with this concept because I was annoyed by how restrictive Amazon Prime had become.
      </MarginNote>
      <div style={{ marginTop: 'auto' }}>
        <PaperLink paper="ott">Read More</PaperLink>
      </div>
    </Page>
  )
}
