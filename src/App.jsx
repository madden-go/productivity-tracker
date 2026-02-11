import { useState } from 'react';
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
    </div>
  );
}

export default App;
