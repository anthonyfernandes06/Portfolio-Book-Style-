import { Body, CaseStudyLink, Page, ProjectTitle } from '@/components/page/Primitives'
import { LINKS } from '@/content/links'

export default function P09ResearchAI() {
  return (
    <Page side="right" number={9} runningHead="Some of my work">
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
      <div style={{ marginTop: 'auto' }}>
        <CaseStudyLink href={LINKS.researchAiDemo}>View Product Demo</CaseStudyLink>
      </div>
    </Page>
  )
}
