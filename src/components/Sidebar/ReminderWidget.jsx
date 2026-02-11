import React from 'react';

const ReminderWidget = () => {
    const reminders = [
        { id: 1, text: "Math Assignment due tomorrow", urgent: true },
        { id: 2, text: "Register for next semester", urgent: false },
        { id: 3, text: "Call mom", urgent: false },
    ];

    return (
        <div className="card" style={{ backgroundColor: 'var(--card-bg)' }}>
            <h3 style={{ marginBottom: '12px', fontSize: '1.1rem', color: 'var(--text-main)' }}>Reminders</h3>
            <ul style={{ listStyle: 'none' }}>
                {reminders.map(reminder => (
                    <li key={reminder.id} style={{
                        marginBottom: '8px',
                        padding: '8px',
                        borderRadius: '8px',
                        backgroundColor: reminder.urgent ? 'rgba(255, 183, 178, 0.2)' : '#f5f5f5',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <span style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: reminder.urgent ? 'var(--danger-color)' : 'var(--primary-color)'
                        }}></span>
                        {reminder.text}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReminderWidget;
