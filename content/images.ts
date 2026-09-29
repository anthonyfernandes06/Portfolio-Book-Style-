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
  goldClient: { src: BASE_PATH + '/images/gold-client.jpg', w: 958, h: 1000, alt: 'Client details screen with personalised gold product recommendations for the client' },
  goldDashboard: { src: BASE_PATH + '/images/gold-dashboard.jpg', w: 702, h: 900, alt: 'Sales agent dashboard showing client stats, lead insights and commissions' },
  goldWorkshop: { src: BASE_PATH + '/images/gold-workshop.jpg', w: 1200, h: 917, alt: 'Workshop with the Augmont team around a conference table, with sticky-note research on the wall' },
  lumoraBenefits: { src: BASE_PATH + '/images/lumora-benefits.jpg', w: 1400, h: 809, alt: 'Lumora benefits screen showing unused card and insurance benefits and credit card usage tips' },
  lumoraInsights: { src: BASE_PATH + '/images/lumora-insights.jpg', w: 1400, h: 809, alt: 'Lumora portfolio insights on short-term risks, long-term trends and opportunities' },
  lumoraLiteracy: { src: BASE_PATH + '/images/lumora-literacy.jpg', w: 1400, h: 809, alt: 'Pie chart: only 27% qualified as financially literate in RBI’s NCFE survey; 73% lack skills like budgeting and saving' },
  spotify: { src: BASE_PATH + '/images/spotify-dj.jpg', w: 1400, h: 787, alt: 'Concept screen for a Spotify DJ mode' },
  ott: { src: BASE_PATH + '/images/ott-sharing.jpg', w: 1400, h: 787, alt: 'JioHotstar, Netflix and Prime Video app icons' },
  ottTv: { src: BASE_PATH + '/images/ott-tv.jpg', w: 1100, h: 636, alt: 'Netflix account picker on a living-room TV with a temporary access option' },
  ottDevices: { src: BASE_PATH + '/images/ott-devices.jpg', w: 1100, h: 636, alt: 'Phone screens: a switch-devices warning with a 2-hour activation delay, and a login countdown' },
  book1: { src: BASE_PATH + '/images/book-1.jpg', w: 328, h: 500, alt: 'Cover of Contagious by Jonah Berger' },
  book2: { src: BASE_PATH + '/images/book-2.jpg', w: 324, h: 500, alt: 'Cover of High Output Management by Andrew S. Grove' },
  book3: { src: BASE_PATH + '/images/book-3.jpg', w: 331, h: 500, alt: 'Cover of The Lean Startup by Eric Ries' },
  book4: { src: BASE_PATH + '/images/book-4.jpg', w: 432, h: 684, alt: 'Cover of Blue Ocean Strategy by W. Chan Kim and Renée Mauborgne' },
  book5: { src: BASE_PATH + '/images/book-5.jpg', w: 432, h: 684, alt: 'Cover of Make Time by Jake Knapp and John Zeratsky' },
  improv1: { src: BASE_PATH + '/images/improv-1.jpg', w: 1000, h: 563, alt: 'Improv troupe mid-scene on stage, one performer lying on the floor and another crouched' },
  improv2: { src: BASE_PATH + '/images/improv-2.jpg', w: 1000, h: 667, alt: 'Anthony on stage in a maroon shirt, arms open mid-scene' },
  improv3: { src: BASE_PATH + '/images/improv-3.jpg', w: 1000, h: 750, alt: 'Selfie of the improv cast on stage with the audience behind them' },
  improv4: { src: BASE_PATH + '/images/improv-4.jpg', w: 1000, h: 667, alt: 'Three improvisers leaning in over an imaginary object in a scene' },
  standup: { src: BASE_PATH + '/images/standup.jpg', w: 560, h: 1000, alt: 'Anthony performing stand-up' },
  dance: { src: BASE_PATH + '/images/dance.jpg', w: 561, h: 1000, alt: 'Anthony teaching a dance class' },
  writing: { src: BASE_PATH + '/images/writing.jpg', w: 566, h: 1000, alt: 'Anthony acting out a sketch for promotional content' },
} as const

export type ImageKey = keyof typeof IMAGES
