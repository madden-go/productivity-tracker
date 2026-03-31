import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const ReminderWidget = () => {
    const { user } = useAuth();
    const [reminders, setReminders] = useState([]);
    const [newReminder, setNewReminder] = useState("");
    const [newDueDate, setNewDueDate] = useState("");

    useEffect(() => {
        if (user) {
            fetch(`${import.meta.env.VITE_API_URL || ''}/api/reminders?user_id=${user.id}`)
                .then(r => r.json())
                .then(data => setReminders(data))
                .catch(err => console.error(err));
        }
    }, [user]);

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!user || !newReminder.trim()) return;
        
        try {
            const res = await fetch((import.meta.env.VITE_API_URL || '') + '/api/reminders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: user.id, title: newReminder, due_date: newDueDate })
            });
            if (!res.ok) throw new Error("Failed to add reminder");
            const added = await res.json();
            setReminders([...reminders, added]);
            setNewReminder("");
            setNewDueDate("");
        } catch(err) { console.error(err); }
    };

    const handleDelete = async (id) => {
        await fetch(`${import.meta.env.VITE_API_URL || ''}/api/reminders/${id}`, { method: 'DELETE' });
        setReminders(reminders.filter(r => r.id !== id));
    };

    return (
        <div className="card" style={{ backgroundColor: 'var(--card-bg)' }}>
            <h3 style={{ marginBottom: '12px', fontSize: '1.1rem', color: 'var(--text-main)' }}>Reminders</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {reminders.map(reminder => (
                    <li key={reminder.id} style={{
                        marginBottom: '8px', padding: '8px', borderRadius: '8px',
                        backgroundColor: reminder.urgent ? 'var(--danger-color)' : 'var(--item-bg)',
                        fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: reminder.urgent ? 'var(--danger-color)' : 'var(--primary-color)' }}></span>
                                {reminder.title}
                            </div>
                            {reminder.due_date && (
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginLeft: '16px', marginTop: '4px' }}>
                                    {new Date(reminder.due_date).toLocaleString()}
                                </span>
                            )}
                        </div>
                        <button onClick={() => handleDelete(reminder.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--danger-color)', padding: '0 4px', alignSelf: 'flex-start' }}>×</button>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleAdd} style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
                <input 
                    type="text" 
                    value={newReminder}
                    onChange={(e) => setNewReminder(e.target.value)}
                    placeholder="New Reminder..."
                    style={{ flex: 1, minWidth: '120px', padding: '6px', borderRadius: '6px', border: '1px solid var(--input-border)', backgroundColor: 'var(--input-bg)', color: 'var(--text-main)' }}
                />
                <input 
                    type="datetime-local" 
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    style={{ padding: '6px', borderRadius: '6px', border: '1px solid var(--input-border)', fontSize: '0.85rem', backgroundColor: 'var(--input-bg)', color: 'var(--text-main)' }}
                />
                <button type="submit" style={{ padding: '6px 12px', borderRadius: '6px', background: 'var(--primary-color)', color: 'var(--btn-text)', border: 'none', cursor: 'pointer' }}>+</button>
            </form>
        </div>
    );
};

export default ReminderWidget;
