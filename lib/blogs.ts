export interface BlogPost {
  slug: string
  number: string
  category: string
  title: string
  excerpt: string
  image: string
  imageAlt: string
  date: string
  readTime: string
  body: string[]
}

/** Editorial content for the /blogs journal. Titles, excerpts, and body copy
 *  are placeholder-realistic and safe to rewrite once final copy is ready —
 *  this file is the single source of truth for the listing and detail pages. */
export const blogPosts: BlogPost[] = [
  {
    slug: 'building-believable-steampunk-worlds',
    number: '01',
    category: 'World Building',
    title: 'Building Believable Steampunk Worlds',
    excerpt:
      'Cornelius Duchy was not drawn in an afternoon. How we layer brass, steam, and centuries of elven history until a city feels lived-in rather than invented.',
    image: '/blog-1.png',
    imageAlt: 'An airship drifting above the spired rooftops of a lantern-lit steampunk city at dusk',
    date: 'March 15, 2026',
    readTime: '8 min read',
    body: [
      "Before a single character sets foot in Cornelius Duchy, we already know what its chimneys smell like, which districts the gaslight reaches, and why the great dirigibles never fly after curfew. Worldbuilding, for us, starts with infrastructure — not because it's glamorous, but because it's honest. A city that has clearly been engineered, argued over, and repaired for a hundred years behaves differently on the page than one that simply exists to look striking.",
      "Steampunk carries a real temptation toward set-dressing: goggles, gears, and corsetry stitched onto a story that could be set anywhere. We try to resist that by asking what steam and brass actually cost a society. Who mines the coal that keeps Cornelius Duchy's towers lit? What happens to a district when an airship route is rerouted around it? Those questions rarely make it onto the page directly, but they shape every scene that does.",
      "The Elven history embedded in Mardalla's older quarters does the same work in a different register. A thousand years after the Sidhe war, the architecture still remembers — reinforced doorways, warded thresholds, streets that curve away from old battle lines for no reason anyone living can explain. Readers don't need the footnote. They just need the city to feel like it's hiding something, because it is.",
      "That's the test we return to for every new setting: could this place survive being described by someone who has never read the book? If a location only works when we're standing next to it explaining the lore, it isn't finished yet. When it can carry its own weight in silence, we know it's ready for Emerald, Thistle, and Myst to walk through it.",
    ],
  },
  {
    slug: 'the-art-of-character-complexity',
    number: '02',
    category: 'Characters',
    title: 'The Art of Character Complexity',
    excerpt:
      'Why the last of a family line makes for a better protagonist than the chosen one — and how we let contradiction, not virtue, drive who our characters become.',
    image: '/blog-2.png',
    imageAlt: 'A brooding figure in an ornate coat standing before a candlelit gothic skyline',
    date: 'March 8, 2026',
    readTime: '6 min read',
    body: [
      "The easiest way to make a character forgettable is to give them a single, clear virtue and let it carry them through the book. We've never found a way to write like that convincingly, so we've stopped trying. Emerald Star is disciplined to the point of self-erasure, and it's both her greatest strength and the reason she nearly misses what's happening to the people around her.",
      "Contradiction is where a character starts to feel like a person instead of a function. Thistle, the Wild Mage, is generous with strangers and brutally withholding with anyone who's earned her trust — which is exactly backward from what a reader expects, and exactly how real grief tends to behave. We try to write the trait first and the justification second, or sometimes not at all.",
      "Moral ambiguity gets talked about as an edgy choice, but for us it's closer to a diagnostic tool. If every character in a scene would make the same decision, the scene probably isn't necessary. We look for the version of the moment where two good instincts pull in opposite directions — protect Myst, or trust her to protect herself — because that's where the story actually lives.",
      "None of this works without restraint on our end. A flawed character only reads as complex if the narrative doesn't rush to forgive them. We let consequences land, let apologies go unaccepted sometimes, and trust readers to hold two true things about a person at once. That trust is, honestly, the whole craft.",
    ],
  },
  {
    slug: 'designing-magic-systems-that-feel-earned',
    number: '03',
    category: 'The Craft',
    title: 'Designing Magic Systems That Feel Earned',
    excerpt:
      'A summoning circle only lands if the reader already knows what it costs. Notes on building rules for magic that create tension instead of solving it.',
    image: '/blog-3.png',
    imageAlt: 'A lone figure standing before a glowing arcane circle above a candlelit fantasy city',
    date: 'February 28, 2026',
    readTime: '10 min read',
    body: [
      "The first rule we set for magic in the Maldonere Chronicles wasn't what it could do — it was what it cost. Power without a price reads as a plot device; power with a price becomes a decision your character has to live with. Before we write a single spell, we ask what the caster loses, risks, or owes for using it.",
      "Consistency matters more than cleverness. It's tempting to invent a convenient exception the moment a scene needs one, but readers remember rules better than authors do, and they will catch you. We keep a running record of every ward, every summoning limit, every place magic behaves differently, so that when Thistle bends a rule, it reads as a choice rather than a convenience.",
      "The circle in this piece is a good example of restraint. It doesn't announce itself with spectacle; it's quiet, precise, and clearly the product of someone who has done this before and respects what it demands. That's the tone we chase for most of the magic in this world — closer to a craft than a fireworks display.",
      "Ultimately, a magic system is a second plot running underneath the visible one, governed by its own cause and effect. When it's built well, readers stop noticing the mechanics and start feeling the tension instead — which is the entire point of building the mechanics in the first place.",
    ],
  },
  {
    slug: 'research-and-inspiration-finding-story-gold',
    number: '04',
    category: 'Behind the Story',
    title: 'Research and Inspiration: Finding Story Gold',
    excerpt:
      'Old maps, borrowed history, and a great deal of stubbornness. Where the details of Mardalla actually come from, and how we turn research into fiction.',
    image: '/blog-4.png',
    imageAlt: 'A hand-drawn map, an antique magnifying glass, and a lit candle on a writer’s desk of old books',
    date: 'February 18, 2026',
    readTime: '7 min read',
    body: [
      "Every map of Mardalla we've ever drawn started on paper, by hand, long before it became anything a reader would see. There's something about tracing a coastline with a pencil — deciding where a river has to bend because of the hills we just sketched — that a digital tool can't quite replicate. The mistakes and improvisations end up in the final geography, and the world is better for them.",
      "We borrow more from real history than most readers assume. The guild politics that shape trade through Cornelius Duchy owe a real debt to how medieval merchant leagues actually operated, and the uneasy peace after the Sidhe war has more in common with post-conflict history than with typical fantasy truces. Fiction gets to invent the dressing; it rarely needs to invent the underlying human behavior.",
      "Inspiration, for us, is less a single spark than a slow accumulation — a detail from one research thread, a character trait borrowed from an overheard conversation, a piece of folklore that only becomes useful three books later. We keep notebooks specifically for ideas with no home yet, because the story gold rarely announces itself the moment we find it.",
      "The desk in this image isn't staged for effect. It's close to how the early chapters of book four actually get written — old references within reach, a hand-drawn map pinned close by, and the quiet conviction that the best details are the ones that make a reader believe we've been to Mardalla ourselves.",
    ],
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}
