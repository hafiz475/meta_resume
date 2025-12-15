import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Plane from './Plane';
import Floor from './Floor';

export default function MainScene() {
    return (
        <Canvas
            shadows
            camera={{ position: [0, 2, 8], fov: 45 }}
        >
            <color attach="background" args={['#eaf1ff']} />

            {/* Realistic lighting */}
            <ambientLight intensity={0.8} />
            <directionalLight
                position={[5, 10, 5]}
                intensity={1.5}
                castShadow
                shadow-mapSize={[2048, 2048]}
            />

            <Suspense fallback={null}>
                <Floor />
                <Plane visible={true} />
            </Suspense>
        </Canvas>
    );
}
