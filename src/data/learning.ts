export type LearningTrack = {
  id: string;
  title: string;
  provider: string;
  type: 'free' | 'paid';
  platform?: string;
  duration: string;
  lectures?: string;
  sections?: string;
  url: string;
  primaryFocus?: string;
  focus: string[];
  description: string;
  journey: string[]; // sequential learning path within the course
};

export const learningTracks: LearningTrack[] = [
  {
    id: 'love-babbar',
    title: "Complete C++ Programming Tutorial",
    provider: "Love Babbar / CodeHelp",
    type: 'free',
    platform: 'YouTube',
    duration: "3 months",
    url: "https://www.youtube.com/watch?v=Z2oxGj36vZk",
    description: "C++ foundation — the language that powers all the DSA and competitive programming that followed.",
    focus: ['C++ Fundamentals', 'Control Flow', 'Functions', 'Arrays', 'Strings', 'Pointers', 'Dynamic Memory', 'References', 'Number Systems', 'Bitwise Operators', 'Patterns', 'Type Casting', 'Problem Solving'],
    journey: ['C++', 'Programming Basics', 'Problem Solving Foundation']
  },
  {
    id: 'striver',
    title: "Striver's A2Z DSA Sheet",
    provider: "Take U Forward",
    type: 'free',
    platform: 'TakeUForward',
    duration: "474 problems",
    url: "https://takeuforward.org/dsa/strivers-a2z-sheet-learn-dsa-a-to-z",
    description: "Structured DSA roadmap covering everything from basics through arrays, trees, graphs, DP, tries and advanced problem solving.",
    focus: ['Arrays', 'Strings', 'Binary Search', 'Linked Lists', 'Recursion', 'Stack / Queue', 'Sliding Window', 'Trees', 'BST', 'Heaps', 'Greedy', 'Graphs', 'Dynamic Programming', 'Tries', 'Bit Manipulation'],
    journey: ['Basics', 'Arrays', 'Sorting', 'Binary Search', 'Recursion', 'Trees', 'Graphs', 'DP', 'Advanced']
  },
  {
    id: 'krish-naik',
    title: "Complete Data Science, ML, DL, NLP Bootcamp",
    provider: "Krish Naik",
    type: 'paid',
    platform: 'Udemy',
    duration: "101h 27m",
    lectures: "436 lectures",
    sections: "64 sections",
    url: "https://www.udemy.com/course/complete-machine-learning-nlp-bootcamp-mlops-deployment/",
    description: "End-to-end data science and machine learning — from Python fundamentals through deep learning, NLP, and MLOps deployment.",
    focus: ['Python', 'Statistics', 'EDA', 'Machine Learning', 'Feature Engineering', 'Model Evaluation', 'Deep Learning', 'NLP', 'MLOps', 'Deployment', 'MLflow', 'DVC', 'Mathematical Foundations'],
    journey: ['Python', 'Statistics', 'EDA', 'ML', 'DL', 'NLP', 'MLOps']
  },
  {
    id: 'hitesh',
    title: "Complete Web Development Course",
    provider: "Hitesh Choudhary",
    type: 'paid',
    platform: 'Udemy',
    duration: "99h 48m",
    lectures: "331 lectures",
    sections: "36 sections",
    url: "https://www.udemy.com/course/web-dev-master/",
    primaryFocus: 'BACKEND',
    description: "Full-stack engineering — approached primarily for backend architecture, APIs, databases and deployment.",
    focus: ['Node.js', 'Express', 'REST APIs', 'MongoDB', 'Authentication', 'Backend Architecture', 'Deployment', 'Docker', 'HTML', 'CSS', 'JavaScript', 'React', 'Tailwind', 'Git', 'Prisma', 'MERN'],
    journey: ['HTML/CSS', 'JavaScript', 'Node.js', 'Express', 'MongoDB', 'APIs', 'Auth', 'Deploy']
  }
];

// The evolution timeline connecting all learning
export const learningEvolution = [
  { label: 'C++', source: 'love-babbar' },
  { label: 'DSA', source: 'striver' },
  { label: 'LeetCode', source: 'striver' },
  { label: 'Python', source: 'krish-naik' },
  { label: 'Data Science', source: 'krish-naik' },
  { label: 'Machine Learning', source: 'krish-naik' },
  { label: 'Backend', source: 'hitesh' },
  { label: 'Systems', source: 'hitesh' },
];
