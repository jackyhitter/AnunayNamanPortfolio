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

// 1. AOT Form (WHAT IS FREEDOM?)
const generateAOTFreedom = () => {
  const points = new Float32Array(PARTICLE_COUNT * 3);
  const edges: number[][][] = [];

  const getTextEdges = (text: string, x: number, y: number, scale: number) => {
    const textEdges: number[][][] = [];
    let cx = x;
    for (const char of text) {
      if (char === ' ') { cx += scale * 0.6; continue; }
      const s = scale;
      const hw = s * 0.6;
      switch (char) {
        case 'W': textEdges.push([[cx,y+s],[cx+s*0.2,y]], [[cx+s*0.2,y],[cx+s*0.3,y+s*0.5]], [[cx+s*0.3,y+s*0.5],[cx+s*0.4,y]], [[cx+s*0.4,y],[cx+s*0.6,y+s]]); cx += s*0.7; break;
        case 'H': textEdges.push([[cx,y],[cx,y+s]], [[cx+hw,y],[cx+hw,y+s]], [[cx,y+s*0.5],[cx+hw,y+s*0.5]]); cx += s*0.7; break;
        case 'A': textEdges.push([[cx,y],[cx+hw/2,y+s]], [[cx+hw/2,y+s],[cx+hw,y]], [[cx+hw*0.2,y+s*0.4],[cx+hw*0.8,y+s*0.4]]); cx += s*0.7; break;
        case 'T': textEdges.push([[cx,y+s],[cx+s*0.7,y+s]], [[cx+s*0.35,y],[cx+s*0.35,y+s]]); cx += s*0.8; break;
        case 'I': textEdges.push([[cx,y],[cx,y+s]]); cx += s*0.3; break;
        case 'S': textEdges.push([[cx,y],[cx+hw,y]], [[cx+hw,y],[cx+hw,y+s*0.5]], [[cx+hw,y+s*0.5],[cx,y+s*0.5]], [[cx,y+s*0.5],[cx,y+s]], [[cx,y+s],[cx+hw,y+s]]); cx += s*0.7; break;
        case 'F': textEdges.push([[cx,y],[cx,y+s]], [[cx,y+s],[cx+hw,y+s]], [[cx,y+s*0.5],[cx+hw*0.8,y+s*0.5]]); cx += s*0.7; break;
        case 'R': textEdges.push([[cx,y],[cx,y+s]], [[cx,y+s],[cx+hw,y+s]], [[cx+hw,y+s],[cx+hw,y+s*0.5]], [[cx+hw,y+s*0.5],[cx,y+s*0.5]], [[cx,y+s*0.5],[cx+hw,y]]); cx += s*0.7; break;
        case 'E': textEdges.push([[cx,y],[cx,y+s]], [[cx,y+s],[cx+hw,y+s]], [[cx,y+s*0.5],[cx+hw*0.8,y+s*0.5]], [[cx,y],[cx+hw,y]]); cx += s*0.7; break;
        case 'D': textEdges.push([[cx,y],[cx,y+s]], [[cx,y+s],[cx+hw*0.7,y+s]], [[cx+hw*0.7,y+s],[cx+hw,y+s*0.7]], [[cx+hw,y+s*0.7],[cx+hw,y+s*0.3]], [[cx+hw,y+s*0.3],[cx+hw*0.7,y]], [[cx+hw*0.7,y],[cx,y]]); cx += s*0.7; break;
        case 'O': textEdges.push([[cx,y],[cx,y+s]], [[cx,y+s],[cx+hw,y+s]], [[cx+hw,y+s],[cx+hw,y]], [[cx+hw,y],[cx,y]]); cx += s*0.7; break;
        case 'M': textEdges.push([[cx,y],[cx,y+s]], [[cx,y+s],[cx+s*0.4,y+s*0.5]], [[cx+s*0.4,y+s*0.5],[cx+s*0.8,y+s]], [[cx+s*0.8,y+s],[cx+s*0.8,y]]); cx += s*0.9; break;
        case '?': textEdges.push([[cx,y+s*0.7],[cx,y+s]], [[cx,y+s],[cx+hw,y+s]], [[cx+hw,y+s],[cx+hw,y+s*0.6]], [[cx+hw,y+s*0.6],[cx+hw*0.5,y+s*0.5]], [[cx+hw*0.5,y+s*0.5],[cx+hw*0.5,y+s*0.3]], [[cx+hw*0.5,y],[cx+hw*0.5,y+s*0.1]]); cx += s*0.7; break;
      }
    }
    return textEdges;
  };
  
  // Center the text. 
  // "WHAT IS" is about 4.2 units wide at scale 0.8
  // "FREEDOM?" is about 5.0 units wide at scale 0.8
  edges.push(...getTextEdges("WHAT IS", -2.1, 0.4, 0.8));
  edges.push(...getTextEdges("FREEDOM?", -2.5, -0.8, 0.8));

  let totalLen = 0;
  const edgeLengths = edges.map(edge => {
    const dx = edge[1][0] - edge[0][0];
    const dy = edge[1][1] - edge[0][1];
    const len = Math.sqrt(dx*dx + dy*dy);
    totalLen += len;
    return len;
  });

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    // 95% on edges to make the text highly readable
    if (i < PARTICLE_COUNT * 0.95) {
      let r = Math.random() * totalLen;
      let edgeIdx = 0;
      while (r > edgeLengths[edgeIdx] && edgeIdx < edges.length - 1) {
        r -= edgeLengths[edgeIdx];
        edgeIdx++;
      }
      
      const edge = edges[edgeIdx];
      const t = r / edgeLengths[edgeIdx];
      const x = edge[0][0] + (edge[1][0] - edge[0][0]) * t;
      const y = edge[0][1] + (edge[1][1] - edge[0][1]) * t;
      
      const noise = 0.05;
      points[i*3] = x + (Math.random() - 0.5) * noise;
      points[i*3+1] = y + (Math.random() - 0.5) * noise;
      points[i*3+2] = (Math.random() - 0.5) * 0.2; 
    } else {
      // 5% ambient floating dust
      points[i*3] = (Math.random() - 0.5) * 6.0;
      points[i*3+1] = (Math.random() - 0.5) * 4.0;
      points[i*3+2] = (Math.random() - 0.5) * 2.0;
    }
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

// 3. Bleach Form (Ichigo TYBW Bankai)
const generateIchigoBankai = () => {
  const points = new Float32Array(PARTICLE_COUNT * 3);
  
  const edges = [
    // Hair spikes
    [[0.3, 2.3], [0.4, 2.7]], [[0.4, 2.7], [0.5, 2.4]],
    [[0.5, 2.4], [0.6, 2.8]], [[0.6, 2.8], [0.7, 2.4]],
    [[0.7, 2.4], [0.9, 2.5]], [[0.9, 2.5], [0.8, 2.1]],
    [[0.8, 2.1], [0.9, 1.9]], [[0.9, 1.9], [0.7, 1.8]],
    [[0.3, 2.3], [0.2, 2.0]], [[0.2, 2.0], [0.4, 1.8]],
    // Face (V-shape)
    [[0.4, 1.8], [0.5, 1.6]], [[0.7, 1.8], [0.5, 1.6]],
    // Neck
    [[0.5, 1.6], [0.5, 1.4]],
    // Shoulders
    [[0.5, 1.4], [0.0, 1.2]], [[0.5, 1.4], [1.0, 1.2]],
    // Left Arm (hanging down on right side of image)
    [[1.0, 1.2], [1.1, 0.6]], [[1.1, 0.6], [1.2, 0.2]],
    [[1.2, 0.2], [1.1, -0.4]], // hand area
    // Right Arm (hanging down on left side)
    [[0.0, 1.2], [-0.1, 0.6]], [[-0.1, 0.6], [-0.2, 0.2]],
    // Torso sides
    [[0.1, 1.2], [0.2, 0.0]], [[0.9, 1.2], [0.8, 0.0]],
    // Shihakusho (cross straps)
    [[0.1, 1.2], [0.8, 0.6]], [[0.9, 1.2], [0.2, 0.6]],
    [[0.2, 0.6], [0.8, 0.0]], [[0.8, 0.6], [0.2, 0.0]],
    // Coat skirt (lower half)
    [[0.2, 0.0], [-0.1, -2.5]], // left outer
    [[0.8, 0.0], [1.3, -2.5]],  // right outer
    // Skirt pleats
    [[0.3, 0.0], [0.2, -2.5]],
    [[0.5, 0.0], [0.6, -2.5]],
    [[0.7, 0.0], [0.9, -2.5]],
    // Sweeping coat/sword on left
    [[-0.1, 0.5], [-1.0, 0.2]], [[-1.0, 0.2], [-2.0, -0.1]], [[-2.0, -0.1], [-2.8, -0.2]],
    [[-2.8, -0.2], [-1.8, -0.6]], [[-1.8, -0.6], [-0.5, -1.0]], [[-0.5, -1.0], [0.1, -0.5]],
    // Secondary sweeping line
    [[0.0, -0.2], [-1.2, -1.2]], [[-1.2, -1.2], [-2.5, -1.8]],
    [[-2.5, -1.8], [-1.2, -2.0]], [[-1.2, -2.0], [0.0, -1.5]]
  ];

  let totalLen = 0;
  const edgeLengths = edges.map(edge => {
    const dx = edge[1][0] - edge[0][0];
    const dy = edge[1][1] - edge[0][1];
    const len = Math.sqrt(dx*dx + dy*dy);
    totalLen += len;
    return len;
  });

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    if (i < PARTICLE_COUNT * 0.9) { // 90% on lines
      let r = Math.random() * totalLen;
      let edgeIdx = 0;
      while (r > edgeLengths[edgeIdx] && edgeIdx < edges.length - 1) {
        r -= edgeLengths[edgeIdx];
        edgeIdx++;
      }
      
      const edge = edges[edgeIdx];
      const t = r / edgeLengths[edgeIdx];
      // Scale down slightly (0.8) to fit within bounds perfectly
      const x = (edge[0][0] + (edge[1][0] - edge[0][0]) * t) * 0.8;
      const y = (edge[0][1] + (edge[1][1] - edge[0][1]) * t) * 0.8;
      
      const noise = 0.03;
      points[i*3] = x + (Math.random() - 0.5) * noise;
      points[i*3+1] = y + (Math.random() - 0.5) * noise;
      points[i*3+2] = (Math.random() - 0.5) * 0.2; 
    } else {
      // 10% volume dust around him (spiritual pressure / reiatsu)
      const angle = Math.random() * Math.PI * 2;
      // Elliptical aura around him
      const radiusX = Math.random() * 2.0;
      const radiusY = Math.random() * 3.0;
      points[i*3] = (Math.cos(angle) * radiusX) * 0.8;
      points[i*3+1] = (Math.sin(angle) * radiusY) * 0.8;
      points[i*3+2] = (Math.random() - 0.5) * 1.5;
    }
  }

  return points;
};

// 4. JJK Form (Gojo / Sukuna Split Face)
const generateGojoSukuna = () => {
  const points = new Float32Array(PARTICLE_COUNT * 3);
  
  const edges = [
    // Center split line
    [[0, 2.5], [0, -2.5]],
    
    // --- LEFT HALF (GOJO) ---
    // Chin/Jaw
    [[0, -1.5], [-0.5, -1.4]], [[-0.5, -1.4], [-1.2, -0.6]], [[-1.2, -0.6], [-1.2, 0.5]],
    // Neck & Shoulder
    [[-0.5, -1.4], [-0.8, -2.5]], [[-0.8, -2.0], [-2.5, -2.5]],
    // Mouth (half)
    [[-0.3, -1.0], [0, -1.0]],
    // Nose (half)
    [[0, -0.5], [-0.2, -0.7]], [[-0.2, -0.7], [0, -0.7]],
    // Gojo Eye
    [[-0.8, 0.2], [-0.4, 0.1]], [[-0.4, 0.1], [-0.3, 0.4]], [[-0.3, 0.4], [-0.8, 0.5]], [[-0.8, 0.5], [-0.8, 0.2]],
    [[-0.6, 0.3], [-0.5, 0.3]], // iris
    // Gojo Eyebrow
    [[-0.9, 0.7], [-0.2, 0.6]],
    // Gojo Hair (Flowing, spiky)
    [[-1.2, 0.5], [-1.8, 1.0]], [[-1.8, 1.0], [-1.4, 1.2]], [[-1.4, 1.2], [-2.2, 1.8]],
    [[-2.2, 1.8], [-1.5, 2.0]], [[-1.5, 2.0], [-2.0, 2.5]], [[-2.0, 2.5], [-1.0, 2.4]],
    [[-1.0, 2.4], [-1.2, 3.0]], [[-1.2, 3.0], [-0.5, 2.6]], [[-0.5, 2.6], [-0.2, 3.2]],
    [[-0.2, 3.2], [0, 2.8]],
    
    // --- RIGHT HALF (SUKUNA) ---
    // Chin/Jaw
    [[0, -1.5], [0.5, -1.4]], [[0.5, -1.4], [1.2, -0.6]], [[1.2, -0.6], [1.2, 0.5]],
    // Neck & Shoulder (Right)
    [[0.5, -1.4], [0.8, -2.5]], [[0.8, -2.0], [2.5, -2.5]],
    // Mouth (half, with smirk)
    [[0, -1.0], [0.4, -0.9]],
    // Sukuna Eye
    [[0.8, 0.1], [0.4, 0.2]], [[0.4, 0.2], [0.3, 0.5]], [[0.3, 0.5], [0.8, 0.5]], [[0.8, 0.5], [0.8, 0.1]],
    [[0.6, 0.3], [0.5, 0.3]], // iris
    // Sukuna Eyebrow
    [[0.9, 0.7], [0.2, 0.7]],
    // Sukuna Extra Eye (underneath)
    [[0.8, -0.2], [0.6, -0.1]], [[0.6, -0.1], [0.8, 0.0]],
    // Sukuna Markings
    [[0.2, 1.2], [0.4, 0.9]], [[0.4, 0.9], [0.3, 1.0]], [[0.3, 1.0], [0.2, 1.2]], // forehead
    [[0.5, -0.1], [1.2, -0.3]], [[0.5, -0.5], [1.1, -0.5]], // cheeks
    [[0.2, -1.2], [0.8, -1.1]], // jaw mark
    [[0, -1.3], [0.2, -1.3]], // chin mark
    [[0, -0.4], [0.3, -0.4]], // nose mark
    // Sukuna Hair (Upward spikes)
    [[1.2, 0.5], [1.6, 0.8]], [[1.6, 0.8], [1.3, 1.2]], [[1.3, 1.2], [1.8, 1.5]],
    [[1.8, 1.5], [1.4, 1.8]], [[1.4, 1.8], [1.9, 2.2]], [[1.9, 2.2], [1.5, 2.4]],
    [[1.5, 2.4], [1.8, 2.8]], [[1.8, 2.8], [1.2, 2.6]], [[1.2, 2.6], [1.4, 3.0]],
    [[1.4, 3.0], [0.8, 2.8]], [[0.8, 2.8], [0.5, 3.2]], [[0.5, 3.2], [0, 2.8]]
  ];

  let totalLen = 0;
  const edgeLengths = edges.map(edge => {
    const dx = edge[1][0] - edge[0][0];
    const dy = edge[1][1] - edge[0][1];
    const len = Math.sqrt(dx*dx + dy*dy);
    totalLen += len;
    return len;
  });

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    let r = Math.random() * totalLen;
    let edgeIdx = 0;
    while (r > edgeLengths[edgeIdx] && edgeIdx < edges.length - 1) {
      r -= edgeLengths[edgeIdx];
      edgeIdx++;
    }
    
    const edge = edges[edgeIdx];
    const t = r / edgeLengths[edgeIdx];
    
    // Scale down slightly (0.75) to fit the viewport
    const x = (edge[0][0] + (edge[1][0] - edge[0][0]) * t) * 0.75;
    const y = (edge[0][1] + (edge[1][1] - edge[0][1]) * t) * 0.75;
    
    // Thematic detail: Gojo's side (left) is smoother/calmer, Sukuna's side (right) is slightly more chaotic
    const baseNoise = 0.025;
    const extraNoise = (x > 0) ? 0.03 : 0.0; 
    const noise = baseNoise + extraNoise;

    points[i*3] = x + (Math.random() - 0.5) * noise;
    points[i*3+1] = y + (Math.random() - 0.5) * noise;
    
    // Z-depth: left side is flat, right side is jagged
    points[i*3+2] = (x > 0) ? (Math.random() - 0.5) * 0.5 : (Math.random() - 0.5) * 0.1;
  }

  return points;
};

export const particleForms: ParticleForm[] = [
  { id: 'aot', label: '01 / AOT', points: generateAOTFreedom() },
  { id: 'onepiece', label: '02 / ONE PIECE', points: generateHat() },
  { id: 'bleach', label: '03 / BLEACH', points: generateIchigoBankai() },
  { id: 'jjk', label: '04 / JJK', points: generateGojoSukuna() },
];
