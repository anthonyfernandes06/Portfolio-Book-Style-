import { Body, ChapterOpener, MarginNote, Page, TornLabel } from '@/components/page/Primitives'
import s from './pages.module.css'

// [CONFIRM: tools taken from the current site]
const TOOLS: { name: string; left: string; top: string; rotate: number }[] = [
  { name: 'Figma', left: '2%', top: '4%', rotate: -3 },
  { name: 'FigJam', left: '26%', top: '0%', rotate: 2 },
  { name: 'Framer', left: '52%', top: '6%', rotate: -1.5 },
  { name: 'Notion', left: '76%', top: '1%', rotate: 3 },
  { name: 'Claude', left: '8%', top: '30%', rotate: 2.5 },
  { name: 'Claude Code', left: '33%', top: '27%', rotate: -2 },
  { name: 'ChatGPT', left: '66%', top: '33%', rotate: 1.5 },
  { name: 'Gemini', left: '0%', top: '58%', rotate: -1 },
  { name: 'Lovable', left: '23%', top: '60%', rotate: 3.5 },
  { name: 'UX Pilot', left: '47%', top: '56%', rotate: -3 },
  { name: 'Shopify', left: '73%', top: '63%', rotate: 1 },
]

export default function P18Toolbox() {
  return (
    <Page side="left" number={18}>
      <ChapterOpener label="Chapter five" title="The toolbox" style={{ marginBottom: '3.5cqw' }} />
      <Body small>
        <p>Every craftsperson has a workbench. This is what’s on mine.</p>
      </Body>
      <ul className={s.toolbox} style={{ listStyle: 'none', marginTop: '7cqw' }} aria-label="Tools">
        {TOOLS.map((t, i) => (
          <li key={t.name} style={{ position: 'absolute', left: t.left, top: t.top }}>
            <TornLabel seed={i + 3} rotate={t.rotate}>
              {t.name}
            </TornLabel>
          </li>
        ))}
      </ul>
      <MarginNote rotate={-3} style={{ marginTop: '4cqw', marginLeft: '6cqw' }}>
        and lately, a lot of vibe coding
      </MarginNote>
    </Page>
  )
}
