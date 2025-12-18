//src/components/Plane.jsx

import { useGLTF, useAnimations } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export default function Plane() {
  const group = useRef();
  const { scene, animations } = useGLTF('/assets/models/gottfried_freiherr_von_banfields_seaplane.glb');
  const { actions, names } = useAnimations(animations, group);

  // Track animation state to prevent spamming
  const isSpinning = useRef(false);

  useEffect(() => {
    // Center the model properly
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    scene.position.sub(center);

    // 🔹 Make plane smaller (adjust this value only)
    scene.scale.set(1, 1, 1);

    // Keep your preferred rotation
    scene.rotation.set(0, Math.PI / 2, 0);

    // Improve texture quality
    scene.traverse((child) => {
      if (child.isMesh && child.material.map) {
        child.material.map.encoding = THREE.sRGBEncoding;
        child.material.map.anisotropy = 16;
      }
    });

    // Play animation only if you want (optional)
    if (names.length > 0) {
      actions[names[0]].play();
    }
  }, [scene]);

  const handlePlaneClick = (e) => {
    e.stopPropagation(); // Prevent clicking through to other things

    if (isSpinning.current) return;

    isSpinning.current = true;

    // 360 Degree Barrel Roll (Rotation around X axis since plane flies along X)
    gsap.to(group.current.rotation, {
      x: group.current.rotation.x + Math.PI * 2,
      duration: 3,
      ease: "power1.inOut",
      onComplete: () => {
        isSpinning.current = false;
        // Reset to keep numbers clean (optional, but good for float precision eventually)
        // group.current.rotation.x = group.current.rotation.x % (Math.PI * 2);
      }
    });
  };

  return (
    <group
      ref={group}
      position={[0, 0, 0]}
      onClick={handlePlaneClick}
      onPointerOver={() => document.body.style.cursor = 'pointer'}
      onPointerOut={() => document.body.style.cursor = 'auto'}
    >
      <primitive object={scene} />
    </group>
  );
}
