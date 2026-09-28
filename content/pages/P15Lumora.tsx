import { Body, CaseStudyLink, CrossRef, MarginNote, Page, ProjectTitle } from '@/components/page/Primitives'
import { LINKS } from '@/content/links'

export default function P15Lumora() {
  return (
    <Page side="right" number={15} runningHead="The playground">
      <ProjectTitle title="Lumora, an AI financial advisor" tags="Concept, AI, Fin-tech" style={{ marginBottom: '4.5cqw' }} />
      <Body>
        <p>
          The idea behind Lumora is simple: use AI to help people take control of their entire financial life, from savings, loans and insurance to investments and the big decisions in between, without depending on expensive financial advisors.
        </p>
        <p style={{ position: 'relative' }}>
          I didn’t stop at screens. I vibe-coded the entire working demo in a single week.
          <MarginNote rotate={-6} as="span" style={{ position: 'absolute', right: '-1cqw', bottom: '-5.2cqw' }}>
            yes, one week
          </MarginNote>
        </p>
      </Body>
      <div style={{ marginTop: '9cqw' }}>
        <CaseStudyLink href={LINKS.lumoraDemo}>Try the demo</CaseStudyLink>
      </div>
      <div style={{ marginTop: 'auto' }}>
        <CrossRef toPage={24}>more on why money matters to me, p.</CrossRef>
      </div>
    </Page>
  )
}
