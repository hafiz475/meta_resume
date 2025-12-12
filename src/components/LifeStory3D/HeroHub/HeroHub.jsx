// src/components/LifeStory3D/HeroHub/HeroHub.jsx
import React from "react";
import { Text, Html } from "@react-three/drei";
import "./HeroHub.scss";

export default function HeroHub({ name = "J Md Hafizur Rahman", position = [0, 1, 0] }) {
    return (
        <group position={position} name="HeroHub">
            <mesh name="hub-core">
                <sphereGeometry args={[0.55, 48, 48]} />
                <meshStandardMaterial metalness={0.15} roughness={0.12} envMapIntensity={0.6} color={"#f8fafc"} />
            </mesh>

            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
                <torusGeometry args={[0.9, 0.02, 16, 120]} />
                <meshStandardMaterial transparent opacity={0.65} roughness={0.03} metalness={0.1} color={"#f3f4f6"} />
            </mesh>

            <Text position={[0, 0.95, 0]} font="/fonts/Inter-Bold.woff" fontSize={0.13} maxWidth={2.4} textAlign="center" anchorX="center" anchorY="middle" color="#0f172a">
                {name}
            </Text>

            <Html position={[0, 0.78, 0]} center>
                <div className="hub-subtitle">Full-stack engineer • React · Node · Systems</div>
            </Html>
        </group>
    );
}
