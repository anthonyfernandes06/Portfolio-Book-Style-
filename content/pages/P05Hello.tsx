import { Body, MarginNote, Page } from '@/components/page/Primitives'
import { Pointer } from '@/components/svg/Strokes'

export default function P05Hello() {
  return (
    <Page side="right" number={5} runningHead="Hello, I’m Anthony">
      <h2 className="visually-hidden">Hello, I’m Anthony</h2>
      <Body style={{ marginTop: '2cqw' }}>
        <p>
          Over the last five years, I’ve worked on more than forty projects and had the privilege of leading a team of close to twenty-five people.
        </p>
        <p>
          Along the way, the work has taken me across more than eight industries, including EdTech, government, fintech, healthcare, social media, e-commerce, advertising, and marketing.
        </p>
        <p>
          Somewhere along the way, I grew into a product designer who also found himself drawn to leadership and management. Someone who cares as much about the people building a product as the people using it.
        </p>
        <p>It’s been quite a fun ride so far. Let me tell you how it started.</p>
      </Body>
      <div style={{ marginTop: 'auto', alignSelf: 'flex-end', position: 'relative', width: '42cqw', color: 'var(--graphite)' }}>
        <Pointer style={{ position: 'absolute', left: '-6cqw', bottom: '5cqw', width: '6cqw', height: '9cqw', opacity: 0.75 }} />
        <MarginNote rotate={-4}>for the skimmers: 40+ projects, 25+ people, 5 years, 8 industries</MarginNote>
      </div>
    </Page>
  )
}
