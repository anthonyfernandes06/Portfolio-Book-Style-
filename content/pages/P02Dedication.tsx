import { Page } from '@/components/page/Primitives'
import s from './pages.module.css'

export default function P02Dedication() {
  return (
    <Page side="left" number={2} label="Dedication">
      <p className={s.dedication}>
        For everyone who thought I was too young to lead a team, know that you weren’t alone.
        <br />
        I thought so too, but it turns out, I managed just fine :)
      </p>
    </Page>
  )
}
