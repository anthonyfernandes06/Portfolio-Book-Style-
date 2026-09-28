// Tiny static server for the exported site: `npm start` after `npm run build`.
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'

const root = join(process.cwd(), 'out')
const port = Number(process.env.PORT ?? 3001)
// Mirror a subfolder deploy (e.g. GitHub Pages) when the build used a base path.
const base = process.env.NEXT_PUBLIC_BASE_PATH || ''
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain',
  '.ico': 'image/x-icon',
}

createServer(async (req, res) => {
  let pathname = decodeURIComponent(new URL(req.url, 'http://x').pathname)
  if (base && pathname.startsWith(base)) pathname = pathname.slice(base.length) || '/'
  let path = normalize(pathname).replace(/^(\.\.[/\\])+/, '')
  let file = join(root, path)
  try {
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html')
  } catch {
    file = join(root, '404.html')
    res.statusCode = 404
  }
  try {
    const body = await readFile(file)
    res.setHeader('Content-Type', types[extname(file)] ?? 'application/octet-stream')
    res.end(body)
  } catch {
    res.statusCode = 404
    res.end('Not found')
  }
}).listen(port, () => console.log(`Serving out/ on http://localhost:${port}${base}/`))
