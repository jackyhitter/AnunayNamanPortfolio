# Anunay Naman — Portfolio

A one-of-a-kind, interactive developer portfolio designed as a digital world. This is not a resume website — it's a spatial experience that progressively reveals technical depth, learning journey, and personal curiosity.

## About Me
**Anunay Naman**  
*Machine Learning × Data Science × Backend × Algorithms × Systems*

I like understanding systems deeply enough to rebuild them, then breaking them again to see where they fail. My work focuses on real-time computer vision applications (like city-scale ANPR), end-to-end ML pipelines, backend architecture, and competitive programming.

## Tech Stack

### Built With:
- **Framework:** React + TypeScript (via Vite)
- **Styling:** Tailwind CSS + Vanilla CSS (custom design system)
- **3D / Particles:** Three.js (WebGL particle morphing system)
- **Animations:** GSAP + ScrollTrigger (cinematic sequences, spatial navigation)
- **Scrolling:** Lenis (buttery-smooth physics)
- **Icons:** Lucide React

### My Personal Tech Stack:
- **Machine Learning:** PyTorch, Scikit-learn, CatBoost, XGBoost, Computer Vision (YOLOv8, OpenCV), Pandas, NumPy
- **Data Science:** Python, Statistics, EDA, Feature Engineering, MLOps, MLflow, DVC
- **Backend:** Node.js, Express, FastAPI, Flask, MongoDB, PostgreSQL, PostGIS, Docker
- **Algorithms:** C++, DSA (Striver A2Z), Dynamic Programming, Graphs, Trees
- **Frontend:** React, TypeScript, JavaScript, Tailwind, Three.js, GSAP

## Architecture

```
src/
├── data/                    # Centralized data (no hardcoded JSX)
│   ├── profile.ts           # Identity & links
│   ├── projects.ts          # Project definitions
│   ├── learning.ts          # Course/resource data
│   ├── afterHours.ts        # Anime, games, F1, football, etc.
│   ├── particleForms.ts     # Particle silhouette point clouds
│   └── skills.ts            # Skill clusters
│
├── components/
│   ├── Hero/                # Interactive identity network + anime particles
│   │   ├── Hero.tsx
│   │   ├── HeroNetwork.tsx
│   │   └── ParticleCharacter.tsx
│   ├── About/               # System narrative + education
│   ├── CurrentlyBuilding/   # Horizontal-scroll status board
│   ├── Explore/             # ITom-inspired spatial world (GSAP ScrollTrigger)
│   ├── Work/                # Compact project index
│   ├── Algorithms/          # LeetCode stats + DSA knowledge graph
│   ├── Learning/            # Course timeline (Striver, Krish Naik, etc.)
│   ├── Skills/              # Interconnected skill clusters
│   ├── AfterHours/          # Anime, games, F1, football, rabbit holes
│   └── ...
│
└── App.tsx                  # Section flow orchestration
```

## Section Flow

| # | Section | Description |
|---|---------|-------------|
| 01 | **Hero** | Radial identity network + WebGL particle anime artwork |
| 02 | **Quick Facts** | At-a-glance identity |
| 03 | **About** | System narrative + Education + Data Science |
| 04 | **Currently Building** | Horizontal-scroll developer status board |
| 05 | **Explore World** | Spatial navigation — 4 interactive rooms |
| 06 | **Selected Work** | Compact project links |
| 07 | **Lab** | Rainbow Box (live embed) + Scribble recognition |
| 08 | **Algorithmic Practice** | Dynamic LeetCode + DSA topic map |
| 09 | **Learning Log** | Striver, Love Babbar, Krish Naik, Hitesh Choudhary |
| 10 | **Skill Map** | Interconnected technology clusters |
| 11 | **After Hours** | Anime, Manga, Games, F1, Football, Art, Rabbit Holes |
| 12 | **Contact** | GitHub, LinkedIn, LeetCode, Email, Resume |

## Commands

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## Links

- **GitHub:** https://github.com/jackyhitter
- **LinkedIn:** https://www.linkedin.com/in/anunaynaman/
- **LeetCode:** https://leetcode.com/u/anunaynaman/

## Visual Effects & Easter Eggs

### Aesthetic Features
- **Dynamic Preloader**: A liquid morphing "AN" bubble that uses conic-gradients and smooth GSAP animations to handle initial load.
- **Ambient Flashlight Cursor**: A custom global ambient light that follows the cursor, casting a warm 400px amber glow over the entire portfolio. It dynamically brightens and interacts with elements underneath it without relying on complex, performance-heavy blend modes.
- **Liquid Morphing Selection (hover-bubbly)**: Major interactive cards and tech pills utilize a unique, organic CSS animation (`.hover-bubbly`). When hovered, their strict rectangular borders morph smoothly via animated `border-radius`, creating a watery, breathing bubble effect combined with a soft emerald glow.
- **Cinematic Overlays**: The site uses subtle CRT-style grid overlays, noise textures, and dim ambient code-terminal aesthetics to create a premium, immersive developer environment without resorting to "AI slop" standard themes.

### Developer Easter Eggs 🥚 & The Seeker Bot 🪄
The portfolio features a global **Seeker Bot** (a bubbly orb that pops in from the left) to track and reward your discovery of hidden Harry Potter, Anime, and Developer culture references scattered throughout the UI. The empty spaces tempt you to illuminate them with your cursor (wand).

**Hidden Secrets:**
1. **The Matrix**: Open your developer console upon loading the site. *"Wake up, Neo..."*
2. **Hitchhiker's Guide to ML**: Hover over the `MODEL` pipeline node in the ML_PROJECT card (Projects section) to discover why we *really* use `random_state=42`.
3. **Jujutsu Kaisen**: Hover over the LeetCode terminal grind button to see its true domain expansion.
4. **Cowboy Bebop**: Try highlighting the empty space at the very bottom right of the Footer. *"See you space cowboy..."*
5. **Polyjuice Potion**: Follow the pulsing finger pointer `☜` by the particle change button in the Hero section.
6. **Fate/stay night**: Hover over the `42` in the Quick Facts list. *"I am the bone of my sword..."*
7. **C/C++ Trauma**: Hover over the `[EMAIL]` button in Contact. *"I don't bite. Unless it's a segmentation fault."*
8. **React Abduction**: Illuminating the empty space in the Side Quests section.
9. **Void Traversal**: Illuminating the vast darkness in the DSA Knowledge Graph section.
10. **Marauder's Map**: Hovering the empty space beneath the NPTEL certification in About. *"I solemnly swear that I am up to no good."*
11. **Chamber of Secrets**: Illuminating a tiny, invisible circle at the bottom right of the Explore Rooms grid.

## License

This project is personal. Code structure may be referenced but please do not copy the design wholesale.
