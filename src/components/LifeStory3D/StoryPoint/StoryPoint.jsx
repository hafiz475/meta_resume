// src/components/LifeStory3D/StoryPoint/StoryPoint.jsx
import React from "react";
import { Text, Html } from "@react-three/drei";
import LottieFallback from "../../Shared/LottieFallback";
import "./StoryPoint.scss";

export default function StoryPoint({ item, active = false, onSelect = () => { } }) {
    const plateColor = active ? "#ffffff" : "#fbfdff";
    const accent = active ? "rgba(6, 95, 212, 0.08)" : "rgba(15,23,42,0.02)";

    return (
        <group position={item.position} rotation={item.rotation} name={`story-${item.id}`} onClick={() => onSelect(item.id)}>
            {/* smaller base plate */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[1.6, 0.6, 0.04]} />
                <meshStandardMaterial color={plateColor} metalness={0.03} roughness={0.08} />
            </mesh>

            {/* subtle accent strip */}
            <mesh position={[0, 0.31, 0.03]}>
                <boxGeometry args={[1.2, 0.08, 0.02]} />
                <meshStandardMaterial color={accent} transparent opacity={0.9} />
            </mesh>

            {/* title */}
            <Text position={[-0.7, 0.12, 0.05]} font="/fonts/Inter-Bold.woff" fontSize={0.09} maxWidth={1.2} anchorX="left" anchorY="top" color="#0f172a">
                {item.title}
            </Text>

            {/* subtitle */}
            <Text position={[-0.7, -0.02, 0.05]} font="/fonts/Inter-Regular.woff" fontSize={0.055} maxWidth={1.2} anchorX="left" anchorY="top" color={"rgba(15,23,42,0.7)"}>
                {item.subtitle}
            </Text>

            <Html position={[-0.7, -0.22, 0.05]} transform occlude>
                <div className={`story-body ${active ? "active" : ""}`}>{item.text.trim().slice(0, 160)}{item.text.length > 160 ? "…" : ""}</div>
            </Html>

            {/* Lottie crest: uses LottieFallback and expects /assets/lotties/... to be accessible (public) */}
            <Html position={[0.75, 0.12, 0.05]} distanceFactor={6} transform>
                <div style={{ width: 60, height: 60 }}>
                    <LottieFallback src={item.icon} style={{ width: "100%", height: "100%" }} />
                </div>
            </Html>
        </group>
    );
}
