import type { BookId } from './books'

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
  /** Which book in the series this article belongs to — drives the grouped
   *  Book One / Two / Three sections on the /blogs listing page. */
  book: BookId
  title: string
  excerpt: string
  image: string
  imageAlt: string
  date: string
  readTime: string
  body: BlogContentBlock[]
}

/** Editorial content for the /blogs journal. Sourced verbatim from the
 *  client-approved blog documents in /public/blogs. This file is the single
 *  source of truth for the listing and detail pages. Order follows the
 *  book sequence: Book One, Book Two, Book Three. */
export const blogPosts: BlogPost[] = [
  // ───────────────────────── Book One — Two Elves and a Halfling ─────────────────────────
  {
    slug: 'exploring-the-world-of-maldonere-book-one',
    number: '01',
    category: 'Behind the Scenes of an Epic Fantasy Realm',
    seriesLabel: 'The Maldonere Chronicles — Book One',
    book: 'acclaimed',
    title: 'Exploring the World of Maldonere',
    excerpt:
      'Every great fantasy series starts with a world that feels alive, and Maldonere is exactly that kind of place. Created by authors Inger and Alex Moore, the Maldonere Chronicles invites readers into a sunlit realm of elves, dwarves, halflings, and ancient magic, where an old war still casts a shadow over everyday life. If you love fantasy novels that mix heartfelt friendship with deep worldbuilding, this is a series worth getting to know. Here is a closer look at the world of Maldonere and what makes it such a rich setting for storytelling.',
    image: '/blog-4.png',
    imageAlt: 'A candlelit desk scene with an antique map of a fantasy city, a magnifying glass, and leather-bound books',
    date: 'June 12, 2026',
    readTime: '5 min read',
    body: [
      { type: 'heading', text: 'A Village Called The Vales: Where the Adventure Begins' },
      {
        type: 'paragraph',
        text: 'The story opens in a small, quiet village called The Vales, tucked on the eastern side of the country of Mardalla. It is here that readers first meet Emerald Star, known to his friends simply as Em, a skilled elf ranger with silver blond hair and bright green eyes. Living nearby is Thistle, an orphaned elf raised by humans and newly finished with his mage apprenticeship. Thistle is thoughtful, a little absentminded, and always more interested in the book in his hands than in watching where he steps.',
      },
      {
        type: 'paragraph',
        text: 'What begins as a simple day of berry picking quickly turns into something much bigger when the ground gives way beneath an old boulder, revealing a hidden cellar and a mysterious ironwood staff. It is a small, grounded moment that sets the tone for the whole series. Big discoveries in Maldonere often grow out of ordinary days, and that balance between the everyday and the extraordinary is part of what makes the world feel so believable.',
      },
      { type: 'heading', text: 'Meet the Companions: Em, Thistle, and Myst' },
      {
        type: 'paragraph',
        text: 'At the heart of the Maldonere Chronicles is a found family of companions. Em brings practical skill and quiet loyalty, while Thistle brings curiosity and a slowly growing confidence in his magic. They are soon joined by Myst Roottapper, a halfling with sharp instincts and an eye for opportunity, who first uncovered the strange old book that started Thistle down his research path.',
      },
      {
        type: 'paragraph',
        text: 'Their journeys are not limited to grand battles. Readers follow them through everyday tasks like foraging, trading with local villages, caring for their animal companions, and helping people they meet along the road, such as the dwarf Ragnar, who needs help reclaiming his mine from goblins. These smaller stories give the world texture and make the larger conflicts feel earned rather than rushed.',
      },
      { type: 'heading', text: 'The Elves of Maldonere and Their Ancient Enemy' },
      {
        type: 'paragraph',
        text: 'No epic fantasy world is complete without a history that shapes the present, and Maldonere has a powerful one. A thousand years before the events of the series, the sunlit elves of Maldonere fought a brutal war against the Sidhe, their twisted kin from the UnderRealm. The Sidhe show no fear of darkness and no mercy for their enemies, and in that ancient war they very nearly destroyed the elves of the light entirely.',
      },
      {
        type: 'paragraph',
        text: "This backstory is not just decoration. It quietly shapes the politics, the fears, and the folklore of the present day, and it gives every mention of the UnderRealm a sense of old, unresolved danger. When goblins start appearing near Ragnar's mine, for instance, the companions immediately wonder whether a new entrance to the UnderRealm has opened nearby, tying a small local problem back into the wider mythology of the world.",
      },
      { type: 'heading', text: 'Legends Etched in Glass: The Tale That Lives On' },
      {
        type: 'paragraph',
        pullQuote: true,
        text: 'One of the most memorable parts of the Maldonere Chronicles is the legend of the woman who stopped the Sidhe advance for good. As the story goes, a lone spellcaster stood at a mountain pass and sent her people, the elderly first, then the strong and brave, through a gateway to safety while she held off nearly fifty Sidhe warriors alone. Wounded but unbroken, she brought the mountain down upon her enemies, then turned the earth itself into glass so that no Sidhe could ever rise from that place again.',
      },
      {
        type: 'paragraph',
        text: 'The story survives as a tale told around campfires generations later, complete with debate over whether the woman died there or escaped to find her people again. It is the kind of legend that gives a fantasy world emotional weight, and it shows how much care Inger and Alex Moore have put into making Maldonere feel like a place with real history, not just a backdrop for adventure.',
      },
      { type: 'heading', text: 'The Small Details That Make Maldonere Feel Real' },
      {
        type: 'paragraph',
        text: "Great worldbuilding often lives in the small things, and Maldonere has plenty of them. There are Em's ferrets, Lulu and Rico, who complain loudly about the cold from inside a saddlebag. There are loyal dogs like Shane, Shelly, Ash, Cinder, and Fang, each with their own personality, and a quail named Queenie who gets left behind as a gift to a grateful ally. There is Dwarven storytelling tradition, complete with its own rhythm and reverence for the past, delivered by characters like Ragnar in a way that feels like listening in on a real fireside tale.",
      },
      {
        type: 'paragraph',
        text: 'These details matter because they turn Maldonere from a map into a lived-in world. Readers do not just learn about elves, dwarves, and halflings in the abstract. They see how these races travel, eat, joke, grieve, and remember, which is exactly what keeps fantasy readers coming back for more.',
      },
      { type: 'heading', text: 'Why the World of Maldonere Stands Out' },
      {
        type: 'paragraph',
        text: 'What makes Maldonere special is the way it blends intimate, character driven storytelling with sweeping fantasy history. Readers get quiet, funny moments between friends alongside legends of ancient wars and magic strong enough to reshape the land itself. It is a world built with care, patience, and genuine affection for its characters, and that comes through on every page of the Maldonere Chronicles.',
      },
      {
        type: 'paragraph',
        text: 'If you are looking for a fantasy series with strong friendships, believable worldbuilding, and a history that keeps unfolding the deeper you go, the world of Maldonere is well worth exploring. Follow Em, Thistle, and Myst as their small adventures pull them into something much larger, and discover why so many fantasy readers are falling in love with this richly imagined realm.',
      },
    ],
  },
  {
    slug: 'elves-halflings-unlikely-heroes-book-one',
    number: '02',
    category: 'Character Dynamics in The Maldonere Chronicles',
    seriesLabel: 'The Maldonere Chronicles — Book One',
    book: 'acclaimed',
    title: 'Elves, Halflings & Unlikely Heroes',
    excerpt:
      'A fantasy world can have stunning magic and sweeping history, but what truly pulls readers in is the characters who walk through it. In the Maldonere Chronicles by Inger and Alex Moore, the real heart of the story lies in how its heroes talk to each other, tease each other, and slowly grow into the family they never expected to find. Here is a closer look at the character dynamics that make this series so easy to fall in love with.',
    image: '/blog-2.png',
    imageAlt: 'A brooding dark-haired young man in ornate armor standing before candlelit fantasy spires at dusk',
    date: 'June 19, 2026',
    readTime: '5 min read',
    body: [
      { type: 'heading', text: 'Em and Thistle: Opposites Who Balance Each Other' },
      {
        type: 'paragraph',
        text: 'At the center of the story is the friendship between Emerald Star, known as Em, and Thistle, an orphaned elf mage. Em is practical, alert, and skilled with a bow, while Thistle is absentminded, bookish, and often more focused on the page in front of him than the ground beneath his feet. Their very first scenes together set the tone for the whole series, from Em tossing Thistle a berry bucket to teach him self sufficiency, to their good natured bickering over whether they are picking blackberries or blueberries, or whether the animal underfoot is a woodchuck or a groundhog.',
      },
      {
        type: 'paragraph',
        text: 'This dynamic works because it never feels forced. Em looks out for Thistle almost on instinct, while Thistle brings curiosity and quiet bravery that pushes both of them into new discoveries, from a hidden cellar to an ancient ironwood staff. Their banter is light and funny, but underneath it is a real loyalty that only deepens as the story continues.',
      },
      { type: 'heading', text: 'Myst Roottapper: The Halfling Who Levels Up the Team' },
      {
        type: 'paragraph',
        text: "Once Myst Roottapper joins the group, the found family dynamic really comes into focus. Myst is enthusiastic, quick with her hands, and endlessly curious, and she brings an energy that balances Em's caution and Thistle's distraction. One of the most charming scenes in the story shows Myst's father, Nauma Greycloak, teaching all three companions how to examine an old trunk for hidden compartments, patiently explaining what type of wood to look for and how to check for false bottoms. Myst finds the hidden latch herself, discovering a small sling that becomes a signature part of her character.",
      },
      {
        type: 'paragraph',
        text: "What makes this trio work is how naturally they fill different roles without ever feeling like flat archetypes. Em is the protector, Thistle is the researcher, and Myst is the one willing to leap in and try things first. Even their teasing has heart, like when Thistle jokingly points out Myst's habit of aiming her sling without thinking about where it is pointed, only for Myst to shoot back that a sling has no point to aim in the first place.",
      },
      { type: 'heading', text: 'Found Family in a World That Took Their Families Away' },
      {
        type: 'paragraph',
        text: "One detail that gives these relationships real emotional depth is that both Em and Thistle are the last surviving members of their family lines. When Em watches Myst's boisterous, close knit Halfling family laughing and picking berries together, he quietly wonders what it might be like to belong to a family like that, then looks over at Thistle, who is in the exact same position. It is a small, understated moment, but it explains so much about why these two elves are so protective of the friendships they do have.",
      },
      {
        type: 'paragraph',
        pullQuote: true,
        text: 'This is part of what makes the unlikely heroes of Maldonere resonate with readers. They are not brought together by prophecy or destiny alone. They are brought together because they need each other, and because found family can be just as strong as blood family in a world still recovering from an ancient war.',
      },
      { type: 'heading', text: 'Ragnar Ironforge: The Gruff Dwarf With a Practical Heart' },
      {
        type: 'paragraph',
        text: "As the story widens, new characters bring new dynamics into the mix. Ragnar Ironforge, a dwarven miner whose claim has been overrun by goblins, adds a grounded, business minded energy to the group. Rather than asking for charity, Ragnar negotiates a fair percentage of his mine's future earnings in exchange for help clearing it out, a very dwarven approach to problem solving that contrasts nicely with the younger companions' more improvised style. His storytelling later in the journey, delivered in the traditional voice of a Dwarven Taleteller, also gives readers a glimpse of how each race in Maldonere carries its own traditions and way of seeing the world.",
      },
      { type: 'heading', text: "Kari Ashmoor and the King's Rangers: New Bonds on the Road" },
      {
        type: 'paragraph',
        text: "The introduction of Kari Ashmoor, daughter of King's Ranger Mordekai Ashmoor, brings a gentler, more personal thread into the story. Her connection with Em develops through small, thoughtful moments, like Em bringing her marigolds after a scouting ride, rather than dramatic declarations. Meanwhile, Mordekai's protective, slightly gruff attitude toward his daughter adds warmth and a touch of humor, especially as his fellow rangers gently tease him about it. These smaller relationships widen the emotional world of the series without ever pulling focus from the core friendship between Em, Thistle, and Myst.",
      },
      { type: 'heading', text: 'Why These Dynamics Make Maldonere Feel Alive' },
      {
        type: 'paragraph',
        text: 'What ties all of these relationships together is that none of the characters in the Maldonere Chronicles feel like they exist only to move the plot forward. Their friendships have texture, their disagreements are gentle rather than dramatic, and their growth happens through everyday interactions as much as through big adventures. Whether it is Em and Thistle arguing over berry names, Myst proving herself capable in front of her family, or Ragnar striking a fair deal instead of asking for a handout, every character dynamic adds another layer to a world that already feels rich with history.',
      },
      {
        type: 'paragraph',
        text: 'For readers who love fantasy series built on strong relationships as much as strong magic systems, the character dynamics in the Maldonere Chronicles are a big part of what makes this world so easy to keep coming back to.',
      },
    ],
  },
  // ───────────────────────── Book Two — Rallying Cry (already approved, untouched) ─────────────────────────
  {
    slug: 'exploring-the-world-of-maldonere',
    number: '01',
    category: 'Behind the Scenes of an Epic Fantasy Realm',
    seriesLabel: 'The Maldonere Chronicles — Book Two',
    book: 'featured',
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
    book: 'featured',
    title: 'Elves, Halflings & Unlikely Heroes',
    excerpt:
      'A great fantasy world can only carry a story so far. What actually keeps readers turning pages is the people inside it, and The Maldonere Chronicles by Inger and Alex Moore is full of characters worth rooting for. The bond between this core group of unlikely heroes is built on banter, loyalty, and the kind of trust that only comes from surviving impossible odds together.',
    image: '/blog-2.png',
    imageAlt: 'A brooding dark-haired young man in ornate armor standing before candlelit fantasy spires at dusk',
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
  // ───────────────────────── Book Three — Calling the Lost Ones Home ─────────────────────────
  {
    slug: 'exploring-the-world-of-maldonere-calling-the-lost-ones-home',
    number: '01',
    category: 'Behind the Scenes of an Epic Fantasy Realm',
    seriesLabel: 'The Maldonere Chronicles — Book Three',
    book: 'latest',
    title: 'Exploring the World of Maldonere',
    excerpt:
      'Maldonere has always been a world built on layers, and Calling the Lost Ones Home peels back a few more of them. This installment in the series by Inger and Alex Moore takes readers beyond the battlefield and into the slower, and just as dangerous, work of building something new. It also widens the lens, showing that Maldonere is only one piece of a much bigger picture.',
    image: '/blog-1.png',
    imageAlt: 'A golden airship drifting past towering gothic spires over a lantern-lit fantasy city at dusk',
    date: 'September 4, 2026',
    readTime: '5 min read',
    body: [
      {
        type: 'paragraph',
        text: 'Here is a closer look at what this chapter of the story adds to the world of Maldonere, and why it deepens everything readers already love about this series.',
      },
      { type: 'heading', text: 'A Duchy Rises From the Ashes of War' },
      {
        type: 'paragraph',
        text: 'The story opens in the aftermath of battle, with the old keep torn down and a brand new duchy being built in its place. This is not a quiet rebuilding either. Over a hundred new citizens have already been hired within a single month, workshops and farms are going up, and the village unofficially known as Keeptown is taking shape around it.',
      },
      {
        type: 'paragraph',
        text: "What makes this section of the world feel so grounded is the amount of everyday detail layered into it. Arguments over who gets to be head chef, plans for a new inn, and the sorting of magical gargoyles recovered from the old keep all show a world that keeps moving even after the fighting stops. Four crystal gargoyles in total, carved from peridot, topaz, citrine, and garnet, were recovered from the old keep. Em, Myst, and Thistle each claimed one as a personal guardian statue, while the fourth was set aside for the front of the Keep itself, a small but memorable detail that ties the old keep's dark history to the new duchy's future.",
      },
      { type: 'heading', text: 'The Tri-Lords and the Family Around Them' },
      {
        type: 'paragraph',
        text: 'The new duchy is officially named for its three rulers, Em, Myst, and Thistle, who are together known as the Tri-Lords. It is a title that reflects how this world handles leadership, less about hierarchy and more about shared responsibility between equals. Even the title itself carries a bit of Halfling humor, since Myst points out that in several languages, including her own, the plural of Lords and Ladies is simply Lords.',
      },
      {
        type: 'paragraph',
        text: 'Around the Tri-Lords sits a growing found family, including Kari, John, Allard, and the sharp tongued Aunt Daisy, who somehow manages to referee kitchen politics with the same authority she probably once used on a battlefield. This wider circle gives Maldonere a warmer, more domestic side that balances out the danger simmering elsewhere in the world.',
      },
      { type: 'heading', text: 'A Multiverse Beyond Maldonere' },
      {
        type: 'paragraph',
        pullQuote: true,
        text: 'One of the biggest expansions in this book is the reveal that Maldonere is not the only world out there. The Sidhe, long established as a manipulative and powerful people, are shown ruling over other conquered worlds entirely, including one renamed Ebonlynx after being taken from the Orc clans who once called it Wolfendark.',
      },
      {
        type: 'paragraph',
        text: 'Readers also get a glimpse of Darkness Fallen, a separate world where a Sidhe matriarch and her family plot and maneuver from a distance, discussing events on Maldonere as just one piece of a much larger political game. This multiverse angle raises the stakes considerably, suggesting that the war Maldonere has already survived may only be a small part of something far bigger.',
      },
      { type: 'heading', text: 'The Five Cities and New Political Players' },
      {
        type: 'paragraph',
        text: "Further out along the eastern coastline sits the Five Cities, made up of Midnight, Twilight, Dusk, Daylight, and Dawn. Publicly united for mutual defense, the Five Cities are shown to be full of behind the scenes power struggles, with leadership that does not particularly care for the people it governs. Mostly Human, with the occasional Dwarf or Gnome mixed in, this region adds a grayer, more morally complicated corner to Maldonere's map.",
      },
      {
        type: 'paragraph',
        text: "New races also make an appearance here, including the reptilian Zards, who turn up fighting alongside Orcs and even the occasional Dwarf among a crew of pirates. It is a reminder that Maldonere's conflicts are rarely as simple as one race against another.",
      },
      { type: 'heading', text: 'Old Kingdoms, Old Grudges' },
      {
        type: 'paragraph',
        text: "Familiar kingdoms continue to shape the political landscape as well. King Corzo of Mardalla remains cautious about outside alliances, particularly with the unpredictable Five Cities and the neighboring kingdom of Trevidor, a rivalry that stretches back generations over old trade disputes. Meanwhile, the Tri-Lords maintain their own diplomatic ties with Santiana and King Satwin, showing how much of Maldonere's stability still depends on careful, ongoing relationships built one meeting at a time.",
      },
      { type: 'heading', text: 'Why This Chapter Deepens Maldonere' },
      {
        type: 'paragraph',
        text: 'What makes Calling the Lost Ones Home such a satisfying continuation is how it shifts focus without losing what made the world compelling in the first place. Building a duchy, managing a found family, and discovering an entire multiverse of worlds beyond Maldonere all add scale to a series that already had plenty of heart.',
      },
      {
        type: 'paragraph',
        text: 'For readers who love watching a fantasy world grow more complex with every book, this installment proves that Maldonere still has a great deal left to reveal.',
      },
    ],
  },
  {
    slug: 'elves-halflings-unlikely-heroes-calling-the-lost-ones-home',
    number: '02',
    category: 'Character Dynamics in The Maldonere Chronicles',
    seriesLabel: 'The Maldonere Chronicles — Book Three',
    book: 'latest',
    title: 'Elves, Halflings & Unlikely Heroes',
    excerpt:
      'Building a fantasy world is one thing. Building a family inside it is another, and that is exactly what Calling the Lost Ones Home by Inger and Alex Moore does so well. With the battles of the past behind them, the core group at the heart of The Maldonere Chronicles settles into a new kind of challenge, running a duchy together, and their relationships grow richer for it.',
    image: '/blog-2.png',
    imageAlt: 'A brooding dark-haired young man in ornate armor standing before candlelit fantasy spires at dusk',
    date: 'September 11, 2026',
    readTime: '5 min read',
    body: [
      {
        type: 'paragraph',
        text: 'Here is a closer look at how these characters and their dynamics continue to evolve.',
      },
      { type: 'heading', text: 'The Tri-Lords: Leadership Built on Trust' },
      {
        type: 'paragraph',
        text: 'Em, Myst, and Thistle now rule together as the Tri-Lords, a title that says a great deal about how this group operates. Rather than one leader giving orders, decisions get made around a shared table, with each of the three weighing in equally. Even small moments, like Myst gently correcting someone who assumes Lord and Lady titles must be split by gender, show a group secure enough in their bond to laugh through the details.',
      },
      {
        type: 'paragraph',
        text: 'One charming detail shows up between Em and Myst, a quiet coin passed between them after someone reacts to the duchy in a way one of them apparently predicted. It is a small, playful gesture that hints at the kind of easy bets and inside jokes this long friendship is built on.',
      },
      { type: 'heading', text: 'Em and Kari: Partners in Every Sense' },
      {
        type: 'paragraph',
        text: "Em and Kari have moved from betrothed to married, and that shift shows in how naturally they operate as a team. Kari works alongside Allard on matters involving the duchy's temples and shrines, while Em continues to lead with the same protective instincts readers have come to expect from him. Their partnership feels less about grand gestures now and more about the quiet reliability of two people who trust each other completely.",
      },
      { type: 'heading', text: 'John Freeson: From Newcomer to Captain' },
      {
        type: 'paragraph',
        text: 'John\'s growth is one of the most satisfying threads in this stage of the story. Once the newest and least experienced member of the group, he now serves as captain of the duchy guard, personally overseeing new recruits and managing a growing security force. His decision to braid his hair the same way Em does is a small but telling detail, a quiet sign of just how much he has come to model himself after the man he once simply followed.',
      },
      {
        type: 'paragraph',
        text: 'Em still backs him up in interviews and decisions, but the dynamic has shifted from protector and protected to something closer to equals working side by side.',
      },
      { type: 'heading', text: 'Allard and Kari: Faith Behind the Scenes' },
      {
        type: 'paragraph',
        text: "Allard, a priest who joined the group's inner circle, works closely with Kari to manage the duchy's growing religious presence, including priests and priestesses representing several different gods. Their partnership handles some of the more delicate parts of rebuilding, from blessing the land to fairly dividing recovered magical items among the temples. It is steady, behind the scenes work, and the trust between Allard and Kari makes it feel effortless even when the details get complicated.",
      },
      { type: 'heading', text: 'Aunt Daisy: The Heart of the Household' },
      {
        type: 'paragraph',
        text: 'If the Tri-Lords handle the big decisions, Aunt Daisy handles everything else, and somehow makes it look easy. Whether she is mediating a kitchen dispute between three strong willed cooks or quietly figuring out that one of them would rather be making candy than dinner, she brings warmth and sharp practical sense to every scene she is in. Her fashionable, unbothered presence at even the most chaotic morning meetings makes her one of the most enjoyable characters to watch.',
      },
      { type: 'heading', text: 'A Found Family Still Growing' },
      {
        type: 'paragraph',
        text: "What ties all of these relationships together is how naturally the group has expanded without losing what made it work in the first place. Wind Ashmoor, Kari's uncle, now trains horses for the duchy. New allies and staff keep joining the circle. Yet every new addition seems to slot into the group's rhythm rather than disrupt it, a sign of just how strong the foundation between these characters really is.",
      },
      { type: 'heading', text: 'Why These Dynamics Still Matter' },
      {
        type: 'paragraph',
        text: 'Readers who fell in love with this cast for their humor and loyalty in earlier books will find that same chemistry here, just tested in new ways. Running a duchy together, raising a household, and building a life after war turns out to be its own kind of adventure, and the relationships between Em, Myst, Thistle, Kari, John, Allard, and Aunt Daisy are what make it worth following.',
      },
      {
        type: 'paragraph',
        pullQuote: true,
        text: 'Calling the Lost Ones Home proves that the strongest part of The Maldonere Chronicles has never just been the battles. It has always been the people who show up for each other once the fighting is done.',
      },
    ],
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getBlogPostsByBook(book: BookId): BlogPost[] {
  return blogPosts.filter((post) => post.book === book)
}
