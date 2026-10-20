import { Body, CaseStudyLink, ImpactCard, Page, PaperLink, ProjectTitle } from '@/components/page/Primitives'
import { LINKS } from '@/content/links'

export default function P11ResearchAI() {
  return (
    <Page side="right" number={11} runningHead="Some of my work">
      <ProjectTitle title="Research AI" tags="Web App, Research Tool, YellowSlice Product" style={{ marginBottom: '4.5cqw' }} />
      <Body>
        <p>Research AI started as an in-house product at Yellow Slice with a simple ambition: help teams run research faster.</p>
        <p>
          In its current phase, it helps teams create surveys and analyse the responses using AI, fast-tracking research that would otherwise take far longer to do manually.
        </p>
        <p>
          Designing it meant wearing a different hat. I wasn’t only deciding how the experience should feel; I was deciding what to build, what to leave out, and why. That’s where I learned to think like a product manager.
        </p>
      </Body>
      <ImpactCard
        title="The impact of product"
        items={[
          { value: '−30%', label: 'Survey analysis time' },
          { value: '−50%', label: 'Time to roll out a survey' },
        ]}
        style={{ marginTop: '5cqw', width: '62cqw', alignSelf: 'center' }}
      />
      <div style={{ marginTop: 'auto', display: 'flex', flexWrap: 'wrap', gap: '2.5cqw 7cqw' }}>
        <CaseStudyLink href={LINKS.researchAiDemo}>View Product</CaseStudyLink>
        <PaperLink paper="reesearch">Read Case Study</PaperLink>
      </div>
    </Page>
  )
}
