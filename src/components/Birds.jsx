import { useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function Bird({ position, speed, factor, phase, scale }) {
    const mesh = useRef();

    useFrame((state, delta) => {
        if (!mesh.current) return;

        // Movement: Fly forward (+X)
        mesh.current.position.x += speed * delta * 60;
        mesh.current.position.y += Math.sin(state.clock.elapsedTime * factor + phase) * 0.01;
        mesh.current.position.z += Math.cos(state.clock.elapsedTime * factor + phase) * 0.01;

        // Wing flapping
        const wingRotation = Math.sin(state.clock.elapsedTime * 15 * factor) * 0.8;
        if (mesh.current.children[0]) mesh.current.children[0].rotation.z = -wingRotation; // Left
        if (mesh.current.children[1]) mesh.current.children[1].rotation.z = wingRotation;  // Right

        // Loop back
        if (mesh.current.position.x > 35) {
            mesh.current.position.x = -35;
        }
    });

    return (
        <group ref={mesh} position={position} scale={[scale, scale, scale]} rotation={[0, Math.PI / 2, 0]}>
            {/* Left Wing */}
            <mesh position={[-0.05, 0, 0.08]} rotation={[Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.2, 0.1]} />
                <meshStandardMaterial color="#111" side={THREE.DoubleSide} />
            </mesh>
            {/* Right Wing */}
            <mesh position={[-0.05, 0, -0.08]} rotation={[Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.2, 0.1]} />
                <meshStandardMaterial color="#111" side={THREE.DoubleSide} />
            </mesh>
            {/* Body */}
            <mesh position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
                <coneGeometry args={[0.03, 0.2, 4]} />
                <meshStandardMaterial color="#000" />
            </mesh>
        </group>
    );
}

export default function Birds() {
    const birdsCount = 10;
    const birds = useMemo(() => {
        return new Array(birdsCount).fill().map((_, i) => ({
            position: [
                -25 - Math.random() * 15, // Start further back
                0 + Math.random() * 2,   // Float height
                -4 - Math.random() * 6   // Side distance
            ],
            speed: 0.12 + Math.random() * 0.08,
            factor: 0.6 + Math.random() * 0.4,
            phase: Math.random() * Math.PI,
            scale: 0.7 + Math.random() * 0.4
        }));
    }, []);

    return (
        <group name="birds-flock">
            {birds.map((props, i) => (
                <Bird key={i} {...props} />
            ))}
        </group>
    );
}
