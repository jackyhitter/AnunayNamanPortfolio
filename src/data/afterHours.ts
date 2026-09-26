export type InterestItem = {
  title: string;
  desc: string;
  theme?: string;
  status?: string;
  meta?: string;
};

export type InterestCategory = {
  id: string;
  label: string;
  color: string;
  subtitle?: string;
  items: InterestItem[];
};

export const afterHoursData: InterestCategory[] = [
  {
    id: 'anime',
    label: 'ANIME',
    color: '#f87171',
    subtitle: 'Stories that understand scale.',
    items: [
      { title: 'Attack on Titan', desc: 'Scale. Consequences. Systems collapsing under their own weight.', theme: 'WAR / CONSEQUENCE / FREEDOM', status: 'WATCHED' },
      { title: 'Vinland Saga', desc: 'Violence, revenge, and the slow realization that none of it is enough.', theme: 'REVENGE / PURPOSE / GROWTH', status: 'WATCHED' },
      { title: 'Jujutsu Kaisen', desc: 'Power systems, chaos and absurd fight choreography.', theme: 'CHAOS / POWER / CONSEQUENCE', status: 'WATCHED' },
      { title: 'One Piece', desc: 'Ridiculous world-building and an ability to keep expanding without feeling small.', theme: 'WORLD-BUILDING / FREEDOM / ADVENTURE', status: 'WATCHING' },
      { title: 'Bleach', desc: 'Style, swords, atmosphere.', theme: 'STYLE / IDENTITY / SWORDS', status: 'WATCHED' },
    ]
  },
  {
    id: 'manga',
    label: 'MANGA',
    color: '#fb923c',
    subtitle: 'The source material.',
    items: [
      { title: 'Attack on Titan', desc: 'The manga hits differently — pacing, details, the ending.' },
      { title: 'Vinland Saga', desc: 'The farmland saga only exists in the manga. Worth it.' },
      { title: 'One Piece', desc: 'Over 1100 chapters and the world keeps expanding.' },
      { title: 'Jujutsu Kaisen', desc: 'Gege does things with panel composition that animation can\'t replicate.' },
      { title: 'Bleach', desc: 'TYBW in the manga is peak visual identity.' },
    ]
  },
  {
    id: 'games',
    label: 'GAMES',
    color: '#4ade80',
    subtitle: 'Games I get lost in.',
    items: [
      { title: 'GTA V', desc: 'The open world that defined a generation of gaming.', theme: 'OPEN WORLD / CHAOS / SATIRE' },
      { title: 'Red Dead Redemption 2', desc: 'A masterclass in environmental storytelling. Ruined other open worlds.', theme: 'NARRATIVE / LANDSCAPE / LOSS' },
      { title: 'Ghost of Tsushima', desc: 'Art direction and combat perfection. Wind as a navigation system.', theme: 'ART / COMBAT / HONOR' },
      { title: 'Black Myth: Wukong', desc: 'Stunning boss designs and mythological depth.', theme: 'MYTHOLOGY / BOSS DESIGN / SPECTACLE' },
      { title: 'Getting Over It', desc: 'Questionable life choices. Pure frustration simulation.', theme: 'FRUSTRATION / PERSISTENCE / PAIN' },
    ]
  },
  {
    id: 'f1',
    label: 'F1',
    color: '#ef4444',
    subtitle: 'Watching machines get optimized to absurdity.',
    items: [
      { title: 'Formula 1', desc: 'Speed, optimization, engineering, precision. Machines pushed to absolute limits.', theme: 'SPEED / ENGINEERING / OPTIMIZATION' },
    ]
  },
  {
    id: 'football',
    label: 'FOOTBALL',
    color: '#60a5fa',
    subtitle: 'Real Madrid. Ronaldo. That should explain enough.',
    items: [
      { title: 'Real Madrid', desc: 'The club.', theme: 'LEGACY / DOMINANCE / HISTORY' },
      { title: 'Cristiano Ronaldo', desc: 'CR7. Discipline, obsession, and relentless self-improvement.', theme: 'DISCIPLINE / OBSESSION / GREATNESS' },
    ]
  },
  {
    id: 'art',
    label: 'ART / VISUALS',
    color: '#f472b6',
    subtitle: 'Not everything needs to be functional.',
    items: [
      { title: 'Creative Coding', desc: 'What happens if an interface behaves more like a system than a document?' },
      { title: 'Typography', desc: 'How letters shape meaning before you even read them.' },
      { title: 'Generative Art', desc: 'Systems that create beauty without explicit instruction.' },
    ]
  },
  {
    id: 'movies',
    label: 'MOVIES / BOOKS',
    color: '#a3e635',
    subtitle: 'Range, not depth.',
    items: [
      { title: 'Movies', desc: 'Cinema as visual systems — storytelling through composition and pacing.' },
      { title: 'Books', desc: 'Occasional deep dives into technical writing, philosophy, and fiction.' },
    ]
  },
  {
    id: 'rabbitholes',
    label: 'RABBIT HOLES',
    color: '#a78bfa',
    subtitle: 'Things I randomly get obsessed with.',
    items: [
      { title: 'Computer Vision', desc: 'How can a machine reconstruct the world from pixels?' },
      { title: 'Creative Coding', desc: 'What happens if an interface behaves more like a system than a document?' },
      { title: 'Game Mechanics', desc: 'Why do some tiny interaction loops become impossible to stop playing?' },
      { title: 'Physics Simulations', desc: 'Particles, forces, constraints — the beauty of emergent behavior.' },
      { title: 'UI Interactions', desc: 'Micro-animations that make software feel alive.' },
      { title: 'Architecture', desc: 'Brutalism and functional design.' },
      { title: 'F1 Engineering', desc: 'Aerodynamics, telemetry, and optimization under constraint.' },
      { title: 'Internet Weirdness', desc: 'The strange corners of the web that shouldn\'t exist but do.' },
    ]
  }
];
