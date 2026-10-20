import { Body, CaseStudyLink, Figure, MarginNote, Page, ProjectTitle } from '@/components/page/Primitives'
import { LINKS } from '@/content/links'

export default function P13Acting() {
  return (
    <Page side="right" number={13} runningHead="Some of my work">
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
      {/* Photo with a pencilled P.S. in the margin beside it */}
      <div style={{ position: 'relative', marginTop: '4.5cqw' }}>
        <Figure
          img="actingWorkshop"
          width={40}
          rotate={1.2}
          tapes={[{ corner: 'tl', variant: 1 }, { corner: 'tr', variant: 0 }]}
          caption="Fig. 05. Mapping the problem with Saurabh Sachdeva"
          style={{ margin: '0 auto' }}
        />
        <MarginNote rotate={-6} as="span" style={{ position: 'absolute', right: '-4cqw', top: '26%', width: '16cqw' }}>
          P.S. I got free acting classes with this project.
        </MarginNote>
      </div>
      <div style={{ marginTop: 'auto', display: 'flex', flexWrap: 'wrap', gap: '2.5cqw 7cqw' }}>
        <CaseStudyLink href={LINKS.actingPlayStore}>Google Play Store</CaseStudyLink>
        <CaseStudyLink href={LINKS.actingAppStore}>Apple App Store</CaseStudyLink>
      </div>
    </Page>
  )
}
