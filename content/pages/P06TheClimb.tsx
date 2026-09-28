import { Body, ChapterOpener, Page } from '@/components/page/Primitives'

export default function P06TheClimb() {
  return (
    <Page side="left" number={6}>
      <ChapterOpener label="Chapter two" title="The journey so far" />
      <Body>
        <p>
          Five years ago, if you had told me I’d still be at Yellow Slice today, and that one day I’d be the one leading its design team, I would have simply laughed it off.
        </p>
        <p>
          But that’s where the journey took me. I walked in as a junior UX designer. I grew into lead UX, then head of UX, and eventually became the design head of the company.
        </p>
      </Body>
    </Page>
  )
}
