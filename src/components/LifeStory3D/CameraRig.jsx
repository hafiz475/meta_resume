// src/components/LifeStory3D/CameraRig.jsx
import React, { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Simple camera rig that lerps to target position and rotates to lookAt.
 * cameraTarget, cameraLookAt are arrays [x,y,z]
 */
export default function CameraRig({ cameraTarget = [0, 1.4, 6.5], cameraLookAt = [0, 1, 0] }) {
    const { camera } = useThree();
    const targetRef = useRef(new THREE.Vector3(...cameraTarget));
    const lookAtRef = useRef(new THREE.Vector3(...cameraLookAt));

    useEffect(() => {
        targetRef.current.set(...cameraTarget);
    }, [cameraTarget]);

    useEffect(() => {
        lookAtRef.current.set(...cameraLookAt);
    }, [cameraLookAt]);

    useFrame((_, delta) => {
        // lerp camera position
        camera.position.lerp(targetRef.current, 1 - Math.pow(0.001, delta));
        // smooth lookAt
        const cur = new THREE.Vector3();
        camera.getWorldDirection(cur);
        const desired = lookAtRef.current.clone().sub(camera.position).normalize();
        const slerp = cur.lerp(desired, 1 - Math.pow(0.001, delta));
        camera.lookAt(camera.position.clone().add(slerp));
    });

    return null;
}
