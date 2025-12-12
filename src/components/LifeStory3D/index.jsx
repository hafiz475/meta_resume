// src/components/LifeStory3D/index.jsx
import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import CameraRig from "./CameraRig";
import HeroHub from "./HeroHub/HeroHub";
import StoryPoint from "./StoryPoint/StoryPoint";
import TechNode from "./TechNode/TechNode";
import ProjectNode from "./ProjectNode/ProjectNode";
import SpiralRibbon from "./SpiralRibbon/SpiralRibbon";
import HomeOverlay from "./HomeOverlay/HomeOverlay";
import ControlsUI from "./ControlsUI/ControlsUI";
import "./index.scss";

import { lifeStory } from "../../data/lifeStory";
import { techStack } from "../../data/techStack";
import { projects } from "../../data/projects";

export default function LifeStory3D() {
    const [activeStory, setActiveStory] = useState(null);
    const [activeProject, setActiveProject] = useState(null);
    const [cameraTarget, setCameraTarget] = useState([0, 1.4, 6.5]);
    const [cameraLookAt, setCameraLookAt] = useState([0, 1, 0]);

    const selectStory = (id) => {
        const item = lifeStory.find((d) => d.id === id);
        if (!item) return;
        setActiveStory(id);
        setActiveProject(null);
        setCameraTarget([item.position[0], item.position[1] + 0.3, item.position[2] + 2.0]);
        setCameraLookAt(item.position);
    };

    const selectProject = (id) => {
        const item = projects.find((d) => d.id === id);
        if (!item) return;
        setActiveProject(id);
        setActiveStory(null);
        setCameraTarget([item.position[0], item.position[1] + 0.45, item.position[2] + 2.1]);
        setCameraLookAt(item.position);
    };

    const goHome = () => {
        setActiveStory(null);
        setActiveProject(null);
        setCameraTarget([0, 1.4, 6.5]);
        setCameraLookAt([0, 1, 0]);
    };

    return (
        <div className="lifescene-root">
            <Canvas camera={{ position: [0, 1.4, 6.5], fov: 50 }}>
                <ambientLight intensity={0.9} />
                <directionalLight position={[2, 5, 2]} intensity={0.6} />
                <CameraRig cameraTarget={cameraTarget} cameraLookAt={cameraLookAt} />

                <HeroHub position={[0, 1, 0]} />

                <SpiralRibbon />

                {lifeStory.map((item) => (
                    <StoryPoint key={item.id} item={item} active={activeStory === item.id} onSelect={selectStory} />
                ))}

                {techStack.map((tech, i) => (
                    <TechNode key={tech.id} tech={tech} angle={(i / techStack.length) * Math.PI * 2} radius={tech.orbit.radius} height={tech.orbit.height} onSelect={() => { }} />
                ))}

                {projects.map((p) => (
                    <ProjectNode key={p.id} project={p} active={activeProject === p.id} onSelect={selectProject} />
                ))}
            </Canvas>

            <HomeOverlay activeSection={activeStory || activeProject} onHome={goHome} />
            <ControlsUI onPrev={() => { }} onNext={() => { }} />
        </div>
    );
}
