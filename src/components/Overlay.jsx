import React, { useEffect, useState } from 'react';

const Overlay = ({ section }) => {
    const [showName, setShowName] = useState(false);

    useEffect(() => {
        // Show name after 8 seconds (during the 10-second intro)
        const timer = setTimeout(() => {
            setShowName(true);
        }, 8000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="overlay">
            <div className={`name-container ${showName ? 'visible' : ''}`}>
                <h1 className="name-text">J Md Hafizur Rahaman</h1>
            </div>

            {/* section indicator logic can go here later */}
        </div>
    );
};

export default Overlay;
