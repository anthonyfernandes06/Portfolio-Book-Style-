import { Figure, LessonHeadline, Page, Typed } from '@/components/page/Primitives'

export default function P10LessonTwo() {
  return (
    <Page side="left" number={10} runningHead="Anthony Fernandes">
      <LessonHeadline style={{ marginTop: '3cqw' }}>The product that taught me how to build an MVP.</LessonHeadline>
      {/* The hero shot, with two phone screens taped over its lower edge */}
      <div style={{ position: 'relative', height: '63cqw', marginTop: '7cqw' }}>
        <Figure img="acting1" width={62} kind="screen" rotate={-0.6} style={{ position: 'absolute', left: 0, top: 0 }} />
        <Figure
          img="acting2"
          width={19}
          kind="screen"
          rotate={-3}
          tapes={[{ corner: 'top', variant: 0 }]}
          style={{ position: 'absolute', left: '30cqw', top: '27cqw' }}
        />
        <Figure
          img="acting3"
          width={19}
          kind="screen"
          rotate={3}
          tapes={[{ corner: 'top', variant: 2 }]}
          style={{ position: 'absolute', left: '53cqw', top: '21cqw' }}
        />
      </div>
      {/* [EDIT] */}
      <Typed style={{ marginTop: '3cqw', fontSize: '1.55cqw' }} as="p">
        Fig. 03. Learning acting, mobile app
      </Typed>
    </Page>
  )
}
