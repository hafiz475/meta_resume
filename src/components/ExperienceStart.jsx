import './ExperienceStart.scss';

export default function ExperienceStart({ onStart }) {
    const tagline = "BORN TO BUILD. FORGED IN CODE.";

    return (
        <div className="experience-start">
            <div className="start-content">
                <h1 className="animated-tagline">
                    {tagline.split("").map((char, index) => (
                        <span key={index} className="char">
                            {char === " " ? "\u00A0" : char}
                        </span>
                    ))}
                </h1>
                <p className="music-tagline">
                    Immersive Audio Experience Ready
                    <span className="sound-waves">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </p>
                <button onClick={onStart}>
                    Enter Cockpit
                </button>
            </div>
        </div>
    );
}
