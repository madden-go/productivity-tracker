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
        </div>
    );
};

export default SpotifyWidget;
