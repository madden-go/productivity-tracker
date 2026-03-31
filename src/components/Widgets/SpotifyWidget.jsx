import React, { useState, useEffect } from 'react';

const SpotifyWidget = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [showControls, setShowControls] = useState(false);
    
    // Auth & Data States
    const [clientId, setClientId] = useState(localStorage.getItem('spotify_client_id') || '');
    const [token, setToken] = useState(localStorage.getItem('spotify_token') || null);
    const [showInput, setShowInput] = useState(false);
    const [trackInfo, setTrackInfo] = useState({
        title: 'Not Playing',
        artist: 'Connect Spotify',
        albumArt: 'https://picsum.photos/seed/music/200',
        isPlaying: false,
    });

    // Detect if Spotify Token was just added to localStorage (for rapid hot-reloads)
    useEffect(() => {
        const handleStorage = () => {
            setToken(localStorage.getItem('spotify_token'));
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    // Polling Spotify API
    useEffect(() => {
        if (!token) return;

        const fetchSpotify = async () => {
            try {
                const res = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (res.status === 204) {
                    setTrackInfo(prev => ({ ...prev, isPlaying: false, title: 'Not Playing', artist: 'Spotify Idle' }));
                    setIsPlaying(false);
                } else if (res.ok) {
                    const data = await res.json();
                    if (data && data.item) {
                        setTrackInfo({
                            title: data.item.name,
                            artist: data.item.artists.map(a => a.name).join(', '),
                            albumArt: data.item.album.images[0]?.url || 'https://picsum.photos/seed/music/200',
                            isPlaying: data.is_playing
                        });
                        setIsPlaying(data.is_playing);
                    }
                } else if (res.status === 401) {
                    // Token expired or invalid
                    localStorage.removeItem('spotify_token');
                    setToken(null);
                }
            } catch (e) {
                console.error('Spotify fetch error', e);
            }
        };

        fetchSpotify();
        const interval = setInterval(fetchSpotify, 10000); 
        return () => clearInterval(interval);
    }, [token]);

    const handleConnect = async (e) => {
        e.preventDefault();
        if (!clientId) return;

        const generateRandomString = (length) => {
            const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const values = crypto.getRandomValues(new Uint8Array(length));
            return values.reduce((acc, x) => acc + possible[x % possible.length], "");
        };

        const sha256 = async (plain) => {
            const encoder = new TextEncoder();
            const data = encoder.encode(plain);
            return window.crypto.subtle.digest('SHA-256', data);
        };

        const base64encode = (input) => {
            return btoa(String.fromCharCode(...new Uint8Array(input)))
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');
        };

        const codeVerifier = generateRandomString(64);
        localStorage.setItem('spotify_client_id', clientId.trim());
        localStorage.setItem('spotify_code_verifier', codeVerifier);
        
        const hashed = await sha256(codeVerifier);
        const codeChallenge = base64encode(hashed);

        const redirectUri = 'http://localhost:5173/callback';
        const scopes = 'user-read-currently-playing user-read-playback-state user-modify-playback-state';
        
        const url = `https://accounts.spotify.com/authorize?client_id=${clientId.trim()}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}&code_challenge_method=S256&code_challenge=${codeChallenge}`;
        
        window.location.href = url;
    };

    const handleWidgetClick = () => {
        if (!token) {
            setShowInput(true);
            return;
        }
        
        // Optimistic UI update
        const newPlayState = !isPlaying;
        setIsPlaying(newPlayState);
        
        // Put request to control playback
        const endpoint = newPlayState ? 'play' : 'pause';
        fetch(`https://api.spotify.com/v1/me/player/${endpoint}`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(res => {
            if (!res.ok) {
                // If user doesn't have Premium, this fails. Revert state.
                setIsPlaying(!newPlayState);
            }
        }).catch(() => setIsPlaying(!newPlayState));
    };

    // Show controls briefly on state change automatically
    useEffect(() => {
        setShowControls(true);
        const timer = setTimeout(() => setShowControls(false), 2000);
        return () => clearTimeout(timer);
    }, [isPlaying]);

    if (showInput && !token) {
        return (
            <div className="card spotify-connect-card" style={{
                position: 'fixed', bottom: '32px', left: '32px', zIndex: 1000, 
                padding: '16px', borderRadius: '12px', background: 'var(--card-bg)', 
                boxShadow: '0 8px 30px rgba(0,0,0,0.5)', width: '260px', border: '1px solid var(--border-light)'
            }}>
                <h4 style={{ marginBottom: '8px', color: '#1DB954', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.54.6.301.96zm1.44-3.3c-.301.42-.84.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.84.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                    Connect Spotify
                </h4>
                <p style={{ fontSize: '0.8rem', marginBottom: '12px', color: 'var(--text-light)' }}>
                    Paste your Spotify Client ID to enable live tracking and playback control.
                </p>
                <form onSubmit={handleConnect}>
                    <input 
                        autoFocus
                        type="text" 
                        value={clientId} 
                        onChange={e => setClientId(e.target.value)} 
                        placeholder="Client ID..." 
                        style={{ width: '100%', padding: '8px', marginBottom: '8px', borderRadius: '6px', border: '1px solid var(--border-subtle)', background: 'var(--input-bg)', color: 'var(--text-color)', outline: 'none' }}
                    />
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button type="button" onClick={() => setShowInput(false)} style={{ flex: 1, padding: '6px', background: 'transparent', color: 'var(--text-color)', border: '1px solid var(--border-subtle)', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
                        <button type="submit" style={{ flex: 1, padding: '6px', background: '#1DB954', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Connect</button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div
            className="spotify-widget-container"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
            onClick={handleWidgetClick}
            style={{
                position: 'fixed',
                bottom: '32px',
                left: '32px',
                width: '100px',
                height: '100px',
                zIndex: 1000,
                cursor: 'pointer'
            }}
            title={!token ? "Click to Connect Spotify" : (isPlaying ? "Pause Music" : "Play Music")}
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

            <div
                className="song-tooltip"
                style={{
                    position: 'absolute',
                    left: '110px',
                    top: '50%',
                    transform: showControls ? 'translateY(-50%) translateX(0)' : 'translateY(-50%) translateX(-10px)',
                    background: 'var(--card-bg)',
                    color: 'var(--text-color)',
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
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#1DB954', marginBottom: '4px' }}>
                    {!token ? 'Disconnected' : 'Now Playing'}
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{trackInfo.title}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>{trackInfo.artist}</div>
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
                border: isPlaying ? '4px solid #1DB954' : '4px solid var(--border-light)',
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
                        src={trackInfo.albumArt}
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
                    opacity: showControls && token ? 1 : 0,
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
        </div>
    );
};

export default SpotifyWidget;
