<<<<<<< HEAD
import React from 'react';

const MoodTracker = ({ selectedMood, setSelectedMood }) => {

=======
import React, { useState } from 'react';

const MoodTracker = () => {
    const [selectedMood, setSelectedMood] = useState(null);
>>>>>>> 5177397df4a60232f23e16c446e5470f937eaad5
    const moods = [
        { emoji: "😊", label: "Happy", color: "#B5EAD7" },
        { emoji: "😐", label: "Neutral", color: "#E6E6FA" },
        { emoji: "😔", label: "Sad", color: "#FFB7B2" },
        { emoji: "😤", label: "Stressed", color: "#FFDAC1" },
    ];

    return (
        <div className="card">
            <h3 style={{ marginBottom: '12px', fontSize: '1.1rem', color: 'var(--text-main)' }}>Mood</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {moods.map((mood, index) => (
                    <button key={index}
                        onClick={() => setSelectedMood(index)}
                        style={{
                            fontSize: '1.5rem',
                            padding: '8px',
                            borderRadius: '50%',
                            backgroundColor: selectedMood === index ? mood.color : 'transparent',
                            transform: selectedMood === index ? 'scale(1.1)' : 'scale(1)',
                            transition: 'all 0.2s'
                        }}
                        aria-label={mood.label}
                        title={mood.label}
                    >
                        {mood.emoji}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MoodTracker;
