// src/components/LifeStory3D/StoryPoint/StoryPoint.jsx
import React from "react";
import { Text, Html } from "@react-three/drei";
import "./StoryPoint.scss";

export default function StoryPoint({ item, active = false, onSelect = () => { } }) {
    const plateColor = active ? "#ffffff" : "#fbfdff";
    const accent = active ? "rgba(6, 95, 212, 0.08)" : "rgba(15,23,42,0.02)";

    return (
        <group position={item.position} rotation={item.rotation} name={`story-${item.id}`} onClick={() => onSelect(item.id)}>
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[2.2, 0.9, 0.06]} />
                <meshStandardMaterial color={plateColor} metalness={0.05} roughness={0.08} />
            </mesh>

            <mesh position={[0, 0.4, 0.035]}>
                <boxGeometry args={[1.8, 0.12, 0.02]} />
                <meshStandardMaterial color={accent} transparent opacity={0.9} />
            </mesh>

            <Text position={[-0.9, 0.16, 0.08]} font="/fonts/Inter-Bold.woff" fontSize={0.12} maxWidth={1.5} anchorX="left" anchorY="top" color="#0f172a">
                {item.title}
            </Text>

            <Text position={[-0.9, -0.02, 0.08]} font="/fonts/Inter-Regular.woff" fontSize={0.075} maxWidth={1.6} anchorX="left" anchorY="top" color={"rgba(15,23,42,0.7)"}>
                {item.subtitle}
            </Text>

            <Html position={[-0.9, -0.28, 0.08]} transform occlude>
                <div className={`story-body ${active ? "active" : ""}`}>{item.text.trim().slice(0, 220)}{item.text.length > 220 ? "…" : ""}</div>
            </Html>

            <Html position={[0.95, 0.18, 0.08]} distanceFactor={5} transform>
                <div className="crest-placeholder"><div className="crest-inner">ICON</div></div>
            </Html>
        </group>
    );
}
