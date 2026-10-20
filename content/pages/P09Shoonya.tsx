import { Body, CaseStudyLink, ImpactCard, MarginNote, Page, ProjectTitle } from '@/components/page/Primitives'
import { LINKS } from '@/content/links'

const IMPACT = [
  { value: '3.8 → 4.3', label: 'NPS score' },
  { value: '−7%', label: 'Time on task' },
  { value: '−12.5%', label: 'Error rate' },
]

export default function P09Shoonya() {
  return (
    <Page side="right" number={9} runningHead="Some of my work">
      <ProjectTitle title="Shoonya, investing made seamless" tags="Mobile app, Fin-tech" style={{ marginBottom: '3.8cqw' }} />
      <Body>
        <p>
          Shoonya’s zero brokerage charges had won it a small, loyal user base, but an outdated visual language and a broken experience were holding it back from mass adoption.
        </p>
        <p>We redesigned the app to make investing seamless for both investors and traders, and gave the brand a distinct, modern visual identity, all while keeping its core value.</p>
        <p>
          Investors needed a smoother journey, with a little education at key touchpoints. Active traders needed speed above everything else. Designing for both taught me to balance the needs of two user groups in a product.
        </p>
      </Body>
      <ImpactCard title="The impact of design" items={IMPACT} style={{ marginTop: '4.5cqw', width: '70cqw', alignSelf: 'center' }} />
      <MarginNote rotate={-2.5} style={{ marginTop: '4cqw', marginLeft: '2cqw', maxWidth: '68cqw' }}>
        P.S. This one is under Yellow Slice’s NDA, so I can’t share much more here. Happy to talk about it though.
      </MarginNote>
      <div style={{ marginTop: 'auto', display: 'flex', flexWrap: 'wrap', gap: '2.5cqw 7cqw' }}>
        <CaseStudyLink href={LINKS.shoonyaPlayStore}>Google Play Store</CaseStudyLink>
        <CaseStudyLink href={LINKS.shoonyaAppStore}>Apple App Store</CaseStudyLink>
      </div>
    </Page>
  )
}
