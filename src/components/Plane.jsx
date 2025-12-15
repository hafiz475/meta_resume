import { useGLTF, useAnimations } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export default function Plane() {
    const group = useRef();
    const { scene, animations } = useGLTF('/assets/models/basic_plane.glb');
    const { actions, names } = useAnimations(animations, group);

    useEffect(() => {
        // Keep your favorite initial rotation
        scene.rotation.set(0, Math.PI / 4, 0);

        // No scale down
        scene.scale.set(1, 1, 1);

        // Play plane's builtin animation if it has one
        if (names.length > 0) {
            actions[names[0]].reset().play();
        }
    }, [scene]);

    // Gentle floating animation
    useFrame(({ clock }) => {
        const t = clock.getElapsedTime() * 0.2; // speed control

        if (group.current) {
            group.current.position.x = Math.sin(t) * 2.5;    // horizontal drift
            group.current.position.y = Math.sin(t * 1.5) * 0.8 + 1; // up-down float
            group.current.position.z = Math.cos(t) * 2.5;    // depth movement

            // gentle turning motion
            group.current.rotation.y = Math.sin(t * 0.5) * 0.4 + Math.PI / 4;
            group.current.rotation.x = Math.sin(t * 0.7) * 0.15;
        }
    });

    return (
        <group ref={group}>
            <primitive object={scene} />
        </group>
    );
}
