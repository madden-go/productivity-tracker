import React from 'react';
import './Pet.css';

const Pet = () => {
    return (
        <div className="pet-container">
            <div className="pet-body">
                <div className="pet-face">
                    <div className="pet-eye left"></div>
                    <div className="pet-eye right"></div>
                    <div className="pet-mouth"></div>
                    <div className="pet-blush left"></div>
                    <div className="pet-blush right"></div>
                </div>
            </div>
            <div className="pet-shadow"></div>
        </div>
    );
};

export default Pet;
