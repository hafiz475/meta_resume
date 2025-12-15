import { useGLTF, useAnimations } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Plane() {
    const group = useRef();
    const { scene, animations } = useGLTF('/assets/models/basic_plane.glb');
    const { actions, names } = useAnimations(animations, group);

    useEffect(() => {
        // rotation
        scene.rotation.set(0, Math.PI / 4, 0);
        scene.scale.set(0.4, 0.4, 0.4);

        // compute bounding box height
        const box = new THREE.Box3().setFromObject(scene);
        const height = box.max.y - box.min.y;

        // place plane EXACTLY on the floor
        if (group.current) {
            group.current.position.y = height / 2;   // ⭐ correct value
        }

        // improve textures
        scene.traverse((child) => {
            if (child.isMesh && child.material.map) {
                child.material.map.encoding = THREE.sRGBEncoding;
                child.material.map.anisotropy = 16;
            }
        });

        // play animation
        if (names.length > 0) actions[names[0]].reset().play();

    }, [scene]);

    return (
        <group ref={group} position={[0, 0, 0]}>
            <primitive object={scene} />
        </group>
    );
}
