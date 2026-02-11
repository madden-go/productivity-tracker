import React from 'react';

const JournalWidget = () => {
    return (
        <div className="card" style={{ flex: 1 }}>
            <h3 style={{ marginBottom: '12px', fontSize: '1.1rem', color: 'var(--text-main)' }}>Journal</h3>
            <textarea
                placeholder="Write your thoughts..."
                style={{
                    width: '100%',
                    height: '100px',
                    resize: 'none',
                    border: '1px solid #eee',
                    borderRadius: '12px',
                    padding: '10px',
                    fontSize: '0.9rem',
                    backgroundColor: '#fafafa'
                }}
            ></textarea>
        </div>
    );
};

export default JournalWidget;
