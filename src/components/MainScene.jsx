// src/components/MainScene.jsx
import { Canvas, useThree } from '@react-three/fiber';
import { Suspense, useEffect, useRef } from 'react';
import { Sky } from '@react-three/drei';
import gsap from 'gsap';

import Plane from './Plane';
// import Clouds from './Clouds';
// import CloudGLB from './CloudGLB';
import CloudStream from './CloudStream';
import HudText from './HudText';

function SceneContent({ section }) {
  const { camera, size } = useThree();
  const isMobile = size.width < 768;

  useEffect(() => {
    // Initial Camera Intro Animation (3 seconds)
    // Setup initial position (e.g., lower and centered)
    camera.position.set(0, -2, 8);

    const tl = gsap.timeline();

    // Animation 1: Move Up (5s)
    tl.to(camera.position, {
      y: 1.5,
      z: 6,
      duration: 5,
      ease: "power1.inOut"
    });

    // Animation 2: Move Right slightly (5s) - ONLY ON DESKTOP
    tl.to(camera.position, {
      x: isMobile ? 0 : 2,
      duration: 5,
      ease: "power1.inOut"
    });

  }, [camera]);

  // Responsive adjustments for the plane or camera based on aspect ratio
  useEffect(() => {
    if (isMobile) {
      camera.fov = 60;
    } else {
      camera.fov = 45;
    }
    camera.updateProjectionMatrix();
  }, [isMobile, camera]);

  return (
    <>
      {/* nice sky gradient */}
      <Sky
        distance={450000}
        sunPosition={[1, 1, 0]}
        inclination={0.49}   // sun height
        azimuth={0.25}
        turbidity={6}
        rayleigh={2}
      />

      {/* subtle fog for depth (optional) */}
      <fog attach="fog" args={['#eaf1ff', 6, 20]} />

      {/* Soft lights */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />

      <Suspense fallback={null}>
        {/* Clouds placed behind plane (z negative) */}
        <CloudStream maxClouds={24} />
        {/* Centered, small plane */}
        <Plane />
        <HudText />
      </Suspense>
    </>
  );
}

export default function MainScene({ section }) {
  return (
    <Canvas camera={{ position: [0, 1.5, 6], fov: 45 }}>
      <SceneContent section={section} />
    </Canvas>
  );
}
