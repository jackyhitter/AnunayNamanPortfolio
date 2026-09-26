export type Film = {
  title: string;
  year: number;
  type: string;
  note: string;
  category: 'WATCHED' | 'REWATCH' | 'MASTERPIECES';
};

export const films: Film[] = [
  {
    title: "Interstellar",
    year: 2014,
    type: "Film",
    note: "Time, relativity, and the limits of human connection.",
    category: "MASTERPIECES"
  },
  {
    title: "Blade Runner 2049",
    year: 2017,
    type: "Film",
    note: "Atmosphere as a storytelling device. A visual marvel.",
    category: "REWATCH"
  },
  {
    title: "Oppenheimer",
    year: 2023,
    type: "Film",
    note: "The weight of building systems that change everything.",
    category: "WATCHED"
  }
];
