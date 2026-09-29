import { Page, Typed } from '@/components/page/Primitives'
import s from './pages.module.css'

export default function P26Epilogue() {
  return (
    <Page side="left" number={26}>
      <h2 style={{ fontWeight: 400 }}>
        <Typed>Epilogue</Typed>
      </h2>
      <div className={s.epilogue}>
        <p>
          Business creates value.
          <br />
          Design communicates it.
          <br />
          Technology delivers it.
        </p>
        <p>I want to be the connector across all three, ensuring that the value created reaches the maximum number of users.</p>
        <span className={s.initials}>— A.F.</span>
      </div>
    </Page>
  )
}
