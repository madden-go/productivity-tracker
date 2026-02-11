import React, { useState } from 'react';
import './Pet.css';

const Pet = () => {
    const [isInteracting, setIsInteracting] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [action, setAction] = useState('idle'); // idle, purr, play

    const handleMouseEnter = () => {
        setIsHovering(true);
        setAction('purr');
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        if (!isInteracting) setAction('idle');
    };

    const handleClick = () => {
        setIsInteracting(true);
        setAction('play');
        setTimeout(() => {
            setIsInteracting(false);
            setAction(isHovering ? 'purr' : 'idle');
        }, 1000);
    };

    return (
        <div
            className="pet-container"
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
        >
            <div className={`pet-body ${action === 'play' ? 'bounce-play' : action === 'purr' ? 'vibrate' : ''}`}>
                <div className="pet-face">
                    <div className={`pet-eye left ${action !== 'idle' ? 'happy' : ''}`}></div>
                    <div className={`pet-eye right ${action !== 'idle' ? 'happy' : ''}`}></div>
                    <div className={`pet-mouth ${action !== 'idle' ? 'smile' : ''}`}></div>
                    <div className="pet-blush left"></div>
                    <div className="pet-blush right"></div>
                </div>
                {action !== 'idle' && (
                    <div className="pet-speech-bubble">
                        {action === 'play' ? "Playing! 🧶" : "Purr... ~"}
                    </div>
                )}
            </div>
            <div className="pet-shadow"></div>
        </div>
    );
};

export default Pet;
