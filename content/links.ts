/**
 * Every outbound link in the book lives here.
 * Replace the `null` placeholders with real URLs; a null link renders as a
 * quiet, non-navigating link so the page never breaks.
 */
export const EMAIL = 'anthonyfernandes0601@gmail.com'
export const MAILTO = `mailto:${EMAIL}`

export const LINKS = {
  linkedin: 'https://linkedin.com/in/anthony-fernandes-64aa71194',
  resume: null as string | null, // [RESUME_PDF_URL]

  researchAiDemo: 'https://reesearch.ai/' as string | null,
  actingCaseStudy: 'https://www.yellowslice.in/project/the-actors-truth' as string | null,
  goldCaseStudy: null as string | null, // [GOLD_CASE_STUDY_URL]
  lumoraDemo: null as string | null, // [LUMORA_DEMO_URL]
  spotify: null as string | null, // [SPOTIFY_URL]
  ott: null as string | null, // [OTT_URL]

  essays: [
    null, // [LINKEDIN_URL_1] Good design is often subtle
    null, // [LINKEDIN_URL_2] Perceived value from Swiggy and Zomato cashback
    null, // [LINKEDIN_URL_3] The chicken-and-egg problem
    null, // [LINKEDIN_URL_4] Stepping into leadership roles early
  ] as (string | null)[],
}

/** Until an essay URL is supplied, point readers at the LinkedIn activity feed. */
export const essayHref = (i: number) => LINKS.essays[i] ?? `${LINKS.linkedin}/recent-activity/all/`
