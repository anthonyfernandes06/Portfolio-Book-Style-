import { ChapterOpener, Figure, Page, Typed } from '@/components/page/Primitives'

export default function P04ChapterOne() {
  return (
    <Page side="left" number={4}>
      <ChapterOpener label="Chapter one" title="Hello, I’m Anthony." style={{ marginBottom: '4.5cqw' }} />
      <div style={{ position: 'relative', alignSelf: 'flex-start', marginLeft: '4cqw' }}>
        <Typed
          style={{
            position: 'absolute',
            left: '-4.4cqw',
            bottom: 'calc(100% - 60cqw)',
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            fontSize: '1.5cqw',
            whiteSpace: 'nowrap',
          }}
        >
          Anthony F. (2026)
        </Typed>
        <Figure
          img="portrait"
          width={60}
          ratio={1}
          position="50% 30%"
          caption="Fig. 01. Please don’t take this picture too seriously. I was just trying to look like a visionary designer."
        />
      </div>
    </Page>
  )
}
