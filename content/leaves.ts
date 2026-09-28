import type { ComponentType } from 'react'
import type { Material } from '@/components/book/Leaf'
import Cover from './pages/Cover'
import InsideFront from './pages/InsideFront'
import P01 from './pages/P01Contents'
import P02 from './pages/P02Dedication'
import P03 from './pages/P03Prologue'
import P04 from './pages/P04ChapterOne'
import P05 from './pages/P05Hello'
import P06 from './pages/P06TheClimb'
import P07 from './pages/P07Staircase'
import P08 from './pages/P08ChapterThree'
import P09 from './pages/P09ResearchAI'
import P10 from './pages/P10LessonTwo'
import P11 from './pages/P11Acting'
import P12 from './pages/P12LessonThree'
import P13 from './pages/P13Gold'
import P14 from './pages/P14Playground'
import P15 from './pages/P15Lumora'
import P16 from './pages/P16Spotify'
import P17 from './pages/P17OTT'
import P18 from './pages/P18Toolbox'
import P19 from './pages/P19Notes'
import P20 from './pages/P20Books'
import P21 from './pages/P21BooksContinued'
import P22 from './pages/P22OffThePage'
import P23 from './pages/P23OffThePageContinued'
import P24 from './pages/P24KeepsMeUp'
import P25 from './pages/P25Continued'
import P26 from './pages/P26Epilogue'
import P27 from './pages/P27ToBeContinued'
import BackCover from './pages/BackCover'

export type LeafDef = {
  front: ComponentType
  back: ComponentType
  kind: 'board' | 'paper'
  frontMaterial: Material
  backMaterial: Material
}

const paper = (front: ComponentType, back: ComponentType): LeafDef => ({
  front,
  back,
  kind: 'paper',
  frontMaterial: 'paper',
  backMaterial: 'paper',
})

/**
 * The book, leaf by leaf. Spread n shows leaf[n-1].back (left) and leaf[n].front (right).
 * Leaf 0 and Leaf 14 are boards.
 */
export const LEAVES: LeafDef[] = [
  { front: Cover, back: InsideFront, kind: 'board', frontMaterial: 'board', backMaterial: 'endpaper' },
  paper(P01, P02),
  paper(P03, P04),
  paper(P05, P06),
  paper(P07, P08),
  paper(P09, P10),
  paper(P11, P12),
  paper(P13, P14),
  paper(P15, P16),
  paper(P17, P18),
  paper(P19, P20),
  paper(P21, P22),
  paper(P23, P24),
  paper(P25, P26),
  { front: P27, back: BackCover, kind: 'board', frontMaterial: 'paper', backMaterial: 'board' },
]

/** Single-page (mobile) reading order: every face in sequence. */
export const FACES: { Content: ComponentType; material: Material }[] = [
  { Content: Cover, material: 'board' },
  { Content: InsideFront, material: 'endpaper' },
  ...[P01, P02, P03, P04, P05, P06, P07, P08, P09, P10, P11, P12, P13, P14, P15, P16, P17, P18, P19, P20, P21, P22, P23, P24, P25, P26, P27].map(
    (Content) => ({ Content, material: 'paper' as Material }),
  ),
  { Content: BackCover, material: 'board' },
]
