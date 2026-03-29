import React from 'react';

import './CalendarPage.css';

const CalendarPage = ({ tasks, habits, mood }) => {
    // const navigate = useNavigate(); // Not used currently

    // Mock Date Generation for "Current Month" (e.g., September 2026 based on previous mock)
    // Actually, let's use the real date or a fixed mock that matches the user's "September 2026" from the drawer
    // The user's prompt said "ensure that the dates are the current date".
    // I'll grab the current real date.

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0-indexed
    const todayDate = now.getDate();

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // 0 (Sun) - 6 (Sat)

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Generate calendar grid array
    const calendarDays = [];

    // Empty slots for days before the 1st
    for (let i = 0; i < firstDayOfMonth; i++) {
        calendarDays.push({ type: 'empty', key: `empty-${i}` });
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        calendarDays.push({ type: 'day', day, key: `day-${day}` });
    }

    // Helpers to get data for "Today"
    const getTopTask = () => {
        const uncompleted = tasks.filter(t => !t.completed);
        return uncompleted.length > 0 ? uncompleted[0].text : "All caught up!";
    };

    const getHabitScore = () => {
        if (habits.length === 0) return 0;
        const completed = habits.filter(h => h.completed).length;
        return (completed / habits.length) * 100;
    };

    const getMoodEmoji = () => {
        if (mood === null) return null;
        const moods = ["😊", "😐", "😔", "😤"];
        return moods[mood];
    };

    return (
        <div className="calendar-page">
            <div className="calendar-header">
                <h1>{monthNames[currentMonth]} {currentYear}</h1>
                <div style={{ width: '100px' }}></div> {/* Spacer for centering if needed */}
            </div>

            <div className="calendar-grid-full">
                {weekDays.map(day => (
                    <div key={day} className="weekday-header">{day}</div>
                ))}

                {calendarDays.map((item) => {
                    if (item.type === 'empty') {
                        return <div key={item.key} className="calendar-day-tile empty"></div>;
                    }

                    const isToday = item.day === todayDate;

                    return (
                        <div key={item.key} className={`calendar-day-tile ${isToday ? 'today' : ''}`}>
                            <div className="date-number">{item.day}</div>

                            {isToday && (
                                <div className="day-content">
                                    {/* Top Task */}
                                    <div className="content-row" title="Top Priority Task">
                                        <span style={{ fontSize: '1rem' }}>📌</span>
                                        <div className="task-preview">{getTopTask()}</div>
                                    </div>

                                    {/* Habit Score */}
                                    <div className="content-row" title="Habit Completion">
                                        <span style={{ fontSize: '1rem' }}>🔥</span>
                                        <div className="habit-score">
                                            <div
                                                className="habit-progress"
                                                style={{ width: `${getHabitScore()}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Mood */}
                                    <div className="content-row" title="Mood">
                                        <span style={{ fontSize: '1.2rem' }}>
                                            {getMoodEmoji() || <span style={{ opacity: 0.3, fontSize: '1rem' }}>No mood set</span>}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CalendarPage;
