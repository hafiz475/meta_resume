import React from 'react';
import { Html } from '@react-three/drei';

export default function Section3D({
    position = [0, 0, 0],
    title,
    subtitle,
    body,
    className,
    index,
    activeIndex
}) {
    const isActive = index === activeIndex;

    return (
        <group position={position}>
            {/* Only HTML overlay for crisp text */}
            <Html center className={`section-card ${className}`} transform occlude>
                <div className={`card ${isActive ? 'active' : ''}`}>
                    <h2 className="title">{title}</h2>
                    <p className="subtitle">{subtitle}</p>
                    <p className="body">{body}</p>
                </div>
            </Html>
        </group>
    );
}
