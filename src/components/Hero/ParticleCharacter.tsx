import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { particleForms } from '../../data/particleForms';

const ParticleCharacter = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentFormIndex, setCurrentFormIndex] = useState(1);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 6.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Performance
    container.appendChild(renderer.domElement);

    // Particles setup
    const particleCount = particleForms[0].points.length / 3;
    const geometry = new THREE.BufferGeometry();
    
    // We need current positions, target positions, and velocities
    const positions = new Float32Array(particleForms[0].points);
    const velocities = new Float32Array(particleCount * 3).fill(0);
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    // Custom shader material for points
    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    points.position.x = 0.3; // Shift slightly right to prevent left edge clipping
    scene.add(points);

    // Mouse interaction
    const mouse = new THREE.Vector2(-1000, -1000);
    const targetMouse = new THREE.Vector2(-1000, -1000);
    
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      // Normalize to -1 to +1
      targetMouse.x = ((e.clientX - rect.left) / width) * 2 - 1;
      targetMouse.y = -((e.clientY - rect.top) / height) * 2 + 1;
    };
    
    const onMouseLeave = () => {
      targetMouse.x = -1000;
      targetMouse.y = -1000;
    };

    window.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth mouse
      mouse.x += (targetMouse.x - mouse.x) * 0.1;
      mouse.y += (targetMouse.y - mouse.y) * 0.1;

      // Project mouse to 3D space loosely (at z=0)
      // Camera is at z=5, field of view 75
      const vFOV = THREE.MathUtils.degToRad(camera.fov);
      const viewHeight = 2 * Math.tan(vFOV / 2) * camera.position.z;
      const viewWidth = viewHeight * camera.aspect;
      
      const mouse3D = new THREE.Vector3(
        mouse.x * viewWidth / 2,
        mouse.y * viewHeight / 2,
        0
      );

      const positions = points.geometry.attributes.position.array as Float32Array;

      // Update target positions if form changed
      const currentTargetPoints = particleForms[currentFormIndex].points;

      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        
        // Current position
        const px = positions[idx];
        const py = positions[idx + 1];
        const pz = positions[idx + 2];
        
        // Base Target position
        let tx = currentTargetPoints[idx];
        let ty = currentTargetPoints[idx + 1];
        let tz = currentTargetPoints[idx + 2];

        // Interaction (Scatter)
        const dx = px - mouse3D.x;
        const dy = py - mouse3D.y;
        const distSq = dx * dx + dy * dy;
        const interactRadius = 1.5;
        
        if (distSq < interactRadius * interactRadius && targetMouse.x !== -1000) {
          const force = (interactRadius - Math.sqrt(distSq)) / interactRadius;
          tx += (dx / Math.sqrt(distSq)) * force * 2;
          ty += (dy / Math.sqrt(distSq)) * force * 2;
          tz += (Math.random() - 0.5) * force * 2;
        }

        // Spring physics
        const spring = 0.05;
        const damp = 0.85;

        // Force to target
        const ax = (tx - px) * spring;
        const ay = (ty - py) * spring;
        const az = (tz - pz) * spring;

        velocities[idx] = (velocities[idx] + ax) * damp;
        velocities[idx + 1] = (velocities[idx + 1] + ay) * damp;
        velocities[idx + 2] = (velocities[idx + 2] + az) * damp;

        // Apply noise occasionally or slowly
        velocities[idx] += (Math.random() - 0.5) * 0.01;
        velocities[idx + 1] += (Math.random() - 0.5) * 0.01;

        positions[idx] += velocities[idx];
        positions[idx + 1] += velocities[idx + 1];
        positions[idx + 2] += velocities[idx + 2];
      }

      points.geometry.attributes.position.needsUpdate = true;
      
      // Slowly rotate the whole system slightly for depth
      points.rotation.y = Math.sin(clock.elapsedTime * 0.5) * 0.1;
      points.rotation.x = Math.cos(clock.elapsedTime * 0.3) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mouseleave', onMouseLeave);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [currentFormIndex]);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="absolute inset-0 cursor-crosshair"></div>
      
      <div className="absolute bottom-12 right-12 z-10 font-mono text-tiny text-dim flex items-center gap-4">
        <span>CURRENT FORM</span>
        <span className="text-white border-b border-[#27272a] pb-1">{particleForms[currentFormIndex].label}</span>
        
        <div className="relative group/btn ml-2 flex items-center">
          <button 
            onClick={() => setCurrentFormIndex((prev) => (prev + 1) % particleForms.length)}
            className="hover:text-accent transition-colors relative z-10 border border-[#27272a] px-3 py-1 bg-[#0c0c0c] hover:border-accent"
            onMouseEnter={() => {
              if (!window.sessionStorage.getItem('egg_polyjuice')) {
                window.dispatchEvent(new CustomEvent('easter-egg-found', { detail: { name: 'Polyjuice Potion Egg' } }));
                window.sessionStorage.setItem('egg_polyjuice', 'true');
              }
            }}
          >
            CHANGE
          </button>

          {/* Finger pointer pointing at the button from the right */}
          <span className="absolute -right-8 text-accent animate-pulse group-hover/btn:opacity-0 transition-opacity text-2xl select-none pointer-events-none">
            ☜
          </span>
        </div>
      </div>
    </div>
  );
};

export default ParticleCharacter;
