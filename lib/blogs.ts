export type BlogContentBlock =
  | { type: 'paragraph'; text: string; pullQuote?: boolean }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }

export interface BlogPost {
  slug: string
  number: string
  category: string
  /** Subtle series indicator — e.g. "The Maldonere Chronicles — Book Two". */
  seriesLabel: string
  title: string
  excerpt: string
  image: string
  imageAlt: string
  date: string
  readTime: string
  body: BlogContentBlock[]
}

/** Editorial content for the /blogs journal. Sourced verbatim from the
 *  client-approved blog documents in /public. This file is the single
 *  source of truth for the listing and detail pages. */
export const blogPosts: BlogPost[] = [
  {
    slug: 'exploring-the-world-of-maldonere',
    number: '01',
    category: 'Behind the Scenes of an Epic Fantasy Realm',
    seriesLabel: 'The Maldonere Chronicles — Book Two',
    title: 'Exploring the World of Maldonere',
    excerpt:
      'Every great epic fantasy needs a world worth getting lost in, and Maldonere is exactly that kind of place. Built by authors Inger and Alex Moore for their novel Rallying Cry, Maldonere is a realm layered with ancient history, warring races, and a magic system that feels lived in rather than invented for convenience. If you love fantasy worlds that reward close attention, this is one to add to your reading list.',
    image: '/blog-3.png',
    imageAlt: 'A lone figure standing before a glowing arcane circle above a candlelit fantasy city',
    date: 'August 21, 2026',
    readTime: '5 min read',
    body: [
      {
        type: 'paragraph',
        text: 'Here is a closer look at what makes Maldonere such a memorable setting, and why readers of epic fantasy will feel right at home the moment they step into it.',
      },
      { type: 'heading', text: 'A World Shaped by War and Old Grudges' },
      {
        type: 'paragraph',
        text: 'Maldonere is not a peaceful place, and it never really has been. The story opens in the middle of a brutal siege at Ironforge, a Dwarven stronghold under attack from Goblins, Hobgoblins, and eventually a pair of full grown Dragons. From the very first pages, readers understand that this world runs on tension. Alliances are hard won, enemies are relentless, and every victory comes at a cost.',
      },
      {
        type: 'paragraph',
        text: 'What makes this conflict feel real instead of generic is the level of military detail woven through it. Ballistae, heavy crossbows, boar cavalry, shield walls, and coordinated defense lines all show up with the kind of precision that suggests real thought went into how these battles would actually unfold underground, in tunnels, and across cavern marketplaces. This is not a world where armies just clash for the sake of spectacle. Tactics matter, and so does terrain.',
      },
      { type: 'heading', text: 'A Realm Built on Distinct Races and Cultures' },
      {
        type: 'paragraph',
        text: 'One of the strongest pillars of Maldonere is how clearly each race is defined, both in culture and in temperament.',
      },
      {
        type: 'list',
        items: [
          'Dwarves hold the underground strongholds like Ironforge, and their culture values precision, loyalty, and craftsmanship. Even something as small as measuring rocks on a battlefield reflects their obsession with accuracy.',
          'Elves, like Emerald Star and Thistle, split between those who live in city-states and those who have gone wild, hiding in the hills and forests after generations of conflict.',
          'Halflings, represented by Myst Roottapper, bring sharp instincts and a fighting spirit that never quite matches their small size.',
          'Sidhe appear as manipulative riders tied to Dragons and darker forces, adding a layer of political intrigue beneath the surface level warfare.',
          'Fey, Ogres, and Goblins round out a world where every faction has its own motives, history, and reason to be on the battlefield.',
        ],
      },
      {
        type: 'paragraph',
        text: 'This kind of layered worldbuilding gives Maldonere the feeling of a place with thousands of years of history behind it, not just a backdrop for a single story.',
      },
      { type: 'heading', text: 'Ancient Kingdoms and a History Worth Uncovering' },
      {
        type: 'paragraph',
        text: 'Maldonere is home to kingdoms like Mardalla and Santiana, each carrying its own political weight. Characters like King Corzo and Prince Gamlyn reference wars that ended suddenly and mysteriously, leaving behind unanswered questions that still shape the present day conflict. There are whispers of a war that stopped without explanation, missing Elven survivors, and ancient weapons of power hidden away for a thousand years, waiting for the right moment to resurface.',
      },
      {
        type: 'paragraph',
        text: 'This kind of slow reveal, where readers piece together the past through conversation and legend rather than long info dumps, is one of the more satisfying aspects of the book. It rewards attentive readers and gives Maldonere a sense of depth that goes far beyond the current battle at hand.',
      },
      { type: 'heading', text: 'A Magic System With Real Stakes' },
      {
        type: 'paragraph',
        text: 'Magic in Maldonere is not unlimited, and that is part of what makes it compelling. Thistle, the Elven mage, has to manage his spells carefully during the siege, knowing he only has so many powerful attacks before he runs dry. Thistle is also a wild mage, a rare and somewhat feared type of spellcaster said to trace back to Fey blood in his family line, which gives him access to a kind of magic that even traditional mages consider unpredictable and dangerous.',
      },
      {
        type: 'paragraph',
        text: 'There is also the Staff of the Sun, a Solerin weapon of power stored away generations ago after the last Solerin on Maldonere was killed in battle. Artifacts like this hint at a much larger mythology sitting underneath the main story, one that fans of deep fantasy lore will want to keep digging into.',
      },
      { type: 'heading', text: 'Dragons, Darkness, and a Mysterious Mistress' },
      {
        type: 'paragraph',
        pullQuote: true,
        text: 'No epic fantasy world feels complete without dragons, and Maldonere delivers two unforgettable ones early on. The Violet Dragon and the Ebony Dragon are both marked with silver claw scars, identifying them as Dragons of Darkness sworn to a figure known only as the Mistress of Dragons. Their presence raises the stakes of the entire Ironforge siege and introduces a bigger, more dangerous force lurking behind the Goblin attacks.',
      },
      {
        type: 'paragraph',
        text: 'These are not simple monster fights either. Each Dragon is defeated through strategy, teamwork, and a fair amount of cleverness rather than brute force alone, which keeps the action grounded even when the threats are massive.',
      },
      { type: 'heading', text: 'Why Maldonere Works as a Fantasy Setting' },
      {
        type: 'paragraph',
        text: 'What makes Maldonere stand out is how naturally its worldbuilding supports the story instead of overwhelming it. Readers are not handed a history lesson before the action starts. Instead, they learn about the world the same way the characters live in it, through battle, through conversation, and through the consequences of decisions made generations ago.',
      },
      {
        type: 'paragraph',
        text: 'For fans of epic fantasy who enjoy strong found family dynamics, richly defined races, and a magic system with real limitations, Maldonere offers a setting built to be explored again and again. Rallying Cry by Inger and Alex Moore is just the beginning of what this world has to offer, and readers who love immersive fantasy realms will find plenty here to sink into.',
      },
      {
        type: 'paragraph',
        text: 'If you are searching for your next epic fantasy read, Maldonere is a world worth stepping into.',
      },
    ],
  },
  {
    slug: 'elves-halflings-unlikely-heroes',
    number: '02',
    category: 'Character Dynamics in The Maldonere Chronicles',
    seriesLabel: 'The Maldonere Chronicles — Book Two',
    title: 'Elves, Halflings & Unlikely Heroes',
    excerpt:
      'A great fantasy world can only carry a story so far. What actually keeps readers turning pages is the people inside it, and The Maldonere Chronicles by Inger and Alex Moore is full of characters worth rooting for. The bond between this core group of unlikely heroes is built on banter, loyalty, and the kind of trust that only comes from surviving impossible odds together.',
    image: '/Two%20Elves%20and%20a%20Halfling%20Walk%20into%20a%20Bar%20V2.jpg',
    imageAlt: "Cover art for Two Elves and a Halfling Walk into a Bar, featuring a wizard's hat, a fletched arrow, and a glowing enchanted compass",
    date: 'August 14, 2026',
    readTime: '4 min read',
    body: [
      {
        type: 'paragraph',
        text: 'Here is a closer look at the characters driving Rallying Cry, and the relationships that make this found family so memorable.',
      },
      { type: 'heading', text: 'Myst Roottapper: The Halfling Who Refuses to Sit Back' },
      {
        type: 'paragraph',
        text: 'Myst Roottapper is a Halfling with a sharp bow, a sharper tongue, and none of the caution readers usually expect from a small statured character. Tall for a Halfling, she can see over Dwarf built walls without help, and she is usually the first to lean too far over a ledge just to get a better look at the action. Her running commentary during battle, complaining about running out of arrows or cheering on boar cavalry, gives the story a lightness that balances out the darker stakes around her.',
      },
      {
        type: 'paragraph',
        pullQuote: true,
        text: "Her relationship with Thistle is one of the most entertaining in the book. The two banter constantly, finish each other's tactical thoughts, and clearly trust one another completely, even while trading insults about itty bitty bows and idiotic Goblins hiding under blankets.",
      },
      { type: 'heading', text: 'Thistle: The Mage With Limited Spells and Unlimited Sarcasm' },
      {
        type: 'paragraph',
        text: "Thistle, the Elven mage, is the group's dry witted powerhouse, but he is never written as untouchable. His magic has real limits, and readers feel the tension every time he counts down how many big spells he has left. What makes Thistle so likable is that his humor never disappears even under pressure. Taunting a Dragon in the middle of a siege, calling it Lizard Boy and Scale Boy, is exactly the kind of moment that makes him feel like a real person instead of a walking spellbook.",
      },
      {
        type: 'paragraph',
        text: 'His partnership with Myst on the northern wall, and his steady presence beside Sergeant Ironbolt, shows a character who leads through calm competence rather than volume.',
      },
      { type: 'heading', text: 'Emerald Star and Kari Ashmoor: Warriors Who Refuse to Fight Alone' },
      {
        type: 'paragraph',
        text: 'Emerald Star, known as Em, and Kari Ashmoor are betrothed, and their relationship is one of the emotional anchors of the story. Kari is a Priestess of Baldur, and while Em tends to run headfirst into danger, Kari is the one who calls him out on it, reminding him in no uncertain terms that they are supposed to be a team.',
      },
      {
        type: 'paragraph',
        text: 'Their dynamic works because neither of them is written as the reckless one or the sensible one all the time. Kari fights just as hard as Em does, and Em, for all his skill with a blade, clearly listens when she pushes back. Their eventual plans to marry once the fighting settles down add a hopeful thread running underneath all the chaos.',
      },
      { type: 'heading', text: 'John Freeson: The Human Still Catching Up' },
      {
        type: 'paragraph',
        text: "John Freeson is the newest member of the group, still learning Elven and still getting used to fighting alongside seasoned warriors twice his experience. That outsider position makes him relatable, especially in the moment he jumps off a wall to help a boar rider in trouble without thinking it through first, much to Em's frustration.",
      },
      {
        type: 'paragraph',
        text: 'His dynamic with Dura, the Dwarven boar rider he ends up fighting beside, becomes one of the more charming surprises in the story. What starts as a rescue turns into genuine teamwork, with Dura calling the shots and John falling into rhythm with her fighting style within minutes.',
      },
      {
        type: 'paragraph',
        text: "John's growth throughout the book comes less from becoming the strongest fighter in the room and more from learning when to listen, when to act, and when to trust the people around him.",
      },
      { type: 'heading', text: 'Found Family, Built Through Battle' },
      {
        type: 'paragraph',
        text: 'What ties this group together is not just shared danger, it is the way they take care of each other in the middle of it. Thistle covering for Myst as she leans too far over a wall. Em scolding John while secretly proud of him. Kari holding Em accountable without ever doubting him. These small moments of care between huge battle scenes are what make the found family dynamic in The Maldonere Chronicles feel earned rather than convenient.',
      },
      {
        type: 'paragraph',
        text: 'It is a reminder that even in a world of Dragons, Ogres, and ancient magic, the strongest force in the story is still the loyalty this group has for one another.',
      },
      { type: 'heading', text: 'Why These Character Dynamics Matter' },
      {
        type: 'paragraph',
        text: "Readers who love epic fantasy for the worldbuilding will find plenty to enjoy in Maldonere, but it is the characters who make the journey worth taking. Myst's fearlessness, Thistle's steady sarcasm, Em and Kari's fierce partnership, and John's determination to earn his place all combine into a group readers will want to follow through every battle still to come.",
      },
      {
        type: 'paragraph',
        text: 'If found family stories with real stakes and real humor are what you look for in a fantasy series, The Maldonere Chronicles is worth picking up.',
      },
    ],
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}
