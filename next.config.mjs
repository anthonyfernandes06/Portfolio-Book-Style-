import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js'

/**
 * NEXT_PUBLIC_BASE_PATH is set when the site is served from a subfolder,
 * e.g. GitHub Pages at /Portfolio-Book-Style-. Leave it unset for Vercel or local dev.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

/** @type {(phase: string) => import('next').NextConfig} */
export default function config(phase) {
  return {
    output: 'export',
    basePath,
    images: { unoptimized: true },
    reactStrictMode: true,
    // `next build` always uses .next for its working files and exports the
    // site to out/. The dev server gets its own cache folder so that running
    // a build (or `npm run deploy:pages`) can never break a running `npm run dev`.
    ...(phase === PHASE_DEVELOPMENT_SERVER ? { distDir: '.next-dev' } : {}),
  }
}
