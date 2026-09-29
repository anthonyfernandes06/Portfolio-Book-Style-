import { Body, ChapterOpener, MarginNote, Page } from '@/components/page/Primitives'
import { BrainSticker } from '@/components/svg/BrainSticker'
import { BASE_PATH } from '@/content/images'
import s from './pages.module.css'

type Tool = { name: string; file: string; rotate: number; label?: string }

// Stuck around the brain, clockwise from the top.
const TOOLS: Tool[] = [
  { name: 'Figma', file: 'figma', rotate: -6 },
  { name: 'Claude Code', file: 'claude', rotate: 5, label: 'Claude Code' },
  { name: 'Notion', file: 'notion', rotate: -3 },
  { name: 'ChatGPT', file: 'chatgpt', rotate: 7 },
  { name: 'Framer', file: 'framer', rotate: -5 },
  { name: 'Shopify', file: 'shopify', rotate: 4 },
  { name: 'Lovable', file: 'lovable', rotate: -7 },
  { name: 'Gemini', file: 'gemini', rotate: 3 },
  { name: 'UX Pilot', file: 'uxpilot', rotate: -4 },
]

// Positions on a loose ellipse around the centre (in cqw), nudged so it feels hand-placed.
const CX = 39.3
const CY = 31
const RX = 31
const RY = 25
const NUDGE = [
  [0, 1],
  [1, -1],
  [0, 1.5],
  [-1, 0],
  [1, -1],
  [-1, 1],
  [0, -1],
  [1, 1],
  [-1, 0],
]
const STICKER = 11

export default function P18Toolbox() {
  return (
    <Page side="left" number={18}>
      <ChapterOpener label="Chapter five" title="The toolbox" style={{ marginBottom: '3.5cqw' }} />
      <Body small>
        <p>Every craftsperson has a workbench. This is what’s on mine.</p>
      </Body>
      <div className={s.stickerBoard}>
        <BrainSticker className={s.brain} text="But well I use this tool the most" />
        <ul style={{ listStyle: 'none' }} aria-label="Tools">
          {TOOLS.map((t, i) => {
            const a = ((-90 + i * 40) * Math.PI) / 180
            const x = CX + RX * Math.cos(a) + NUDGE[i][0] - STICKER / 2
            const y = CY + RY * Math.sin(a) + NUDGE[i][1] - STICKER / 2
            return (
              <li
                key={t.name}
                className={`${s.sticker} ${t.label ? s.stickerLabelled : ''}`}
                style={{ left: `${x.toFixed(2)}cqw`, top: `${y.toFixed(2)}cqw`, transform: `rotate(${t.rotate}deg)` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${BASE_PATH}/images/stickers/${t.file}.png`} alt={t.name} width={360} height={360} loading="lazy" />
                {t.label && <span className={s.stickerLabel}>{t.label}</span>}
              </li>
            )
          })}
        </ul>
      </div>
      <MarginNote rotate={-3} style={{ marginTop: 'auto', marginLeft: '6cqw' }}>
        and lately, a lot of vibe coding
      </MarginNote>
    </Page>
  )
}
