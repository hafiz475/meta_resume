//src/components/HUD.jsx

import React from 'react';
import { sections } from '../data/sections';

export default function HUD({ index, setIndex }) {
    return (
        <div className="hud" role="navigation" aria-label="Section navigation">
            <div className="hud-left">
                <div className="hud-title">{sections[index].title}</div>
                <div className="hud-subtitle">{sections[index].subtitle}</div>
            </div>

            <div className="dots">
                {sections.map((s, i) => (
                    <button
                        key={s.key}
                        className={`dot ${i === index ? 'active' : ''}`}
                        onClick={() => setIndex(i)}
                        aria-label={`Go to ${s.title}`}
                        title={s.title}
                        type="button"
                    />
                ))}
            </div>
        </div>
    );
}
