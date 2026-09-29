import { Body, CaseStudyLink, Figure, Page, ProjectTitle } from '@/components/page/Primitives'
import { LINKS } from '@/content/links'

export default function P13Gold() {
  return (
    <Page side="right" number={13} runningHead="Some of my work">
      <ProjectTitle title="Helping agents sell gold, better" tags="Web app, Fin-tech" style={{ marginBottom: '3.8cqw' }} />
      <Body>
        <p>
          When we started the project, this was a tool that only focused on helping agents complete a few tasks. But we wanted the redesign to also help them sell more efficiently.
        </p>
        <p>
          The redesign not only smoothed out the flows, but also added personalised product recommendations and tailored tips based on each customer’s profile, all aimed at shortening the sales cycle and increasing recurring revenue from each customer.
        </p>
        <p>
          While the redesign had a dozen good ideas, the one mistake I made that I wouldn’t wish to ever repeat was choosing to execute all of them. This was a phase of my life when I was ambitious and naïve, wanting to do it all.
        </p>
      </Body>
      <Figure
        img="goldWorkshop"
        width={32}
        rotate={-1.2}
        tapes={[{ corner: 'tl', variant: 2 }, { corner: 'tr', variant: 1 }]}
        caption={<span style={{ whiteSpace: 'nowrap' }}>Fig. 06. Workshop with the Augmont team</span>}
        style={{ marginTop: '4cqw', alignSelf: 'center' }}
      />
      <div style={{ marginTop: 'auto' }}>
        <CaseStudyLink href={LINKS.goldCaseStudy}>Read the full case study on the YellowSlice Website</CaseStudyLink>
      </div>
    </Page>
  )
}
