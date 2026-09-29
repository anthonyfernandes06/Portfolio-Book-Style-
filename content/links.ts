/**
 * Every outbound link in the book lives here.
 * Replace the `null` placeholders with real URLs; a null link renders as a
 * quiet, non-navigating link so the page never breaks.
 */
export const EMAIL = 'anthonyfernandes0601@gmail.com'
export const MAILTO = `mailto:${EMAIL}`

export const LINKS = {
  linkedin: 'https://www.linkedin.com/in/anthony-fernandes-64aa71194',
  resume: 'https://drive.google.com/drive/folders/1-845h1ycQmQdXi6JJGQmXdNY9mFwSMRv' as string | null,

  researchAiDemo: 'https://reesearch.ai/' as string | null,
  actingCaseStudy: 'https://www.yellowslice.in/project/the-actors-truth' as string | null,
  goldCaseStudy: 'https://www.yellowslice.in/project/augmont' as string | null,
  lumoraDemo: 'https://smart-floss-47697979.figma.site/' as string | null,
  spotify: 'https://heavenly-neptune-845247.framer.app/spotify-case-study' as string | null,
  ott: 'https://heavenly-neptune-845247.framer.app/netflix-ott-case-study' as string | null,

  /** LinkedIn essays, in the order they appear on p.19. */
  essays: [
    {
      title: 'How to choose the right gamification mechanisms',
      url: 'https://www.linkedin.com/posts/anthony-fernandes-64aa71194_gamification-mechanics-ugcPost-7463628121905225728-3nvJ/',
    },
    {
      title: 'Good design is often subtle',
      url: 'https://www.linkedin.com/posts/anthony-fernandes-64aa71194_productdesign-designthinking-zomato-share-7419039255869603840-HALF/',
    },
    {
      title: 'Understanding perceived value from Swiggy and Zomato cashback',
      url: 'https://www.linkedin.com/posts/anthony-fernandes-64aa71194_swiggy-dinecash-breakdown-ugcPost-7426979674402205696-XJ9U/',
    },
    {
      title: 'How to solve the chicken-and-egg problem',
      url: 'https://www.linkedin.com/posts/anthony-fernandes-64aa71194_how-do-you-build-a-product-that-only-works-share-7412842202172882944-7I4l/',
    },
    {
      title: 'What I’ve learnt about stepping into leadership roles early in your career',
      url: 'https://www.linkedin.com/posts/anthony-fernandes-64aa71194_leadership-management-leadershiproles-share-7397140030688927744-uRJI/',
    },
  ],
}
