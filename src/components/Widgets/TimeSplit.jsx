import React, { useState, useEffect } from 'react';

const TimeSplit = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState('focus'); // focus, short, long, custom
    const [customMinutes, setCustomMinutes] = useState(45);
    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            setTimeout(() => setIsActive(false), 0);
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const toggleTimer = () => setIsActive(!isActive);

    const resetTimer = (newMode) => {
        setIsActive(false);
        setMode(newMode);
        if (newMode === 'focus') setTimeLeft(25 * 60);
        else if (newMode === 'short') setTimeLeft(5 * 60);
        else if (newMode === 'long') setTimeLeft(15 * 60);
        else if (newMode === 'custom') setTimeLeft(customMinutes * 60);
    };

    const handleCustomChange = (e) => {
        const val = parseInt(e.target.value) || 0;
        setCustomMinutes(val);
        if (mode === 'custom') {
            setTimeLeft(val * 60);
            setIsActive(false);
        }
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
            background: 'var(--timer-bg)',
            color: 'var(--timer-text)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <h3 style={{ marginBottom: '24px', opacity: 0.9, fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {mode === 'custom' ? 'Custom Timer' : mode === 'focus' ? 'Focus Time' : 'Break Time'}
            </h3>

            {mode === 'custom' && !isActive ? (
                <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                        type="number"
                        min="1"
                        max="999"
                        value={customMinutes}
                        onChange={handleCustomChange}
                        style={{
                            fontSize: '4rem',
                            fontWeight: '700',
                            width: '180px',
                            background: 'var(--item-bg-hover)',
                            border: 'none',
                            borderRadius: '12px',
                            color: 'var(--timer-text)',
                            textAlign: 'center',
                            padding: '10px'
                        }}
                    />
                    <span style={{ fontSize: '1.5rem', fontWeight: 600 }}>min</span>
                </div>
            ) : (
                <div style={{
                    fontSize: '5.5rem',
                    fontWeight: '800',
                    fontVariantNumeric: 'tabular-nums',
                    marginBottom: '20px',
                    textShadow: '0 4px 8px rgba(0,0,0,0.15)',
                    lineHeight: 1
                }}>
                    {formatTime(timeLeft)}
                </div>
            )}

            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                <button onClick={toggleTimer} style={{
                    padding: '12px 32px',
                    borderRadius: '50px',
                    border: '3px solid var(--timer-text)',
                    background: isActive ? 'var(--timer-text)' : 'transparent',
                    color: isActive ? 'var(--timer-btn-active-text)' : 'var(--timer-text)',
                    fontWeight: '700',
                    fontSize: '1.2rem',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                }}>
                    {isActive ? 'Pause' : 'Start'}
                </button>
            </div>

            <div style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                justifyContent: 'center',
                background: 'var(--item-bg-hover)',
                padding: '8px 16px',
                borderRadius: '20px'
            }}>
                <button onClick={() => resetTimer('focus')} style={{ opacity: mode === 'focus' ? 1 : 0.7, background: 'none', color: 'var(--timer-text)', fontWeight: 600 }}>Focus</button>
                <div style={{ width: 1, background: 'var(--text-light)' }}></div>
                <button onClick={() => resetTimer('short')} style={{ opacity: mode === 'short' ? 1 : 0.7, background: 'none', color: 'var(--timer-text)', fontWeight: 600 }}>Short</button>
                <div style={{ width: 1, background: 'var(--text-light)' }}></div>
                <button onClick={() => resetTimer('long')} style={{ opacity: mode === 'long' ? 1 : 0.7, background: 'none', color: 'var(--timer-text)', fontWeight: 600 }}>Long</button>
                <div style={{ width: 1, background: 'var(--text-light)' }}></div>
                <button onClick={() => resetTimer('custom')} style={{ opacity: mode === 'custom' ? 1 : 0.7, background: 'none', color: 'var(--timer-text)', fontWeight: 600 }}>Custom</button>
            </div>
        </div>
    );
};

export default TimeSplit;
