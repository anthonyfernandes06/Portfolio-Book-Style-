import { Body, CaseStudyLink, Figure, Page, ProjectTitle } from '@/components/page/Primitives'
import { LINKS } from '@/content/links'

export default function P11Acting() {
  return (
    <Page side="right" number={11} runningHead="Some of my work">
      <ProjectTitle title="Learning acting, made accessible" tags="Mobile app, Ed-tech" style={{ marginBottom: '4.5cqw' }} />
      <Body>
        <p>
          Along with Bollywood acting coach Saurabh Sachdeva, we built a platform to help actors across the country understand the true essence of acting, and to keep training long after a workshop ends.
        </p>
        <p>The product brings structured learning, practice exercises, and guidance into one accessible digital experience.</p>
        <p>
          This product was the classic challenge: a big vision, and the need to prove it with something small. The project taught me what a minimum viable product really means: the least you can build that still carries the heart of the idea.
        </p>
      </Body>
      <Figure
        img="actingWorkshop"
        width={40}
        rotate={1.2}
        tapes={[{ corner: 'tl', variant: 1 }, { corner: 'tr', variant: 0 }]}
        caption="Fig. 04. Mapping the problem with Saurabh Sachdeva"
        style={{ marginTop: '4.5cqw', alignSelf: 'center' }}
      />
      <div style={{ marginTop: 'auto' }}>
        <CaseStudyLink href={LINKS.actingCaseStudy}>Read the full case study on the YellowSlice Website</CaseStudyLink>
      </div>
    </Page>
  )
}
