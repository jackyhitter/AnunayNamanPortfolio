// Generate abstract point clouds for the particle morphs
// We'll generate 5000 points for each form.

const PARTICLE_COUNT = 5000;

export type ParticleForm = {
  id: string;
  label: string;
  points: Float32Array;
};

// Helper: Random point in circle
const randomInCircle = (radius: number) => {
  const r = radius * Math.sqrt(Math.random());
  const theta = Math.random() * 2 * Math.PI;
  return { x: r * Math.cos(theta), y: r * Math.sin(theta) };
};

// 1. AOT Wing (Abstract sweeping shape)
const generateWing = () => {
  const points = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const t = Math.random();
    const curveX = t * 4 - 2;
    const curveY = Math.pow(t, 2) * 4 - 1;
    // Add noise and spread
    const spread = (1 - t) * 0.5 + 0.1;
    const nx = curveX + (Math.random() - 0.5) * spread;
    const ny = curveY + (Math.random() - 0.5) * spread;
    const nz = (Math.random() - 0.5) * 0.5;
    
    points[i * 3] = nx;
    points[i * 3 + 1] = ny;
    points[i * 3 + 2] = nz;
  }
  return points;
};

// 2. Straw Hat (Dome + brim)
const generateHat = () => {
  const points = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    if (i < PARTICLE_COUNT * 0.4) {
      // Brim
      const { x, y } = randomInCircle(3);
      points[i * 3] = x;
      points[i * 3 + 1] = (Math.random() - 0.5) * 0.2 - 0.5;
      points[i * 3 + 2] = y; // using y from circle as z in 3D
    } else {
      // Dome
      const u = Math.random() * Math.PI;
      const v = Math.random() * Math.PI;
      const r = 1.5;
      points[i * 3] = r * Math.cos(u) * Math.sin(v);
      points[i * 3 + 1] = Math.abs(r * Math.cos(v)) - 0.5;
      points[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
    }
  }
  return points;
};

// 3. Sword (Long thin shape)
const generateSword = () => {
  const points = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const y = (Math.random() - 0.5) * 6; // length 6
    const width = y > 2 ? (3 - y) * 0.1 : 0.2; // point at the top
    const x = (Math.random() - 0.5) * width;
    points[i * 3] = x;
    points[i * 3 + 1] = y;
    points[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
  }
  return points;
};

// 4. Chaos / Cursed Energy (JJK) - swirling vortex
const generateChaos = () => {
  const points = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const t = i / PARTICLE_COUNT;
    const angle = t * Math.PI * 10;
    const radius = t * 2 + (Math.random() * 0.5);
    points[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 0.5;
    points[i * 3 + 1] = Math.sin(angle) * radius + (Math.random() - 0.5) * 0.5;
    points[i * 3 + 2] = (Math.random() - 0.5) * 2;
  }
  return points;
};

export const particleForms: ParticleForm[] = [
  { id: 'aot', label: '01 / AOT', points: generateWing() },
  { id: 'onepiece', label: '02 / ONE PIECE', points: generateHat() },
  { id: 'bleach', label: '03 / BLEACH', points: generateSword() },
  { id: 'jjk', label: '04 / JJK', points: generateChaos() },
];
