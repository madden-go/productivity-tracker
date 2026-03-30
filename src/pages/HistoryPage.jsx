import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar/Navbar';
import MainLayout from '../components/Layout/MainLayout';
import './HistoryPage.css';

const HistoryPage = () => {
    const { user } = useAuth();
    const [journals, setJournals] = useState([]);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (user) {
            // Fetch all journals
            fetch(`/api/journals?user_id=${user.id}`)
                .then(r => r.json())
                .then(data => setJournals(data))
                .catch(err => console.error(err));
            
            // Fetch all tasks
            fetch(`/api/tasks?user_id=${user.id}`)
                .then(r => r.json())
                .then(data => setTasks(data))
                .catch(err => console.error(err));
        }
    }, [user]);

    const completedTasks = tasks.filter(t => t.completed);
    const pendingTasks = tasks.filter(t => !t.completed);

    return (
        <MainLayout>
            <div className="history-container">
                {/* Left Column - Journal History */}
                <div className="history-col">
                    <h2 className="history-title">Journal Archive</h2>
                    <div className="journal-feed">
                        {journals.length === 0 ? (
                            <p className="history-empty">No journal entries found. Navigate to the Dashboard to write your first entry!</p>
                        ) : (
                            journals.map(journal => (
                                <div key={journal.id} className="journal-card">
                                    <h4 className="journal-date">{new Date(journal.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h4>
                                    <p className="journal-text">{journal.entry}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Right Column - Task Timeline */}
                <div className="history-col">
                    <h2 className="history-title">Task Timeline</h2>
                    
                    <div className="timeline-section">
                        <h3 className="timeline-heading success">Completed Operations</h3>
                        <div className="timeline">
                            {completedTasks.length === 0 ? (
                                <p className="history-empty">No completed tasks yet.</p>
                            ) : (
                                completedTasks.map(task => (
                                    <div key={task.id} className="timeline-item">
                                        <div className="timeline-dot success"></div>
                                        <div className="timeline-content">
                                            <p className="timeline-text completed">{task.text}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="timeline-section" style={{ marginTop: '30px' }}>
                        <h3 className="timeline-heading pending">Pending Operations</h3>
                        <div className="timeline">
                            {pendingTasks.length === 0 ? (
                                <p className="history-empty">All caught up!</p>
                            ) : (
                                pendingTasks.map(task => (
                                    <div key={task.id} className="timeline-item">
                                        <div className="timeline-dot pending"></div>
                                        <div className="timeline-content">
                                            <p className="timeline-text">{task.text}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default HistoryPage;
