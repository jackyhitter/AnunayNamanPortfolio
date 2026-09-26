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

## License

This project is personal. Code structure may be referenced but please do not copy the design wholesale.
