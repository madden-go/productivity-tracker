import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import MainLayout from './components/Layout/MainLayout';

// Components
import ReminderWidget from './components/Sidebar/ReminderWidget';
import SubjectList from './components/Sidebar/SubjectList';
import CodingActivity from './components/Sidebar/CodingActivity';
import TodoList from './components/TodoList/TodoList';
import HabitTracker from './components/Widgets/HabitTracker';
import MoodTracker from './components/Widgets/MoodTracker';
import JournalWidget from './components/Widgets/JournalWidget';
import SpotifyWidget from './components/Widgets/SpotifyWidget';
import TimeSplit from './components/Widgets/TimeSplit';
import CalendarDrawer from './components/Calendar/CalendarDrawer';
import Pet from './components/Pet/Pet';

// Pages
import CalendarPage from './pages/CalendarPage';
import Login from './pages/Login';
import Register from './pages/Register';
import HistoryPage from './pages/HistoryPage';

// Auth
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const { user } = useAuth();

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const toggleCalendar = () => setIsCalendarOpen(!isCalendarOpen);

  const [tasks, setTasks] = useState([]);
  const [habits, setHabits] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);

  useEffect(() => {
    // Catch Spotify PKCE Callback from Query String
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      const clientId = localStorage.getItem('spotify_client_id');
      const verifier = localStorage.getItem('spotify_code_verifier');
      
      if (clientId && verifier) {
        const payload = {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            client_id: clientId,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: window.location.origin,
            code_verifier: verifier,
          }),
        };

        fetch('https://accounts.spotify.com/api/token', payload)
          .then(res => res.json())
          .then(data => {
            if (data.access_token) {
              localStorage.setItem('spotify_token', data.access_token);
              if (data.refresh_token) {
                  localStorage.setItem('spotify_refresh_token', data.refresh_token);
              }
              window.history.replaceState({}, document.title, '/');
              window.dispatchEvent(new Event('storage'));
            }
          })
          .catch(err => console.error('Spotify token exchange failed', err));
      } else {
        window.history.replaceState({}, document.title, '/');
      }
    }

    if (user) {
      // Fetch tasks
      fetch(`${import.meta.env.VITE_API_URL || ''}/api/tasks?user_id=${user.id}`).then(r => r.json()).then(data => setTasks(data));
      // Fetch habits
      fetch(`${import.meta.env.VITE_API_URL || ''}/api/habits?user_id=${user.id}`).then(r => r.json()).then(data => setHabits(data));
      
      // Fetch today's mood
      const today = new Date().toISOString().split('T')[0];
      fetch(`${import.meta.env.VITE_API_URL || ''}/api/moods?user_id=${user.id}&date=${today}`).then(r => r.json()).then(data => {
        if (data && data.mood !== undefined) {
          setSelectedMood(parseInt(data.mood));
        }
      });
    } else {
      setTasks([]);
      setHabits([]);
      setSelectedMood(null);
    }
  }, [user]);

  const addTask = async (taskText) => {
    if (!user) return;
    const res = await fetch((import.meta.env.VITE_API_URL || '') + '/api/tasks', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: user.id, text: taskText })
    });
    if (!res.ok) { console.error("Failed to add task"); return; }
    const newTask = await res.json();
    setTasks([...tasks, newTask]);
  };

  const toggleTask = async (id) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    const newStatus = !task.completed;
    await fetch(`${import.meta.env.VITE_API_URL || ''}/api/tasks/${id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: newStatus })
    });
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: newStatus } : t));
  };

  const deleteTask = async (id) => {
    await fetch(`${import.meta.env.VITE_API_URL || ''}/api/tasks/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter(t => t.id !== id));
  };

  const addHabit = async (habitName) => {
    if (!user) return;
    const res = await fetch((import.meta.env.VITE_API_URL || '') + '/api/habits', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: user.id, name: habitName })
    });
    if (!res.ok) { console.error("Failed to add habit"); return; }
    const newHabit = await res.json();
    setHabits([...habits, newHabit]);
  };

  const deleteHabit = async (id) => {
    await fetch(`${import.meta.env.VITE_API_URL || ''}/api/habits/${id}`, { method: 'DELETE' });
    setHabits(habits.filter(h => h.id !== id));
  };

  const toggleHabit = async (id) => {
    const habit = habits.find(h => h.id === id);
    if (!habit) return;
    const newStatus = !habit.completed;
    const newStreak = newStatus ? habit.streak + 1 : habit.streak - 1;
    await fetch(`${import.meta.env.VITE_API_URL || ''}/api/habits/${id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: newStatus, streak: newStreak })
    });
    setHabits(habits.map(h => h.id === id ? { ...h, completed: newStatus, streak: newStreak } : h));
  };

  const handleSetSelectedMood = async (moodIndex) => {
    if (!user) return;
    const today = new Date().toISOString().split('T')[0];
    await fetch((import.meta.env.VITE_API_URL || '') + '/api/moods', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: user.id, date: today, mood: moodIndex.toString() })
    });
    setSelectedMood(moodIndex);
  };

  return (
    <div className="app-container">
      {!isAuthPage && <Navbar toggleCalendar={toggleCalendar} />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/" element={
          <ProtectedRoute>
            <MainLayout>
              {/* Column 1 - Left */}
              <div className="flex-col gap-lg">
                <ReminderWidget />
                <SubjectList />
                <MoodTracker selectedMood={selectedMood} setSelectedMood={handleSetSelectedMood} />
              </div>

              {/* Column 2 - Center (Time Split + Tasks) */}
              <div className="flex-col gap-lg">
                <div style={{ height: '350px' }}>
                  <TimeSplit />
                </div>
                <div style={{ height: '400px' }}>
                  <TodoList tasks={tasks} addTask={addTask} toggleTask={toggleTask} deleteTask={deleteTask} />
                </div>
              </div>

              {/* Column 3 - Right (Coding Activity + Props) */}
              <div className="flex-col gap-lg">
                <div>
                  <CodingActivity />
                </div>
                <HabitTracker habits={habits} toggleHabit={toggleHabit} addHabit={addHabit} deleteHabit={deleteHabit} />
                <div style={{ height: '150px' }}>
                  <JournalWidget />
                </div>
              </div>
            </MainLayout>
          </ProtectedRoute>
        } />

        {/* Fallback support for older CalendarPage if needed */}
        <Route path="/calendar" element={
          <ProtectedRoute>
            <CalendarPage
              tasks={tasks}
              habits={habits}
              mood={selectedMood}
            />
          </ProtectedRoute>
        } />

        <Route path="/history" element={
          <ProtectedRoute>
            <HistoryPage />
          </ProtectedRoute>
        } />
      </Routes>

      {!isAuthPage && <CalendarDrawer isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />}
      <Pet isAuthPage={isAuthPage} />
      {!isAuthPage && <SpotifyWidget />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
