import { useState } from 'react';
import CalendarBody from './components/CalendarBody/CalendarBody.js';
import './App.css';

const App = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className="app" basename="/add-events">
      <CalendarBody 
        month={currentMonth} 
        year={currentYear} 
        onPrevious={handlePreviousMonth} 
        onNext={handleNextMonth} 
      />
    </div>
  );
};

export default App;
