import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const JournalWidget = () => {
    const { user } = useAuth();
    const [entry, setEntry] = useState('');

    useEffect(() => {
        if (user) {
            const today = new Date().toISOString().split('T')[0];
            fetch(`/api/journals?user_id=${user.id}&date=${today}`)
                .then(r => r.json())
                .then(data => {
                    if (data && data.entry) {
                        setEntry(data.entry);
                    }
                })
                .catch(err => console.error(err));
        }
    }, [user]);

    const handleBlur = async () => {
        if (!user || !entry.trim()) return;
        const today = new Date().toISOString().split('T')[0];
        try {
            await fetch('/api/journals', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: user.id, entry, date: today })
            });
        } catch (err) {
            console.error("Failed to save journal", err);
        }
    };

    return (
        <div className="card" style={{ flex: 1 }}>
            <h3 style={{ marginBottom: '12px', fontSize: '1.1rem', color: 'var(--text-main)' }}>Journal</h3>
            <textarea
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                onBlur={handleBlur}
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
