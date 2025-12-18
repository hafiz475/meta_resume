import { useState, useEffect } from 'react';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

export default function LightningBolt({ trigger }) {
    const [points, setPoints] = useState([]);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!trigger) return;

        // 1. Generate new random jagged points
        const newPoints = [];
        // Random X start (-15 to 15), High Y (10), Far Z (-10)
        const startX = (Math.random() - 0.5) * 30;
        const start = new THREE.Vector3(startX, 12, -12);

        // End point: roughly below start, lower Y
        const end = new THREE.Vector3(startX + (Math.random() - 0.5) * 10, -5, -12);

        let curr = start.clone();
        newPoints.push(curr);

        const segments = 8;
        for (let i = 0; i < segments; i++) {
            // Linear interpolation towards end
            const t = (i + 1) / segments;
            const nextBase = start.clone().lerp(end, t);

            // Add jagged randomness
            if (i < segments - 1) { // Don't randomize the very last point too much if we want ground contact, but here it's sky-to-sky mostly
                nextBase.x += (Math.random() - 0.5) * 3;
                nextBase.y += (Math.random() - 0.5) * 2;
            }
            newPoints.push(nextBase);
            curr = nextBase;
        }

        setPoints(newPoints);
        setVisible(true);

        // 2. Flicker Effect (Show -> Hide -> Show -> Hide)
        // total duration approx 200ms
        const timer1 = setTimeout(() => setVisible(false), 50);
        const timer2 = setTimeout(() => setVisible(true), 100);
        const timer3 = setTimeout(() => setVisible(false), 200);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, [trigger]);

    if (!visible || points.length === 0) return null;

    return (
        <Line
            points={points}
            color="#e6f0ff" // Blue-ish white
            lineWidth={5}
            toneMapped={false} // Make it bright/emissive
        />
    );
}
