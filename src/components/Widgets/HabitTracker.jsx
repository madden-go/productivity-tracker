import React, { useState } from 'react';

const HabitTracker = ({ habits, toggleHabit, addHabit, deleteHabit }) => {
    const [newHabit, setNewHabit] = useState('');

    const handleAdd = (e) => {
        e.preventDefault();
        if (newHabit.trim()) {
            addHabit(newHabit);
            setNewHabit('');
        }
    };

    return (
        <div className="card">
            <h3 style={{ marginBottom: '12px', fontSize: '1.1rem', color: 'var(--text-main)' }}>Habits</h3>
            <div className="flex-col gap-sm">
                {habits.map(habit => (
                    <div key={habit.id}
                        style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            padding: '10px', backgroundColor: habit.completed ? 'var(--item-bg-hover)' : 'var(--item-bg)',
                            borderRadius: '12px', transition: 'all 0.2s', borderLeft: habit.completed ? '4px solid var(--success-color)' : '4px solid transparent'
                        }}
                    >
                        <span 
                            onClick={() => toggleHabit(habit.id)}
                            style={{
                                flex: 1, cursor: 'pointer',
                                textDecoration: habit.completed ? 'line-through' : 'none',
                                color: habit.completed ? 'var(--text-light)' : 'var(--text-main)'
                            }}>{habit.name}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
                            <span role="img" aria-label="fire">🔥</span>
                            <span>{habit.streak}</span>
                            <button onClick={() => deleteHabit(habit.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--danger-color)', padding: '0 4px', fontSize: '1.1rem' }}>×</button>
                        </div>
                    </div>
                ))}
                <form onSubmit={handleAdd} style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    <input 
                        type="text" 
                        value={newHabit}
                        onChange={(e) => setNewHabit(e.target.value)}
                        placeholder="New Habit..."
                        style={{ flex: 1, padding: '6px', borderRadius: '6px', border: '1px solid var(--input-border)', backgroundColor: 'var(--input-bg)', color: 'var(--text-main)' }}
                    />
                    <button type="submit" style={{ padding: '6px 12px', borderRadius: '6px', background: 'var(--primary-color)', color: 'var(--btn-text)', border: 'none', cursor: 'pointer' }}>+</button>
                </form>
            </div>
        </div>
    );
};

export default HabitTracker;
