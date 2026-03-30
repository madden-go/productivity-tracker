import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './CalendarDrawer.css';

const CalendarDrawer = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [reminders, setReminders] = useState([]);

    useEffect(() => {
        if (isOpen && user?.id) {
            fetch(`/api/reminders?user_id=${user.id}`)
                .then(res => { if(res.ok) return res.json(); throw new Error('Failed to fetch'); })
                .then(data => setReminders(Array.isArray(data) ? data : []))
                .catch(err => console.error(err));
        }
    }, [isOpen, user]);

    const handleOpenFullCalendar = () => {
        onClose();
        navigate('/calendar');
    };

    // Simple mock calendar grid
    const days = Array.from({ length: 30 }, (_, i) => i + 1);
    const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    return (
        <>
            <div className={`overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
            <div className={`calendar-drawer ${isOpen ? 'open' : ''}`}>
                <div className="drawer-header">
                    <h2>September 2026</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div style={{ padding: '0 20px 10px' }}>
                    <button
                        onClick={handleOpenFullCalendar}
                        style={{
                            width: '100%',
                            padding: '10px',
                            backgroundColor: 'var(--primary-color)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: '600'
                        }}
                    >
                        View Full Calendar 📅
                    </button>
                </div>

                <div className="calendar-grid">

                    {weekDays.map(day => (
                        <div key={day} className="day-name">{day}</div>
                    ))}
                    <div className="empty-day"></div>
                    <div className="empty-day"></div>
                    {days.map(day => (
                        <div key={day} className={`day-cell ${day === 11 ? 'today' : ''}`}>
                            {day}
                        </div>
                    ))}
                </div>

                <div className="events-section">
                    <h3>Upcoming Reminders</h3>
                    {reminders.length === 0 ? (
                        <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>No upcoming reminders.</p>
                    ) : (
                        reminders.slice(0, 5).map(rem => {
                            const dateObj = rem.due_date ? new Date(rem.due_date) : new Date();
                            const day = dateObj.getDate();
                            const timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                            return (
                                <div key={rem.id} className="event-item">
                                    <div className="event-date">{day}</div>
                                    <div className="event-info">
                                        <h4>{rem.text}</h4>
                                        <p style={{ color: rem.urgent ? 'var(--danger-color)' : 'var(--text-light)' }}>
                                            {rem.urgent ? '🚨 ' : ''}{timeStr}
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </>
    );
};

export default CalendarDrawer;
