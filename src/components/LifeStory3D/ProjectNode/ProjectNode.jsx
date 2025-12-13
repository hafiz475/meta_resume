// src/components/LifeStory3D/ProjectNode/ProjectNode.jsx
import React from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

export default function ProjectNode({ project, active = false, onSelect = () => { } }) {
    let logoTexture = null;
    try {
        if (project.logo) {
            // expects public path: /assets/logos/yourlogo.png
            logoTexture = useLoader(THREE.TextureLoader, project.logo);
        }
    } catch (e) {
        logoTexture = null;
    }

    return (
        <group position={project.position} rotation={project.rotation} onClick={() => onSelect(project.id)} name={`project-${project.id}`}>
            <mesh>
                <sphereGeometry args={[0.42, 32, 32]} />
                <meshStandardMaterial color={active ? "#ffffff" : "#fbfdff"} metalness={0.04} roughness={0.08} />
            </mesh>

            <group position={[0, 0.46, 0]}>
                <mesh>
                    <planeGeometry args={[0.7, 0.32]} />
                    <meshStandardMaterial map={logoTexture} transparent opacity={logoTexture ? 1 : 0.9} color={logoTexture ? undefined : "#f3f4f6"} />
                </mesh>
            </group>

            <group position={[0, -0.65, 0]}>
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[0.86, 0.22, 0.02]} />
                    <meshStandardMaterial color={"#fbfdff"} metalness={0.02} roughness={0.06} />
                </mesh>
            </group>
        </group>
    );
}
