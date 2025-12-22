import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

const SoundManager = forwardRef(({ isRaining, showBirds, section }, ref) => {
    // Refs for Audio objects
    const engineAudio = useRef(new Audio('/assets/sounds/plane_engine.mp3'));
    const rainAudio = useRef(new Audio('/assets/sounds/rain.mp3'));
    const thunderAudio = useRef(new Audio('/assets/sounds/thunder.mp3'));
    const birdsAudio = useRef(new Audio('/assets/sounds/birds.mp3'));

    useEffect(() => {
        // --- Setup Audio Properties ---

        // Plane Engine: Always Loops, Volume 0.4
        engineAudio.current.loop = true;
        engineAudio.current.volume = 0.4;

        // Rain: Loops, Volume 0.6
        rainAudio.current.loop = true;
        rainAudio.current.volume = 0.6;

        // Birds: Loops, Volume 0.5
        birdsAudio.current.loop = true;
        birdsAudio.current.volume = 0.5;

        // Thunder: One-shot, Volume 1.0
        thunderAudio.current.volume = 1.0;

        // Start Engine immediately (user interaction usually required for autoplay, 
        // but often works in modern internal nav if flagged, otherwise needs click)
        engineAudio.current.play().catch(e => console.log("Audio autoplay blocked:", e));

        return () => {
            engineAudio.current.pause();
            rainAudio.current.pause();
            birdsAudio.current.pause();
        };
    }, []);

    // Manage Rain
    useEffect(() => {
        if (isRaining) {
            rainAudio.current.play().catch(() => { });
            // Fade in logic could go here
        } else {
            rainAudio.current.pause();
            rainAudio.current.currentTime = 0;
        }
    }, [isRaining]);

    // Manage Birds (Typically Scene 2)
    useEffect(() => {
        if (showBirds) {
            birdsAudio.current.play().catch(() => { });
        } else {
            birdsAudio.current.pause();
            birdsAudio.current.currentTime = 0;
        }
    }, [showBirds]);

    // Expose Thunder method to parent
    useImperativeHandle(ref, () => ({
        playThunder: () => {
            if (thunderAudio.current) {
                thunderAudio.current.currentTime = 0;
                thunderAudio.current.play().catch(() => { });
            }
        },
        // Optional: method to fade engine out if needed during landing
        fadeEngineOut: () => {
            // Logic to lower volume
        }
    }));

    return null; // No UI
});

export default SoundManager;
