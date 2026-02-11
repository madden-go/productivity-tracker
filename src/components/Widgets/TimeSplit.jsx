import React, { useState, useEffect } from 'react';

const TimeSplit = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
    const [isActive, setIsActive] = useState(false);
<<<<<<< HEAD
    const [mode, setMode] = useState('focus'); // focus, short, long, custom
    const [customMinutes, setCustomMinutes] = useState(45);
=======
    const [mode, setMode] = useState('focus'); // focus, short, long
>>>>>>> 5177397df4a60232f23e16c446e5470f937eaad5

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
<<<<<<< HEAD
        } else if (timeLeft === 0 && isActive) {
            setTimeout(() => setIsActive(false), 0);
=======
        } else if (timeLeft === 0) {
            setIsActive(false);
>>>>>>> 5177397df4a60232f23e16c446e5470f937eaad5
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const toggleTimer = () => setIsActive(!isActive);

    const resetTimer = (newMode) => {
        setIsActive(false);
        setMode(newMode);
        if (newMode === 'focus') setTimeLeft(25 * 60);
        else if (newMode === 'short') setTimeLeft(5 * 60);
<<<<<<< HEAD
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
=======
        else setTimeLeft(15 * 60);
>>>>>>> 5177397df4a60232f23e16c446e5470f937eaad5
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
<<<<<<< HEAD
            color: 'white',
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
                            background: 'rgba(255,255,255,0.2)',
                            border: 'none',
                            borderRadius: '12px',
                            color: 'white',
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
                    border: '3px solid white',
                    background: isActive ? 'white' : 'transparent',
                    color: isActive ? '#FFB7B2' : 'white',
                    fontWeight: '700',
                    fontSize: '1.2rem',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
=======
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
>>>>>>> 5177397df4a60232f23e16c446e5470f937eaad5
                }}>
                    {isActive ? 'Pause' : 'Start'}
                </button>
            </div>

<<<<<<< HEAD
            <div style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                justifyContent: 'center',
                background: 'rgba(0,0,0,0.05)',
                padding: '8px 16px',
                borderRadius: '20px'
            }}>
                <button onClick={() => resetTimer('focus')} style={{ opacity: mode === 'focus' ? 1 : 0.7, background: 'none', color: 'white', fontWeight: 600 }}>Focus</button>
                <div style={{ width: 1, background: 'rgba(255,255,255,0.4)' }}></div>
                <button onClick={() => resetTimer('short')} style={{ opacity: mode === 'short' ? 1 : 0.7, background: 'none', color: 'white', fontWeight: 600 }}>Short</button>
                <div style={{ width: 1, background: 'rgba(255,255,255,0.4)' }}></div>
                <button onClick={() => resetTimer('long')} style={{ opacity: mode === 'long' ? 1 : 0.7, background: 'none', color: 'white', fontWeight: 600 }}>Long</button>
                <div style={{ width: 1, background: 'rgba(255,255,255,0.4)' }}></div>
                <button onClick={() => resetTimer('custom')} style={{ opacity: mode === 'custom' ? 1 : 0.7, background: 'none', color: 'white', fontWeight: 600 }}>Custom</button>
=======
            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                <button onClick={() => resetTimer('focus')} style={{ opacity: mode === 'focus' ? 1 : 0.6, background: 'none', color: 'white', fontSize: '0.8rem' }}>Focus</button>
                <button onClick={() => resetTimer('short')} style={{ opacity: mode === 'short' ? 1 : 0.6, background: 'none', color: 'white', fontSize: '0.8rem' }}>Short Break</button>
>>>>>>> 5177397df4a60232f23e16c446e5470f937eaad5
            </div>
        </div>
    );
};

export default TimeSplit;
