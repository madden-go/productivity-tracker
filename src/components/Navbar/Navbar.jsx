import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = ({ toggleCalendar }) => {
    const { user, logout } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);
    
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const searchRef = useRef(null);
    const navigate = useNavigate();

    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const handleLogout = () => {
        setShowDropdown(false);
        logout();
    };

    useEffect(() => {
        if (!searchQuery.trim() || !user) {
            setSearchResults([]);
            return;
        }

        const delayFn = setTimeout(() => {
            setIsSearching(true);
            fetch(`/api/journals/search?user_id=${user.id}&q=${encodeURIComponent(searchQuery)}`)
                .then(r => r.json())
                .then(data => {
                    setSearchResults(data);
                    setIsSearching(false);
                })
                .catch(err => {
                    console.error(err);
                    setIsSearching(false);
                });
        }, 400); 

        return () => clearTimeout(delayFn);
    }, [searchQuery, user]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchResults([]);
                setSearchQuery('');
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleResultClick = () => {
        setSearchResults([]);
        setSearchQuery('');
        navigate('/history');
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <button className="menu-btn" onClick={toggleCalendar} aria-label="Toggle Calendar" style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '10px', display: 'flex', alignItems: 'center', color: 'var(--text-main)' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <div className="brand">Koa</div>
                <div className="nav-links">
                    <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                        Dashboard
                    </NavLink>
                    <NavLink to="/calendar" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                        Calendar
                    </NavLink>
                    <NavLink to="/history" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                        History
                    </NavLink>
                </div>
            </div>

            <div className="navbar-center">
                <div className="search-bar-container" ref={searchRef} style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
                    <div className="search-bar" style={{ width: '100%' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input 
                            type="text" 
                            placeholder="Search journals..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    {/* Search Results Dropdown */}
                    {searchQuery.trim().length > 0 && (
                        <div className="search-dropdown">
                            {isSearching ? (
                                <div className="search-item" style={{ textAlign: 'center', color: 'var(--text-light)' }}>Searching...</div>
                            ) : searchResults.length > 0 ? (
                                searchResults.map(res => (
                                    <div key={res.id} className="search-item" onClick={handleResultClick}>
                                        <div className="search-item-date">{res.date}</div>
                                        <div className="search-item-text">{res.entry.substring(0, 60)}...</div>
                                    </div>
                                ))
                            ) : (
                                <div className="search-item" style={{ textAlign: 'center', color: 'var(--text-light)' }}>No matching journals found.</div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="navbar-right" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <button 
                    onClick={toggleTheme} 
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: 'var(--text-main)', display: 'flex', padding: '4px' }}
                    title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
                >
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>
                {user && <span className="user-name">{user.name}</span>}
                <div className="profile-container">
                    <div 
                        className="profile-placeholder" 
                        onClick={() => setShowDropdown(!showDropdown)}
                        title="Profile Options"
                    >
                        {user?.name ? user.name.charAt(0).toUpperCase() : ''}
                    </div>
                    
                    {showDropdown && (
                        <div className="profile-dropdown">
                            <button onClick={handleLogout} className="logout-btn">
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
