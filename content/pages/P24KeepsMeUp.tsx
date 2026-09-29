import { ChapterOpener, CrossRef, Page } from '@/components/page/Primitives'
import s from './pages.module.css'

export default function P24KeepsMeUp() {
  return (
    <Page side="left" number={24}>
      <ChapterOpener label="Chapter nine" title="What keeps me up at night" style={{ marginBottom: '3cqw' }} />
      <p style={{ fontStyle: 'italic', fontSize: '2.7cqw', lineHeight: 1.45, textWrap: 'pretty' }}>
        I love solving problems in general, but there are a few kinds of products that keep me up at night. In a good way, of course.
      </p>
      <p className={s.interest} style={{ marginTop: '4.5cqw' }}>
        <strong>Ed-tech for skill development.</strong> As a self taught designer I am one to learn first hand how accessible education that helps develop industry skills can change your life. The way ed-tech makes quality education accessible to the masses is something that simply excites me.
      </p>
      <CrossRef toPage={11} style={{ alignSelf: 'flex-end', marginTop: '0.6cqw' }} />
      <p className={s.interest} style={{ marginTop: '2.6cqw' }}>
        <strong>Financial planning.</strong> Across the world, and especially in India, many people still struggle to manage their finances whether it’s investments, loans, or insurance. They lack clarity on how to grow wealth and secure their family’s future. I believe financial security is one of the most important foundations of life, and I’m deeply passionate about solving this challenge.
      </p>
      <CrossRef toPage={15} style={{ alignSelf: 'flex-end', marginTop: '0.6cqw' }} />
    </Page>
  )
}
