<<<<<<< HEAD
import React, { useState, useEffect } from 'react';

const SpotifyWidget = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [showControls, setShowControls] = useState(false);

    // Show controls briefly on state change
    useEffect(() => {
        setShowControls(true);
        const timer = setTimeout(() => setShowControls(false), 2000);
        return () => clearTimeout(timer);
    }, [isPlaying]);

    return (
        <div
            className="spotify-widget-container"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
            onClick={() => setIsPlaying(!isPlaying)}
            style={{
                position: 'fixed',
                bottom: '32px',
                left: '32px',
                width: '100px',
                height: '100px',
                zIndex: 1000,
                cursor: 'pointer'
            }}
            title={isPlaying ? "Pause Music" : "Play Music"}
        >
            <style>
                {`
                    @keyframes spin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                    @keyframes pulse {
                        0% { box-shadow: 0 0 0 0 rgba(29, 185, 84, 0.7); }
                        70% { box-shadow: 0 0 0 10px rgba(29, 185, 84, 0); }
                        100% { box-shadow: 0 0 0 0 rgba(29, 185, 84, 0); }
                    }
                `}
            </style>

            {/* Song Tooltip - Explicitly handled with state for reliability, or keep CSS hover if preferred. 
                Using CSS group hover for simplicity but reinforcing z-index. */}
            <div
                className="song-tooltip"
                style={{
                    position: 'absolute',
                    left: '110px',
                    top: '50%',
                    transform: showControls ? 'translateY(-50%) translateX(0)' : 'translateY(-50%) translateX(-10px)',
                    background: 'rgba(24, 24, 24, 0.95)',
                    color: 'white',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    whiteSpace: 'nowrap',
                    opacity: showControls ? 1 : 0,
                    visibility: showControls ? 'visible' : 'hidden',
                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    pointerEvents: 'none',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    zIndex: 1002,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    borderLeft: '4px solid #1DB954'
                }}
            >
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#1DB954', marginBottom: '2px' }}>Now Playing</div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Lofi Beats - Chill Hop</div>
            </div>

            {/* Rotating Record */}
            <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: '#111',
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: isPlaying ? 'spin 4s linear infinite, pulse 2s infinite' : 'none',
                border: isPlaying ? '4px solid #1DB954' : '4px solid #333',
                transition: 'all 0.3s ease',
                position: 'relative'
            }}>
                {/* Vinyl Grooves */}
                <div style={{
                    position: 'absolute',
                    width: '94%',
                    height: '94%',
                    borderRadius: '50%',
                    background: 'conic-gradient(#222 0%, #111 25%, #222 50%, #111 75%, #222 100%)',
                    pointerEvents: 'none'
                }}></div>

                {/* Cover Art Label */}
                <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    position: 'relative',
                    zIndex: 2,
                    border: '2px solid #111'
                }}>
                    <img
                        src="https://picsum.photos/seed/music/200"
                        alt="Cover Art"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>

                {/* Play/Pause Overlay Icon */}
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
                    borderRadius: '50%',
                    background: 'rgba(0,0,0,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: showControls ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                    zIndex: 3
                }}>
                    {isPlaying ? (
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="white" stroke="none">
                            <rect x="6" y="4" width="4" height="16" rx="1"></rect>
                            <rect x="14" y="4" width="4" height="16" rx="1"></rect>
                        </svg>
                    ) : (
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="white" stroke="none">
                            <path d="M5 3l14 9-14 9V3z"></path>
                        </svg>
                    )}
                </div>
            </div>
=======
import React from 'react';

const SpotifyWidget = () => {
    return (
        <div className="card" style={{
            backgroundColor: '#1DB954',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px'
        }}>
            <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18V5l12-2v13"></path>
                    <circle cx="6" cy="18" r="3"></circle>
                    <circle cx="18" cy="16" r="3"></circle>
                </svg>
            </div>
            <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>Lofi Beats</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Chill Hop</div>
            </div>
            <button style={{ background: 'none', color: 'white' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
            </button>
>>>>>>> 5177397df4a60232f23e16c446e5470f937eaad5
        </div>
    );
};

export default SpotifyWidget;
