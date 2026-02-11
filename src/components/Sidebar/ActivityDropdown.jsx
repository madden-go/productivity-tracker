import React from 'react';

const ActivityDropdown = () => {
    return (
        <div className="card">
            <details style={{ cursor: 'pointer' }}>
                <summary style={{
                    fontWeight: '600',
                    color: 'var(--text-main)',
                    listStyle: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <span>Coding Activity</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </summary>
                <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #eee' }}>
                    <div className="stat-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                        <span>GitHub Commits</span>
                        <span style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>14</span>
                    </div>
                    <div className="stat-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                        <span>LeetCode Solved</span>
                        <span style={{ fontWeight: 'bold', color: 'var(--secondary-accent)' }}>3</span>
                    </div>
                    <div className="stat-row" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                        <span>Hours Coded</span>
                        <span style={{ fontWeight: 'bold', color: 'var(--accent-color)' }}>5.2h</span>
                    </div>
                </div>
            </details>
        </div>
    );
}

export default ActivityDropdown;
