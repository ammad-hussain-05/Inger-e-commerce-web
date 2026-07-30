export type BookId = 'acclaimed' | 'featured' | 'latest'

export type BookAccent = 'forest-green' | 'royal-purple' | 'gold'

export interface BookDetails {
  /** Genre tag shown as a badge near the title and in the carousel. */
  genre: string
  /** Page count — placeholder until the client sends final numbers. */
  pages: string
  title: string
  series: string
  tagline: string
  description: string
  coverImage: string
  accent: BookAccent
  ctaLabel: string
}

/** Single source of truth for book content — every section, carousel, and
 *  the /books showcase read from here so updates only happen in one place. */
export const books: Record<BookId, BookDetails> = {
  acclaimed: {
    genre: 'Epic Fantasy',
    pages: 'XXX',
    title: 'Two Elves and a Halfling Walk Into a Bar',
    series: 'Book One',
    tagline: 'Award Winning',
    description:
      "Even though the last Elven/Sidhe war ended a thousand years ago and decimated the lands of the world of Maldonere, the results of that hate-filled conflict still haunt the present. During that war the Sidhe released much evil upon the world, and the offspring of those vile creatures still ravage the lands to this day. The Elves, Ranger Emerald Star and the Wild Mage Thistle—each the last of their family line—along with their Halfling friend the Rogue Myst Roottapper, set out to capture their destiny. But unbeknownst to them, amongst whisper and rumor, the Sidhe have returned and are set on finishing what they started a thousand years before.",
    coverImage: '/Two Elves and a Halfling Walk into a Bar V2.jpg',
    accent: 'forest-green',
    ctaLabel: 'Buy Now',
  },
  featured: {
    genre: 'Epic Fantasy',
    pages: 'XXX',
    title: 'Rallying Cry',
    series: 'Book Two',
    tagline: 'Fan Favorite',
    description:
      "The evil Sidhe were warned to stay away from Mardalla, home of the Elves Ranger Emerald Star and Mage Thistle, and Halfling Myst Roottapper. But the Sidhe didn't listen. It is now up to the three heroes to explain again to the Sidhe why this just isn't their day. From the mountain stronghold of the Ironforge Dwarves down to the southern duchy of Lord Cornelius, the rallying cry has gone forth, but will it be enough?",
    coverImage: '/fan-favourite.png',
    accent: 'royal-purple',
    ctaLabel: 'Buy Now',
  },
  latest: {
    genre: 'Epic Fantasy',
    pages: 'XXX',
    title: 'Calling the Lost Ones Home',
    series: 'Book Three',
    tagline: 'Available Now',
    description:
      "Destroying the terrible creature that inhabited the southernmost lands of Mardalla wasn't the end of the problems for Thistle, Myst and Em, the kingdom's newest nobles. Now comes the task of building a new duchy from scraps of nothing into something strong and enduring. And somehow, some way, letting those who had been scattered across the world since the last war a thousand years before know that there was a safe haven again. There was now a new place for the Elves to live together, protected by the Wild and the Wilderness. It was time to call the lost ones home.",
    coverImage: '/latest-book.png',
    accent: 'gold',
    ctaLabel: 'Pre-Order Now',
  },
}
