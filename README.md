# An Open Book — Anthony Fernandes

A single-page portfolio that behaves like a spiral-bound book on a desk. Scrolling turns the pages.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to out/
npm start          # serve out/ on http://localhost:3001
```

Deploy to Vercel as-is (static export). Set `NEXT_PUBLIC_SITE_URL` to the live origin so the social preview image resolves.

## Where things live

| What | Where |
| --- | --- |
| Scroll → progress engine, snapping, hash, keyboard | `lib/progress.ts` |
| Leaves, 3D turn, shading, stacks | `components/book/Book.tsx`, `Leaf.tsx` |
| Corner curl (dog-ear) | `components/book/CornerCurl.tsx` |
| Phone single-page mode | `components/book/MobileBook.tsx` |
| Page primitives (Figure, MarginNote, CrossRef…) | `components/page/Primitives.tsx` |
| Every page's copy | `content/pages/*.tsx` |
| Leaf order | `content/leaves.ts` |
| All outbound links | `content/links.ts` |
| Images + alt text | `content/images.ts`, `public/images/` |

## Still to fill in

- `[EDIT]` / `[CONFIRM]` comments in `content/pages/`: cover city (`Mumbai, 2026`), letter date, p.7 note and index card, p.16/p.17 extra sentences, p.23 margin note, and the toolbox list on p.18.
- Back cover testimonial: omitted until a real one is supplied.

Images were extracted from the current portfolio PDF. Swap in higher-resolution originals at the same filenames when available.
