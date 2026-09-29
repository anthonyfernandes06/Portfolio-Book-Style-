import type { ImageKey } from './images'

export type Book = { img: ImageKey; title: string; author: string; note: string; rotate: number }

/** The five books, in reading order across p.20–21. */
export const BOOKS: Book[] = [
  {
    img: 'book1',
    title: 'Contagious',
    author: 'Jonah Berger',
    rotate: -1.5,
    note: 'This book taught me what makes things go viral. I initially thought it was more relevant for marketing professionals and not for a product designer, but while working on membership programs, it gave me valuable insights on how to structure and position them better.',
  },
  {
    img: 'book2',
    title: 'High Output Management',
    author: 'Andrew S. Grove',
    rotate: 1.2,
    note: 'In my early days of being a Lead UX designer while I struggled to be a good leader it was this book that taught me how to manage operations better, how to in-still leadership in team members, how to reduce risk of operational failure and a lot more. While the rest of the books taught me how to be a designer, this taught me how to be a manager.',
  },
  {
    img: 'book3',
    title: 'The Lean Startup',
    author: 'Eric Ries',
    rotate: -1.4,
    note: 'While working with startups building something new, I’d often get excited and pack the first phase with too many features. This delayed product launches and created a huge risk since if users didn’t like it, we’d have waste months of effort. This book shifted my mindset to think like a founder and taught me how to build Minimum Viable Products effectively.',
  },
  {
    img: 'book4',
    title: 'Blue Ocean Strategy',
    author: 'W. Chan Kim & Renée Mauborgne',
    rotate: 1.4,
    note: 'Businesses have always fascinated me, how some businesses thrive for years & generations while others get eaten up by the competition and struggle to survive. This book helped me learn about value innovation and how to create a new market for ones business where competition is non existent.',
  },
  {
    img: 'book5',
    title: 'Make Time',
    author: 'Jake Knapp & John Zeratsky',
    rotate: -1.2,
    note: 'In the early days of being a team lead I’d often struggle with managing time across designing, attending to my team and ensuring all tasks get done by the end of the day. This taught me how to be busy and still make time. This book taught me how to make the most of my time. If you are struggling with time management you should read this.',
  },
]
