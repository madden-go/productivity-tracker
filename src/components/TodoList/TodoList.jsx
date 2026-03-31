import React, { useState } from 'react';
import './TodoList.css';

const TodoList = ({ tasks, addTask, toggleTask, deleteTask }) => {
    const [newTask, setNewTask] = useState("");

    const handleAddTask = (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;

        addTask(newTask);
        setNewTask("");
    };


    return (
        <div className="card todo-card">
            <div className="header">
                <h2>Tasks</h2>
                <span className="task-count">{tasks.filter(t => !t.completed).length} remaining</span>
            </div>

            <form onSubmit={handleAddTask} className="add-task-form">
                <input
                    type="text"
                    placeholder="Add a new task..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <button type="submit" className="add-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </button>
            </form>

            <div className="task-list">
                {tasks.length === 0 ? (
                    <div className="empty-state">No tasks for today! 🎉</div>
                ) : (
                    tasks.map(task => (
                        <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                            <div className="checkbox-wrapper" onClick={() => toggleTask(task.id)}>
                                <div className={`custom-checkbox ${task.completed ? 'checked' : ''}`}>
                                    {task.completed && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                                </div>
                            </div>
                            <span className="task-text">{task.text}</span>
                            <button
                                className="delete-btn"
                                onClick={() => deleteTask(task.id)}
                                aria-label="Delete task"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TodoList;
