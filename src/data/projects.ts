export type Project = {
  id: string;
  title: string;
  subtitle: string;
  type: 'featured' | 'experiment' | 'archive' | 'learning';
  maturity: 'PRODUCTION-STYLE' | 'RESEARCH' | 'SHIPPED' | 'IN PROGRESS' | 'PLAYGROUND' | 'LEARNING' | 'EXPERIMENT';
  technologies: string[];
  capabilities?: string[];
  repository: string;
  githubUrl: string;
  description: string;
  architecture?: string[];
  liveUrl?: string;
  caseStudyRoute?: string;
  externalDocUrl?: string;
  doi?: string;
};

export const projects: Project[] = [
  {
    id: "ai-security-report",
    title: "The Whack-a-Mole Effect in AI Code Repair",
    subtitle: "Static-Analysis Findings & Complexity After Scanner-Guided Fixes",
    type: "featured",
    maturity: "RESEARCH",
    technologies: ["Python", "CodeQL", "LLMSecEval", "Qwen2.5-Coder", "Radon", "SAST", "AST"],
    capabilities: [
      "scanner-guided program repair",
      "CodeQL SARIF taint-flow analysis",
      "vulnerability persistence auditing",
      "secondary alert detection",
      "Radon cyclomatic complexity & LOC",
      "LLMSecEval benchmark integration"
    ],
    repository: "jackyhitter / AI_security_report",
    githubUrl: "https://github.com/jackyhitter/AI_security_report",
    externalDocUrl: "https://zenodo.org/records/23297055?preview=1&token=eyJhbGciOiJIUzUxMiJ9.eyJpZCI6ImQ4ZDZkOTgxLWY4NGQtNGI4NC1iZTQwLTc0ZmU3N2M2MWFhYyIsImRhdGEiOnt9LCJyYW5kb20iOiJiYjg0MGZjYjRhNDA1MWQ5NGExZTllZThhY2EzNzRhZiJ9.o1bx-7O4pgSJqBFay8n07MZNBXbZaGGTbOmvxIBZKufDrhDwRMFAMLyMkrfoEomdMTR8aO6dO2xe6yBhYqgUCw",
    doi: "10.5281/zenodo.23297055",
    description: "Empirical software security investigation evaluating whether scanner-guided fixes for AI-generated Python code eliminate CodeQL alerts, leave vulnerabilities unresolved (vulnerability inertia), trigger secondary findings, or increase structural code complexity.",
    architecture: ["LLMSecEval Benchmark", "Baseline Generation (Qwen2.5-Coder-1.5B)", "CodeQL Security Scan", "Diagnostic Extraction", "Scanner-Guided Fix Loop", "Post-Repair Static Analysis", "Radon Complexity & LOC"]
  },
  {
    id: "la-peace",
    title: "LA PEACE",
    subtitle: "City-wide ANPR & Traffic Intelligence",
    type: "featured",
    maturity: "RESEARCH",
    technologies: ["YOLOv8", "PaddleOCR", "OpenCV", "FastAPI", "PostgreSQL", "PostGIS", "React", "TypeScript", "OSRM"],
    capabilities: [
      "real-time ANPR",
      "vehicle detection",
      "plate recognition",
      "multi-camera tracking",
      "trajectory reconstruction",
      "traffic analytics",
      "anomaly alerts",
      "city-wide vehicle intelligence"
    ],
    repository: "jackyhitter / la_peace_SIH",
    githubUrl: "https://github.com/jackyhitter/la_peace_SIH",
    description: "City-scale ANPR and trajectory intelligence. Reconstructing vehicle paths and analyzing traffic networks in real-time.",
    architecture: ["Problem", "Architecture", "AI pipeline", "Backend", "Spatial database", "Trajectory reconstruction", "Traffic intelligence", "Challenges", "Future work"]
  },
  {
    id: "ml-project",
    title: "ML_PROJECT",
    subtitle: "From data → model → prediction → application.",
    type: "featured",
    maturity: "PRODUCTION-STYLE",
    technologies: ["Python", "Scikit-learn", "CatBoost", "Pandas", "NumPy", "Flask", "Jupyter", "AWS Elastic Beanstalk"],
    repository: "jackyhitter / ML_project",
    githubUrl: "https://github.com/jackyhitter/ML_project",
    description: "A first major end-to-end ML project focused on understanding what happens beyond a notebook. Data ingestion to deployed prediction API.",
    architecture: ["Raw Data", "Data Ingestion", "Data Transformation", "Model Training", "Evaluation", "Prediction Pipeline", "Flask Application"]
  },
  {
    id: "networksecurity",
    title: "Network Security",
    subtitle: "Security & Packet Analysis.",
    type: "featured",
    maturity: "RESEARCH",
    technologies: ["Python", "Scapy", "Flask", "Docker", "Networking"],
    repository: "jackyhitter / networksecurity",
    githubUrl: "https://github.com/jackyhitter/networksecurity",
    description: "A deep dive into network security, packet analysis, and building systems to monitor and understand network traffic."
  }
];

export const archiveProjects: Project[] = [
  {
    id: "first-website",
    title: "First Website",
    subtitle: "Where it began",
    type: "archive",
    maturity: "EXPERIMENT",
    technologies: ["HTML", "CSS"],
    repository: "jackyhitter / First-Website",
    githubUrl: "https://github.com/jackyhitter/first-website",
    description: "The initial steps into the web."
  },
  {
    id: "rainbow-box",
    title: "Rainbow-Box",
    subtitle: "Visual experiment",
    type: "experiment",
    maturity: "PLAYGROUND",
    technologies: ["JavaScript", "CSS"],
    repository: "jackyhitter / Rainbow-Box",
    githubUrl: "https://github.com/jackyhitter/Rainbow-Box",
    description: "Learning DOM manipulation and animations."
  },
  {
    id: "ml-specialization",
    title: "Machine Learning Specialization",
    subtitle: "Notes and implementation",
    type: "archive",
    maturity: "LEARNING",
    technologies: ["Python", "Jupyter"],
    repository: "jackyhitter / ML_specialization",
    githubUrl: "https://github.com/jackyhitter",
    description: "Foundations of classical machine learning and neural networks."
  },
  {
    id: "js-beginner-projects",
    title: "JS Beginner Projects",
    subtitle: "Learning in Public",
    type: "learning",
    maturity: "LEARNING",
    technologies: ["HTML", "CSS", "JavaScript", "DOM", "APIs"],
    repository: "jackyhitter / jsBeginnerProjects",
    githubUrl: "https://github.com/jackyhitter/jsBeginnerProjects",
    liveUrl: "https://jackyhitter.github.io/jsBeginnerProjects/",
    description: "A collection of 5 beginner projects built while learning JavaScript fundamentals."
  }
];
