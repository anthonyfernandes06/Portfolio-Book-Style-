/**
 * NEXT_PUBLIC_BASE_PATH is set when the site is served from a subfolder,
 * e.g. GitHub Pages at /Portfolio-Book-Style-. Leave it unset for Vercel or local dev.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath,
  images: { unoptimized: true },
  reactStrictMode: true,
  // Production builds export straight into out/ and never touch the dev
  // server's .next cache, so `npm run build` can't corrupt a running `npm run dev`.
  distDir: process.env.NODE_ENV === 'production' ? 'out' : '.next',
}
export default nextConfig
