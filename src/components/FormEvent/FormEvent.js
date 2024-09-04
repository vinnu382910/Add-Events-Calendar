import { Component } from 'react';
import './form.css'

class FormEvent extends Component {
  // Initialize state directly as a class property
  state = {
    name: '',
    time: '00:00',
    description: '',
  };

  // Handle input changes
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  // Handle form submission
  handleSubmit = (event) => {
    event.preventDefault();
    // Log the form data or handle it as needed
    console.log('Form submitted:', this.state);
  };

  render() {
    return (
      <div className="form-container">
        <h1>Add a new event</h1>
        <form onSubmit={this.handleSubmit}>
          <div className='input-cont'>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              required
            />
          </div>

          {/* Time Dropdown */}
          <div>
            <label htmlFor="time">Time:</label>
            <select
              id="time"
              name="time"
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

          {/* Description Textarea */}
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default FormEvent;
