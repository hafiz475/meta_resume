import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Section3D from './components/Section3D';
import HUD from './components/HUD';
import { sections } from './data/sections';
import './styles/main.scss';
import { useSpring, a } from '@react-spring/three';

function Scene({ index }) {
  const targetRef = useRef({ x: 0, y: 0, z: 8 });
  const camRef = useRef();

  const camSpring = useSpring({
    to: {
      camX: targetRef.current.x,
      camY: targetRef.current.y + 0.2,
      camZ: targetRef.current.z,
      rotY: sections[index].rotationY ?? 0
    },
    config: { mass: 1.4, tension: 140, friction: 28 }
  });

  // Update camera target when index changes
  useEffect(() => {
    const p = sections[index].position;
    targetRef.current = { x: p[0], y: p[1], z: p[2] + 8 };
    document.body.setAttribute('data-section', sections[index].key);
  }, [index]);

  useFrame((state) => {
    const cam = state.camera;
    // read spring values (they are animated refs)
    cam.position.x = camSpring.camX.get();
    cam.position.y = camSpring.camY.get();
    cam.position.z = camSpring.camZ.get();
    cam.rotation.y = camSpring.rotY.get();
    cam.lookAt(
      sections[index].position[0],
      sections[index].position[1],
      sections[index].position[2]
    );
  });

  return (
    <>
      {sections.map((s) => (
        <Section3D
          key={s.key}
          position={s.position}
          title={s.title}
          subtitle={s.subtitle}
          body={s.body}
          className={s.className}
        />
      ))}
      <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
    </>
  );
}

export default function App() {
  const [index, setIndex] = useState(0);
  const isScrolling = useRef(false);

  // Wheel handler to step through sections
  useEffect(() => {
    const onWheel = (e) => {
      if (isScrolling.current) return;
      isScrolling.current = true;

      const dir = Math.sign(e.deltaY);
      setIndex((prev) => {
        const next = Math.min(sections.length - 1, Math.max(0, prev + (dir > 0 ? 1 : -1)));
        return next;
      });

      setTimeout(() => (isScrolling.current = false), 450);
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    return () => window.removeEventListener('wheel', onWheel);
  }, []);

  // Optional: keyboard navigation (ArrowUp / ArrowDown)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowDown') setIndex((i) => Math.min(sections.length - 1, i + 1));
      if (e.key === 'ArrowUp') setIndex((i) => Math.max(0, i - 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <HUD index={index} setIndex={setIndex} />
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <color attach="background" args={['#0b0e14']} />
        <Scene index={index} />
      </Canvas>
    </>
  );
}
