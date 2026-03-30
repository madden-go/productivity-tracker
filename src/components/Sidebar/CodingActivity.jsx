import React, { useState, useEffect } from 'react';
import './CodingActivity.css';

const CodingActivity = () => {
    const [githubUser, setGithubUser] = useState(localStorage.getItem('githubUser') || '');
    const [leetcodeUser, setLeetcodeUser] = useState(localStorage.getItem('leetcodeUser') || '');
    const [githubCommits, setGithubCommits] = useState(0);
    const [leetcodeSolved, setLeetcodeSolved] = useState(0);
    const [isEditingGithub, setIsEditingGithub] = useState(false);
    const [isEditingLeetcode, setIsEditingLeetcode] = useState(false);
    const [ghInput, setGhInput] = useState(githubUser);
    const [lcInput, setLcInput] = useState(leetcodeUser);
    const [loadingGh, setLoadingGh] = useState(false);
    const [loadingLc, setLoadingLc] = useState(false);

    useEffect(() => {
        const fetchGh = async () => {
            if (!githubUser) return;
            setLoadingGh(true);
            try {
                // The open-source proxy hangs indefinitely. Native lifetime commits require an Auth Token.
                // Reverting to the fast native REST API to prevent the UI from freezing.
                const res = await fetch(`https://api.github.com/users/${githubUser}`);
                if (res.ok) {
                    const data = await res.json();
                    setGithubCommits(data.public_repos || 0);
                }
            } catch (e) {}
            setLoadingGh(false);
        };
        fetchGh();
    }, [githubUser]);

    useEffect(() => {
        const fetchLc = async () => {
            if (!leetcodeUser) return;
            setLoadingLc(true);
            try {
                const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${leetcodeUser}`);
                if (res.ok) {
                    const data = await res.json();
                    if (data.status === "success") {
                        setLeetcodeSolved(data.totalSolved);
                    }
                }
            } catch (e) {}
            setLoadingLc(false);
        };
        fetchLc();
    }, [leetcodeUser]);

    const saveGithub = (e) => {
        if (e.key === 'Enter' || e.type === 'blur') {
            localStorage.setItem('githubUser', ghInput);
            setGithubUser(ghInput);
            setIsEditingGithub(false);
        }
    };

    const saveLeetcode = (e) => {
        if (e.key === 'Enter' || e.type === 'blur') {
            localStorage.setItem('leetcodeUser', lcInput);
            setLeetcodeUser(lcInput);
            setIsEditingLeetcode(false);
        }
    };

    return (
        <div className="card coding-activity-card">
            <div className="activity-header">
                <h3>Coding Activity</h3>
                <span className="badge">All-Time Stats</span>
            </div>

            <div className="stats-grid">
                <div className="stat-box primary" onClick={() => setIsEditingGithub(true)} style={{cursor: 'pointer'}}>
                    <div className="stat-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                    </div>
                    <div className="stat-info">
                        {isEditingGithub ? (
                            <input 
                                autoFocus 
                                type="text"
                                value={ghInput}
                                onChange={e => setGhInput(e.target.value)}
                                onKeyDown={saveGithub}
                                onBlur={saveGithub}
                                placeholder="GitHub User..."
                                style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid currentColor', color: 'currentColor', outline: 'none' }}
                            />
                        ) : !githubUser ? (
                            <span className="stat-value" style={{fontSize: '0.85rem', fontWeight: 600, padding: '4px 0'}}>Sync to get info</span>
                        ) : (
                            <span className="stat-value" title={`Connected to ${githubUser}`}>
                                {loadingGh ? '...' : githubCommits}
                            </span>
                        )}
                        <p></p>
                        <span className="stat-label">Total Repos</span>
                    </div>
                </div>

                <div className="stat-box secondary" onClick={() => setIsEditingLeetcode(true)} style={{cursor: 'pointer'}}>
                    <div className="stat-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                    <div className="stat-info">
                        {isEditingLeetcode ? (
                            <input 
                                autoFocus 
                                type="text"
                                value={lcInput}
                                onChange={e => setLcInput(e.target.value)}
                                onKeyDown={saveLeetcode}
                                onBlur={saveLeetcode}
                                placeholder="LeetCode..."
                                style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid currentColor', color: 'currentColor', outline: 'none' }}
                            />
                        ) : !leetcodeUser ? (
                            <span className="stat-value" style={{fontSize: '0.85rem', fontWeight: 600, padding: '4px 0'}}>Sync to get info</span>
                        ) : (
                            <span className="stat-value" title={`Connected to ${leetcodeUser}`}>{loadingLc ? '...' : leetcodeSolved}</span>
                        )}
                        <p></p>
                        <span className="stat-label">Total Solved</span>
                    </div>
                </div>

                <div className="stat-box accent">
                    <div className="stat-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    </div>
                    <div className="stat-info">
                        <span className="stat-value">5.2h</span>
                        <p></p>
                        <span className="stat-label">Time Coded</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodingActivity;
