import { Component } from 'react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'; // Fixed import
import { getDaysInMonth, getFirstDayOfMonth } from '../DateUtils/DateUtils';
import Days from '../Days/Days';
import './CalendarBody.css';

class CalendarBody extends Component {
  state = { activeDay: 0};

  constructor(props) {
    super(props);

    const { month, year } = props;

    this.state = {
      daysInMonth: getDaysInMonth(month, year),
      firstDayIndex: getFirstDayOfMonth(month, year),
      today: new Date(),
    };
  }

  componentDidUpdate(prevProps) {
    const { month, year } = this.props;

    // Check if month or year props have changed
    if (month !== prevProps.month || year !== prevProps.year) {
      this.setState({
        daysInMonth: getDaysInMonth(month, year),
        firstDayIndex: getFirstDayOfMonth(month, year),
      });
    }
  }

  onClickDay = (day) => {
    this.setState({ activeDay: day });
  };

  getMonthName = (monthNumber) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return monthNames[monthNumber]; // Adjusted for zero-based index
  };

  render() {
    const { onPrevious, onNext, month, year } = this.props;
    const { daysInMonth, firstDayIndex } = this.state;

    const daysArray = Array.from({ length: daysInMonth }, (_, index) => index + 1);
    const startOffset = Array.from({ length: firstDayIndex }, () => null);
    const monthString = this.getMonthName(month);

    const isToday = (day) => {
      const currentDate = new Date();
      return (
        currentDate.getDate() === day &&
        currentDate.getMonth() === month &&
        currentDate.getFullYear() === year
      );
    };

    return (
      <div className="calendar">
        <div className="calendar-controls">
          <button onClick={onPrevious} className='header-btn'><FaArrowLeft /> Previous</button>
          <h2 className="tracking-in-expand-fwd">
            {new Date(year, month).toLocaleString('default', { month: 'long' })} {year}
          </h2>
          <button onClick={onNext} className='header-btn'>Next <FaArrowRight /></button>
        </div>
        <div className="calendar-body">
          <button className='week'>Monday</button>
          <button className='week'>Tuesday</button>
          <button className='week'>Wednesday</button>
          <button className='week'>Thursday</button>
          <button className='week'>Friday</button>
          <button className='week'>Saturday</button>
          <button className='week'>Sunday</button>
          {startOffset.map((_, index) => (
            <div key={`empty-${index}`} className="day empty"></div>
          ))}
          {daysArray.map((day) => (
            <Days
              key={day}
              day={day}
              month={monthString}
              year={year}
              onClickDay={this.onClickDay}
              presentDay={isToday(day)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default CalendarBody;
