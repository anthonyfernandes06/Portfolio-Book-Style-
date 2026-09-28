/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  reactStrictMode: true,
  // Keep production builds out of the dev server's cache so running
  // `npm run build` never corrupts a running `npm run dev`.
  distDir: process.env.NODE_ENV === 'production' ? '.next-build' : '.next',
}
export default nextConfig
