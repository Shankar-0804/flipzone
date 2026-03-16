import React, { useState } from 'react';
import './App.css';

function App() {
  const [form, setForm] = useState({ username: '', birthdate: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    setError('');

    const payload = {
      name: form.username,
      date: form.birthdate,
      mobileNo: form.phone,
      isActive: true,
    };

    try {
      const response = await fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      setStatus('Submitted successfully');
      setSubmitted(true);
    } catch (err) {
      console.error('Submit error', err);
      setStatus('Failed to submit');
      setError(err.message || 'Could not send form');
    }
  };

  return (
    <div className="App">
      <div className="form-container">
        <h1>User Info Form</h1>
        <form onSubmit={handleSubmit} className="user-form">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            value={form.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />

          <label htmlFor="birthdate">Birthdate</label>
          <input
            id="birthdate"
            name="birthdate"
            type="date"
            value={form.birthdate}
            onChange={handleChange}
            required
          />

          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="123-456-7890"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            required
          />

          <button type="submit">Submit</button>
        </form>

        {status && <p className="status">{status}</p>}
        {error && <p className="error">{error}</p>}

        {submitted && (
          <div className="submitted">
            <h2>Submitted</h2>
            <p>Username: {form.username}</p>
            <p>Birthdate: {form.birthdate}</p>
            <p>Phone: {form.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
