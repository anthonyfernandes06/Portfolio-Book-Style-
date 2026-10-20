/**
 * The research papers kept in the folder on the desk. Each one is the full
 * write-up behind a playground page; `page` is the printed page that cites it.
 */
export const PAPERS = {
  reesearch: {
    slug: 'reesearch-ai',
    page: 11,
    title: 'Reesearch AI: Simplifying Research',
    short: 'Reesearch AI',
    /** On the sheet's top edge, peeking out of the folder. */
    label: 'Reesearch AI',
    date: 'Ongoing',
  },
  lumora: {
    slug: 'lumora-ai-financial-advisor',
    page: 17,
    title: 'Lumora: AI Financial Advisor',
    short: 'Lumora',
    label: 'Lumora',
    date: 'March 2026',
  },
  spotify: {
    slug: 'spotify-dj-mode',
    page: 18,
    title: 'Spotify DJ Mode: Making Music Fun',
    short: 'Spotify DJ Mode',
    label: 'Spotify DJ Mode',
    date: 'January 2026',
  },
  ott: {
    slug: 'ott-account-sharing',
    page: 19,
    title: 'Netflix (OTT): Solving for Account Sharing',
    short: 'Solving for account sharing',
    label: 'OTT account sharing',
    date: 'July 2025',
  },
} as const

export type PaperId = keyof typeof PAPERS

export const PAPER_IDS = Object.keys(PAPERS) as PaperId[]

/** `#spotify-dj-mode` → 'spotify' */
export function paperFromHash(hash: string): PaperId | null {
  const h = hash.replace('#', '')
  return PAPER_IDS.find((id) => PAPERS[id].slug === h) ?? null
}
