import React, { useEffect, useState } from 'react';

const Overlay = ({ section, onLand, isStoryDone }) => {
    const [visible, setVisible] = useState(false);
    const [contentVisible, setContentVisible] = useState(false);
    const [landButtonVisible, setLandButtonVisible] = useState(false);

    useEffect(() => {
        setVisible(false);
        setContentVisible(false);

        // Fade in container immediately
        const containerTimer = setTimeout(() => setVisible(true), 500);

        // For Scene 2: delay content by 3 seconds (after camera settles)
        const contentTimer = setTimeout(() => {
            if (section === 1) {
                setContentVisible(true);
            } else {
                setContentVisible(true); // Other scenes show immediately
            }
        }, section === 1 ? 3500 : 500); // 3.5s for Scene 2, 0.5s for others

        return () => {
            clearTimeout(containerTimer);
            clearTimeout(contentTimer);
        };
    }, [section]);

    // Show Land button after 6 seconds when isStoryDone becomes true in section 1
    useEffect(() => {
        if (section === 1 && isStoryDone) {
            const landButtonTimer = setTimeout(() => {
                setLandButtonVisible(true);
            }, 6000); // 6 second delay

            return () => clearTimeout(landButtonTimer);
        } else {
            setLandButtonVisible(false);
        }
    }, [section, isStoryDone]);

    // Scene 2: Sunset Story - Land Button appears 6 seconds after "Hi" appears (isStoryDone)
    if (section === 1) {
        return landButtonVisible ? (
            <button className="land-button" onClick={onLand}>
                <span className="land-icon">🛬</span>
                <span>Land</span>
            </button>
        ) : null;
    }

    // Scene 3: Skills - Centered, Same Name Font Style
    if (section === 2) {
        return (
            <div className={`skills-overlay-centered ${visible ? 'visible' : ''}`}>
                <h1 className="skills-main-title">Skills & Achievements</h1>

                <div className="skills-categories">
                    <div className="skill-category">
                        <h3 className="category-title software">💻 Software</h3>
                        <div className="category-items">
                            <span>React JS</span>
                            <span>Node.js</span>
                            <span>MongoDB</span>
                            <span>Firebase</span>
                            <span>AWS S3</span>
                        </div>
                    </div>

                    <div className="skill-category">
                        <h3 className="category-title projects">🚀 Projects</h3>
                        <div className="category-items">
                            <span>CarzMoto Billing</span>
                            <span>Bizmagnets CRM</span>
                            <span>WhatsApp Automation</span>
                            <span>Nippon Paint</span>
                        </div>
                    </div>

                    <div className="skill-category">
                        <h3 className="category-title mechanical">⚙️ Mechanical</h3>
                        <div className="category-items">
                            <span>Kaizen & Lean</span>
                            <span>Production KPIs</span>
                            <span>Vehicle Assembly</span>
                        </div>
                    </div>

                    <div className="skill-category">
                        <h3 className="category-title football">⚽ Football</h3>
                        <div className="category-items">
                            <span>District-Level Player</span>
                            <span>Team Coordination</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Scene 1: Name handled by HudText
    return null;
};

export default Overlay;
