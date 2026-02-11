import React from 'react';
import './CodingActivity.css';

const CodingActivity = () => {
    return (
        <div className="card coding-activity-card">
            <div className="activity-header">
                <h3>Coding Activity</h3>
                <span className="badge">Weekly Stats</span>
            </div>

            <div className="stats-grid">
                <div className="stat-box primary">
                    <div className="stat-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                    </div>
                    <div className="stat-info">
                        <span className="stat-value">14</span>
                        <span className="stat-label">GitHub Commits</span>
                    </div>
                </div>

                <div className="stat-box secondary">
                    <div className="stat-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                    <div className="stat-info">
                        <span className="stat-value">3</span>
                        <span className="stat-label">LeetCode Problems</span>
                    </div>
                </div>

                <div className="stat-box accent">
                    <div className="stat-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    </div>
                    <div className="stat-info">
                        <span className="stat-value">5.2h</span>
                        <span className="stat-label">Time Coded</span>
                    </div>
                </div>
            </div>

            {/* Chart removed to prevent layout overlap */}
        </div>
    );
};

export default CodingActivity;
