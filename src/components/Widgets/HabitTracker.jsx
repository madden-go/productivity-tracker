import React, { useState } from 'react';

const HabitTracker = () => {
    const [habits, setHabits] = useState([
        { id: 1, name: "Drink Water", streak: 5, completed: false },
        { id: 2, name: "Read 30 mins", streak: 12, completed: true },
        { id: 3, name: "Meditate", streak: 3, completed: false },
    ]);

    const toggleHabit = (id) => {
        setHabits(habits.map(h =>
            h.id === id ? { ...h, completed: !h.completed, streak: h.completed ? h.streak - 1 : h.streak + 1 } : h
        ));
    };

    return (
        <div className="card">
            <h3 style={{ marginBottom: '12px', fontSize: '1.1rem', color: 'var(--text-main)' }}>Habits</h3>
            <div className="flex-col gap-sm">
                {habits.map(habit => (
                    <div key={habit.id}
                        onClick={() => toggleHabit(habit.id)}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '10px',
                            backgroundColor: habit.completed ? 'rgba(181, 234, 215, 0.3)' : '#f9f9f9',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        <span style={{
                            textDecoration: habit.completed ? 'line-through' : 'none',
                            color: habit.completed ? 'var(--text-light)' : 'var(--text-main)'
                        }}>{habit.name}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}>
                            <span role="img" aria-label="fire">🔥</span>
                            <span>{habit.streak}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HabitTracker;
