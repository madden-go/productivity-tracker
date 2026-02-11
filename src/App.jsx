import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import MainLayout from './components/Layout/MainLayout';
import ReminderWidget from './components/Sidebar/ReminderWidget';
import SubjectList from './components/Sidebar/SubjectList';
import ActivityDropdown from './components/Sidebar/ActivityDropdown';
import TodoList from './components/TodoList/TodoList';
import HabitTracker from './components/Widgets/HabitTracker';
import MoodTracker from './components/Widgets/MoodTracker';
import JournalWidget from './components/Widgets/JournalWidget';
import SpotifyWidget from './components/Widgets/SpotifyWidget';
import CalendarDrawer from './components/Calendar/CalendarDrawer';
import Pet from './components/Pet/Pet';
// global styles are imported in main.jsx

function App() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const toggleCalendar = () => setIsCalendarOpen(!isCalendarOpen);

  const LeftSidebar = () => (
    <div className="flex-col gap-lg">
      <ReminderWidget />
      <SubjectList />
      <ActivityDropdown />
    </div>
  );

  const RightSidebar = () => (
    <div className="flex-col gap-lg">
      <HabitTracker />
      <MoodTracker />
      <JournalWidget />
      <SpotifyWidget />
    </div>
  );

  return (
    <div className="app-container">
      <Navbar toggleCalendar={toggleCalendar} />

      <MainLayout
        leftColumn={<LeftSidebar />}
        centerColumn={<div style={{ height: '100%' }}><TodoList /></div>}
        rightColumn={<RightSidebar />}
      />

      <CalendarDrawer isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />
      <Pet />
    </div>
  );
}

export default App;
