import { Body, CaseStudyLink, Page, ProjectTitle } from '@/components/page/Primitives'
import { LINKS } from '@/content/links'

export default function P13Gold() {
  return (
    <Page side="right" number={13} runningHead="Some of my work">
      <ProjectTitle title="Helping agents sell gold, better" tags="Web app, Fin-tech" style={{ marginBottom: '4.5cqw' }} />
      <Body>
        <p>Most tools for sales agents help them finish tasks faster. We wanted ours to help them actually sell better.</p>
        <p>
          The redesign added personalised product recommendations and tailored tips based on each customer’s profile, all aimed at shortening the sales cycle and making every conversation count.
        </p>
        <p>There were a dozen good ideas on the table. The hardest and most valuable decision was choosing which ones could wait.</p>
      </Body>
      <div style={{ marginTop: 'auto' }}>
        <CaseStudyLink href={LINKS.goldCaseStudy} />
      </div>
    </Page>
  )
}
