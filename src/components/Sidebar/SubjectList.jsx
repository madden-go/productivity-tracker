import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const SubjectList = () => {
    const { user } = useAuth();
    const [subjects, setSubjects] = useState([]);
    const [newSubject, setNewSubject] = useState("");

    useEffect(() => {
        if (user) {
            fetch(`/api/subjects?user_id=${user.id}`)
                .then(r => r.json())
                .then(data => setSubjects(data))
                .catch(err => console.error(err));
        }
    }, [user]);

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!user || !newSubject.trim()) return;
        const colors = ["#FFB7B2", "#ADD8E6", "#B5EAD7", "#E6E6FA", "#FFDAC1"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        try {
            const res = await fetch('/api/subjects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: user.id, name: newSubject, color: randomColor })
            });
            const added = await res.json();
            setSubjects([...subjects, added]);
            setNewSubject("");
        } catch(err) { console.error(err); }
    };

    const handleDelete = async (id) => {
        await fetch(`/api/subjects/${id}`, { method: 'DELETE' });
        setSubjects(subjects.filter(s => s.id !== id));
    };

    return (
        <div className="card">
            <h3 style={{ marginBottom: '12px', fontSize: '1.1rem', color: 'var(--text-main)' }}>Courses</h3>
            <div className="flex-col gap-sm">
                {subjects.map(subject => (
                    <div key={subject.id} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '10px', borderRadius: '12px', border: '1px solid #f0f0f0',
                    }}>
                        <div>
                            <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{subject.name}</div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: subject.color }}></div>
                            <button onClick={() => handleDelete(subject.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--danger-color)' }}>×</button>
                        </div>
                    </div>
                ))}
                
                <form onSubmit={handleAdd} style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    <input 
                        type="text" 
                        value={newSubject}
                        onChange={(e) => setNewSubject(e.target.value)}
                        placeholder="New Course..."
                        style={{ flex: 1, padding: '6px', borderRadius: '6px', border: '1px solid #ddd' }}
                    />
                    <button type="submit" style={{ padding: '6px 12px', borderRadius: '6px', background: 'var(--primary-color)', color: '#fff', border: 'none', cursor: 'pointer' }}>+</button>
                </form>
            </div>
        </div>
    );
};

export default SubjectList;
