import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CalendarDrawer.css';

const CalendarDrawer = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

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
                    <h3>Upcoming Events</h3>
                    <div className="event-item">
                        <div className="event-date">12</div>
                        <div className="event-info">
                            <h4>Math Assignment</h4>
                            <p>11:59 PM</p>
                        </div>
                    </div>
                    <div className="event-item">
                        <div className="event-date">15</div>
                        <div className="event-info">
                            <h4>Study Group</h4>
                            <p>2:00 PM - Library</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CalendarDrawer;
