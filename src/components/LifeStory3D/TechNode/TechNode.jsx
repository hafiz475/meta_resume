// src/components/LifeStory3D/TechNode/TechNode.jsx
import React from "react";

export default function TechNode({ tech, angle = 0, radius = 2.4, height = 0.6, onSelect = () => { } }) {
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = height;

    return (
        <group position={[x, y, z]} onClick={() => onSelect(tech.id)}>
            <mesh>
                <sphereGeometry args={[0.12, 12, 12]} />
                <meshStandardMaterial color={"#eef2ff"} metalness={0.02} roughness={0.06} />
            </mesh>
        </group>
    );
}
