import { Body, CaseStudyLink, CrossRef, Page, ProjectTitle } from '@/components/page/Primitives'
import { LINKS } from '@/content/links'

export default function P15Lumora() {
  return (
    <Page side="right" number={15} runningHead="The playground">
      <ProjectTitle title="Lumora, an AI financial advisor" tags="Concept, AI, Fin-tech" style={{ marginBottom: '4.5cqw' }} />
      <Body>
        <p>
          Financial advice is something that cannot be templatised. It is highly dependent on who you’re giving advice to and their context - their income, loans, dependants, lifestyle, and much more. This makes truly personalised advice extremely challenging, and as a result, people often struggle to make sound financial decisions and can fall into debt traps.
        </p>
        <p>
          The idea behind Lumora was simple: can we leverage AI to understand this context and help people make better financial decisions?
        </p>
        <p>Since this idea had been running through my head for a while, I decided to vibe code it.</p>
      </Body>
      <div style={{ marginTop: '6cqw' }}>
        <CaseStudyLink href={LINKS.lumoraDemo}>Try the demo</CaseStudyLink>
      </div>
      <div style={{ marginTop: 'auto' }}>
        <CrossRef toPage={24}>more on why money matters to me, p.</CrossRef>
      </div>
    </Page>
  )
}
