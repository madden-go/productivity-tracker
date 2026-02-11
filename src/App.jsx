import { useState } from 'react';
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
=======
>>>>>>> 5177397df4a60232f23e16c446e5470f937eaad5
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
<<<<<<< HEAD
import CalendarWidget from './components/Widgets/CalendarWidget';
import Pet from './components/Pet/Pet';
// Pages
import CalendarPage from './pages/CalendarPage';
// global styles are imported in main.jsx

function AppContent() {
  // -- State Lifted from TodoList --
  const [tasks, setTasks] = useState([
    { id: 1, text: "Finish React project", completed: false },
    { id: 2, text: "Read Chapter 4", completed: true },
    { id: 3, text: "Email professor", completed: false },
  ]);

  const addTask = (taskText) => {
    setTasks([...tasks, { id: Date.now(), text: taskText, completed: false }]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // -- State Lifted from HabitTracker --
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

  // -- State Lifted from MoodTracker --
  const [selectedMood, setSelectedMood] = useState(null);

  return (
    <div className="app-container">
      <Navbar />

      <Routes>
        <Route path="/" element={
          <MainLayout>
            {/* Column 1 - Left */}
            <div className="flex-col gap-lg">
              <CalendarWidget />
              <ReminderWidget />
              <SubjectList />
              <MoodTracker selectedMood={selectedMood} setSelectedMood={setSelectedMood} />
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
              <HabitTracker habits={habits} toggleHabit={toggleHabit} />
              {/* Journal can go below or flexible */}
              <div style={{ height: '150px' }}>
                <JournalWidget />
              </div>
            </div>
          </MainLayout>
        } />

        <Route path="/calendar" element={
          <CalendarPage
            tasks={tasks}
            habits={habits}
            mood={selectedMood}
          />
        } />
      </Routes>

      <Pet />
      <SpotifyWidget />
=======
import CalendarDrawer from './components/Calendar/CalendarDrawer';
import Pet from './components/Pet/Pet';
// global styles are imported in main.jsx

function App() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const toggleCalendar = () => setIsCalendarOpen(!isCalendarOpen);

  return (
    <div className="app-container">
      <Navbar toggleCalendar={toggleCalendar} />

      <MainLayout>
        {/* Column 1 */}
        <div className="flex-col gap-lg">
          <ReminderWidget />
          <SubjectList />
          <MoodTracker />
        </div>

        {/* Column 2 - Center (Tasks + Time Split) */}
        <div className="flex-col gap-lg">
          <div style={{ height: '400px' }}>
            <TodoList />
          </div>
          <div style={{ height: '220px' }}>
            <TimeSplit />
          </div>
        </div>

        {/* Column 3 - Corner (Coding Activity + Props) */}
        <div className="flex-col gap-lg">
          <div>
            <CodingActivity />
          </div>
          <HabitTracker />
          <div className="flex gap-lg">
            <SpotifyWidget />
          </div>
          {/* Journal can go below or flexible */}
          <div style={{ height: '150px' }}>
            <JournalWidget />
          </div>
        </div>
      </MainLayout>

      <CalendarDrawer isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />
      <Pet />
>>>>>>> 5177397df4a60232f23e16c446e5470f937eaad5
    </div>
  );
}

<<<<<<< HEAD
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

=======
>>>>>>> 5177397df4a60232f23e16c446e5470f937eaad5
export default App;
