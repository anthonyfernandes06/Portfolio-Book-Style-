/** Prefix for sites served from a subfolder (GitHub Pages); empty elsewhere. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ''

/** Image manifest: intrinsic sizes keep next/image free of layout shift. */
export const IMAGES = {
  coverPortrait: { src: BASE_PATH + '/images/cover-portrait.jpg', w: 899, h: 900, alt: 'Portrait of Anthony Fernandes, smiling with arms crossed in the studio' },
  portrait: { src: BASE_PATH + '/images/portrait.jpg', w: 940, h: 941, alt: 'Anthony Fernandes striking a deliberately visionary pose' },
  researchAi: { src: BASE_PATH + '/images/research-ai.jpg', w: 1400, h: 633, alt: 'Research AI survey builder interface' },
  researchAiLogic: { src: BASE_PATH + '/images/research-ai-logic.jpg', w: 1400, h: 809, alt: 'Research AI survey question editor and branching survey logic' },
  researchAiInsights: { src: BASE_PATH + '/images/research-ai-insights.jpg', w: 1400, h: 809, alt: 'Research AI insights with AI-generated suggestions from survey responses' },
  acting1: { src: BASE_PATH + '/images/acting-1.jpg', w: 1400, h: 788, alt: 'Three screens from The Actor’s Truth app: onboarding, a weekly session with Saurabh Sachdeva, and a self-assessment checklist' },
  acting2: { src: BASE_PATH + '/images/acting-2.jpg', w: 435, h: 800, alt: 'The Actor’s Truth lecture details screen for Basics of Acting' },
  actingWorkshop: { src: BASE_PATH + '/images/acting-workshop.jpg', w: 1200, h: 900, alt: 'Workshop with Saurabh Sachdeva, discussing sticky-note research on a wall of how-might-we statements' },
  acting3: { src: BASE_PATH + '/images/acting-3.jpg', w: 435, h: 800, alt: 'The Actor’s Truth self-assessment checklist screen' },
  gold: { src: BASE_PATH + '/images/gold-platform.jpg', w: 1400, h: 633, alt: 'Sales agent dashboard with product recommendations' },
  lumora1: { src: BASE_PATH + '/images/lumora-1.jpg', w: 1400, h: 1050, alt: 'Lumora AI financial advisor portfolio dashboard' },
  lumora2: { src: BASE_PATH + '/images/lumora-2.jpg', w: 672, h: 735, alt: 'Lumora asset allocation and holdings breakdown' },
  spotify: { src: BASE_PATH + '/images/spotify-dj.jpg', w: 1400, h: 787, alt: 'Concept screen for a Spotify DJ mode' },
  ott: { src: BASE_PATH + '/images/ott-sharing.jpg', w: 1400, h: 787, alt: 'Concept for OTT account sharing across JioHotstar, Netflix and Prime Video' },
  book1: { src: BASE_PATH + '/images/book-1.jpg', w: 328, h: 500, alt: 'Cover of Contagious by Jonah Berger' },
  book2: { src: BASE_PATH + '/images/book-2.jpg', w: 324, h: 500, alt: 'Cover of High Output Management by Andrew S. Grove' },
  book3: { src: BASE_PATH + '/images/book-3.jpg', w: 331, h: 500, alt: 'Cover of The Lean Startup by Eric Ries' },
  improv: { src: BASE_PATH + '/images/improv.jpg', w: 1000, h: 450, alt: 'Anthony performing improv on stage' },
  standup: { src: BASE_PATH + '/images/standup.jpg', w: 560, h: 1000, alt: 'Anthony performing stand-up' },
  dance: { src: BASE_PATH + '/images/dance.jpg', w: 561, h: 1000, alt: 'Anthony teaching a dance class' },
  writing: { src: BASE_PATH + '/images/writing.jpg', w: 566, h: 1000, alt: 'Anthony acting out a sketch for promotional content' },
} as const

export type ImageKey = keyof typeof IMAGES
