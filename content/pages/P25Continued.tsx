import { CrossRef, MarginNote, Page } from '@/components/page/Primitives'
import s from './pages.module.css'

export default function P25Continued() {
  return (
    <Page side="right" number={25} runningHead="What keeps me up at night">
      <p className={s.interest} style={{ marginTop: '2cqw' }}>
        <strong>AI-powered products and services.</strong> Products that are leveraging AI to reimagine how an industry should be executing tasks.
      </p>
      <CrossRef toPage={9} style={{ alignSelf: 'flex-end', marginTop: '0.6cqw' }} />
      <p className={s.interest} style={{ marginTop: '2.6cqw' }}>
        <strong>B2B products.</strong> Any tool or product that is helping businesses be more productive and efficient.
      </p>
      <MarginNote rotate={-3} style={{ marginTop: 'auto', marginBottom: '3cqw', marginLeft: '8cqw' }}>
        if you’re building one of these, we should talk.
      </MarginNote>
    </Page>
  )
}
