import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './CalendarDrawer.css';

const CalendarDrawer = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { user } = useAuth();
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

    const [currentDate, setCurrentDate] = useState(new Date());

    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

    const handlePrevMonth = () => setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    const handleNextMonth = () => setCurrentDate(new Date(currentYear, currentMonth + 1, 1));

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    return (
        <>
            <div className={`overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
            <div className={`calendar-drawer ${isOpen ? 'open' : ''}`}>
                <div className="drawer-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <button onClick={handlePrevMonth} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: 'var(--text-main)' }}>&lt;</button>
                        <h2 style={{ margin: 0 }}>{monthNames[currentMonth]} {currentYear}</h2>
                        <button onClick={handleNextMonth} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: 'var(--text-main)' }}>&gt;</button>
                    </div>
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
                    {emptyDays.map(empty => (
                        <div key={`empty-${empty}`} className="empty-day"></div>
                    ))}
                    {days.map(day => {
                        const isToday = new Date().getDate() === day && new Date().getMonth() === currentMonth && new Date().getFullYear() === currentYear;
                        return (
                            <div key={day} className={`day-cell ${isToday ? 'today' : ''}`}>
                                {day}
                            </div>
                        );
                    })}
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
                                        <h4>{rem.title}</h4>
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
