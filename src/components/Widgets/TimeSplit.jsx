import React, { useState, useEffect } from 'react';

const TimeSplit = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState('focus'); // focus, short, long

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const toggleTimer = () => setIsActive(!isActive);

    const resetTimer = (newMode) => {
        setIsActive(false);
        setMode(newMode);
        if (newMode === 'focus') setTimeLeft(25 * 60);
        else if (newMode === 'short') setTimeLeft(5 * 60);
        else setTimeLeft(15 * 60);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="card" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            background: 'linear-gradient(135deg, #FFDAC1 0%, #FFB7B2 100%)',
            color: 'white'
        }}>
            <h3 style={{ marginBottom: '16px', opacity: 0.9 }}>{mode === 'focus' ? 'Focus Time' : 'Break Time'}</h3>

            <div style={{
                fontSize: '3.5rem',
                fontWeight: '700',
                fontVariantNumeric: 'tabular-nums',
                marginBottom: '20px',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                {formatTime(timeLeft)}
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={toggleTimer} style={{
                    padding: '8px 24px',
                    borderRadius: '20px',
                    border: '2px solid white',
                    background: isActive ? 'white' : 'transparent',
                    color: isActive ? '#FFB7B2' : 'white',
                    fontWeight: '600',
                    fontSize: '1rem'
                }}>
                    {isActive ? 'Pause' : 'Start'}
                </button>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                <button onClick={() => resetTimer('focus')} style={{ opacity: mode === 'focus' ? 1 : 0.6, background: 'none', color: 'white', fontSize: '0.8rem' }}>Focus</button>
                <button onClick={() => resetTimer('short')} style={{ opacity: mode === 'short' ? 1 : 0.6, background: 'none', color: 'white', fontSize: '0.8rem' }}>Short Break</button>
            </div>
        </div>
    );
};

export default TimeSplit;
