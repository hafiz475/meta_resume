import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export default function Floor() {
    const PATH = '/assets/textures/wood/';

    const textures = useTexture({
        map: PATH + 'wood_color.jpg',
        normalMap: PATH + 'wood_normal.jpg',
        roughnessMap: PATH + 'wood_roughness.jpg',
    });

    textures.map.encoding = THREE.sRGBEncoding;
    textures.map.anisotropy = 16;

    // Optional tiling for detail
    textures.map.wrapS = textures.map.wrapT = THREE.RepeatWrapping;
    textures.normalMap.wrapS = textures.normalMap.wrapT = THREE.RepeatWrapping;
    textures.roughnessMap.wrapS = textures.roughnessMap.wrapT = THREE.RepeatWrapping;

    // Tile the texture 2×2 instead of 4×4 for a smaller floor
    textures.map.repeat.set(2, 2);
    textures.normalMap.repeat.set(2, 2);
    textures.roughnessMap.repeat.set(2, 2);

    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
            {/* 💡 Smaller floor just under the plane */}
            <planeGeometry args={[6, 6]} />
            <meshStandardMaterial {...textures} roughness={0.85} metalness={0.05} />
        </mesh>
    );
}
