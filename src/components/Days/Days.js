import { Component } from 'react';
import Popup from 'reactjs-popup';
import './Days.css';

class Days extends Component {
  state = {
    displayForm: false,
    eventsList: [],
    name: '',
    time: '00:00',
    description: '',
    isEventExists: false,
  };

  onClickDate = () => {
    this.props.onClickDay(this.props.day); // Pass the day number back to the parent component
  };

  // Event handler to toggle form display
  toggleFormDisplay = () => {
    this.setState((prevState) => ({ displayForm: !prevState.displayForm }));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onSubmitForm = (event) => {
    event.preventDefault();
    const { day, month, year } = this.props;
    const { name, time, description } = this.state;
    const eventDetails = {
      eventName: name,
      time: time,
      description: description,
      id: `${day}-${month}-${year}`,
    };

    this.setState((prevState) => ({
      eventsList: [...prevState.eventsList, eventDetails],
      displayForm: false,  // Close the form after submission
      name: '',  // Reset form fields
      time: '00:00',
      description: '',
      isEventExists: true,
    }));
  };

  renderForm = () => {
    return (
      <div className="form-container">
        <h1 className='form-heading'>Add a new event</h1>
        <hr className='line' />
        <form onSubmit={this.onSubmitForm}>
          <div className='input-cont'>
            <label htmlFor="name" className='labelElement'>Event Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              className='inputEl'
              value={this.state.name}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className='input-cont'>
            <label htmlFor="time" className='labelElement'>Time:</label>
            <select
              id="time"
              name="time"
              className='inputEl'
              value={this.state.time}
              onChange={this.handleChange}
              required
            >
              <option value="00:00">00:00</option>
              <option value="03:00">03:00</option>
              <option value="06:00">06:00</option>
              <option value="09:00">09:00</option>
              <option value="12:00">12:00</option>
              <option value="15:00">15:00</option>
              <option value="18:00">18:00</option>
              <option value="21:00">21:00</option>
              <option value="24:00">24:00</option>
            </select>
          </div>
          <div className='input-cont'>
            <label htmlFor="description" className='labelElement'>Description:</label>
            <textarea
              id="description"
              name="description"
              className='DescInputEl'
              value={this.state.description}
              onChange={this.handleChange}
              required
            />
          </div>
          {/* Submit Button */}
          <button type="submit" className='add-event-btn'>Add Event</button>
        </form>
      </div>
    );
  };

  renderPopupContent = (close) => {
    const { day, month, year } = this.props;
    const presentDayId = `${day}-${month}-${year}`;
    const { eventsList} = this.state;

    return (
      <div className="popup-cont">
        <div className="popup-header-cont">
          <h1 className="date-heading">
            {month} {day} {year}
          </h1>
          <button className="button" onClick={() => close()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
              ></path>
            </svg>
            <div className="text">Back</div>
          </button>
        </div>
        <hr className="line" />
        <button className="add-event" onClick={this.toggleFormDisplay}>
          + Add Event
        </button>
        <ul className='events-list-cont'>
          {eventsList
            .filter((eachItem) => eachItem.id === presentDayId)
            .map((eachItem, index) => (
              <li key={index} className='list-cont'>
                <div className='event-head'>
                  <h1 className='para'>{eachItem.eventName}</h1>
                  <p className='time'>{eachItem.time}</p>
                </div>
                <p className='description'>{eachItem.description}</p>
              </li>
            ))}
        </ul>
      </div>
    );
  };

  render() {
    const { day, presentDay} = this.props;
    const { displayForm, isEventExists } = this.state;

    return (
      <Popup
        modal
        trigger={
          <button
            className={`day ${presentDay ? 'present-day' : ''} ${isEventExists ? 'exists-event' : ''}`}
            onClick={this.onClickDate}
          >
            {day}
          </button>
        }
      >
        {(close) => (displayForm ? this.renderForm() : this.renderPopupContent(close))}
      </Popup>
    );
  }
}

export default Days;
