import React, { useRef, useState, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

// Same font as HudText name display
const CAVEAT_URL = "/assets/fonts/Caveat-Regular.ttf";

export default function StoryText3D({ isStoryDone }) {
    const { camera, size } = useThree();
    const groupRef = useRef();

    // Animation State: 0 = Hidden, 1 = Visible
    const animState = useRef(0);
    const [startAnim, setStartAnim] = useState(false);

    // Start animation after camera settles (3.5 seconds delay)
    useEffect(() => {
        const timer = setTimeout(() => {
            setStartAnim(true);
        }, 3500);
        return () => clearTimeout(timer);
    }, []);

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        // Animate the state value from 0 to 1
        if (startAnim && animState.current < 1) {
            animState.current += delta * 0.4; // Fade in
            if (animState.current > 1) animState.current = 1;
        }

        // Lock to camera for HUD-like behavior
        groupRef.current.position.copy(camera.position);
        groupRef.current.quaternion.copy(camera.quaternion);

        // Position: MATCHING HUD TEXT (from HudText.jsx)
        let targetX = 1.2;
        let targetY = -0.6;
        let targetZ = -3;

        // Mobile adjustments
        if (size.width < 768) {
            targetX = 0.2;
            targetY = -1.8;
            targetZ = -5;
        }

        // Start position (hidden below)
        const startY = -4.0;

        // Ease out animation
        const t = animState.current;
        const easeT = 1 - Math.pow(1 - t, 3);
        const currentY = THREE.MathUtils.lerp(startY, targetY, easeT);

        groupRef.current.translateX(targetX);
        groupRef.current.translateY(currentY);
        groupRef.current.translateZ(targetZ);
    });

    const textProps = {
        font: CAVEAT_URL,
        fontSize: 0.15,
        lineHeight: 1.2,
        letterSpacing: 0.02,
        anchorX: "center", // Center alignment for the group
        anchorY: "middle",
        textAlign: "center",
    };

    return (
        <group ref={groupRef}>
            {/* Light to illuminate the text */}
            <pointLight position={[0, 1, 2]} intensity={2} distance={5} decay={2} color="#ffffff" />

            {!isStoryDone ? (
                // --- PHASE 1: STORY ---
                <group position={[0, 0, 0]}> {/* Local offsets relative to the HudText group position */}
                    <Text {...textProps} fontSize={0.22} position={[0, 0.4, 0]}>
                        From Torque to TypeScript
                        <meshStandardMaterial color="#ffffff" roughness={0.5} metalness={0.2} />
                    </Text>
                    <Text {...textProps} position={[0, 0.1, 0]}>
                        Started as a Mechanical Engineer at Royal Enfield
                        <meshStandardMaterial color="#ffffff" roughness={0.6} metalness={0.1} />
                    </Text>
                    <Text {...textProps} position={[0, -0.1, 0]}>
                        Now crafting WhatsApp CRM tools at Bizmagnets
                        <meshStandardMaterial color="#ffffff" roughness={0.6} metalness={0.1} />
                    </Text>
                </group>
            ) : (
                // --- PHASE 2: HI ---
                <Text font={CAVEAT_URL} fontSize={0.5} position={[0, 0, 0]} anchorX="center" anchorY="middle">
                    Hi!
                    <meshStandardMaterial color="#ffffff" roughness={0.5} metalness={0.2} />
                </Text>
            )}
        </group>
    );
}
