import React, { useState } from 'react';

const AStudentRegister = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');  // For success message

  const handleSubmit = (e) => {
    e.preventDefault();

    const newStudent = { name, surname, email, phone, password };

    // Retrieve any existing students from local storage
    const students = JSON.parse(localStorage.getItem('students')) || [];

    // Add the new student to the array of students
    students.push(newStudent);

    // Save the updated array back to local storage
    localStorage.setItem('students', JSON.stringify(students));

    // Clear the form fields and show a success message
    setName('');
    setSurname('');
    setEmail('');
    setPhone('');
    setPassword('');
    setMessage('Student registered successfully!');
  };

  return (
    <div className="student-register-container">
      <h2>Register New Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Surname</label>
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Register Student</button>
      </form>

      {/* Success message */}
      {message && <p className="success-message">{message}</p>}
    </div>
  );
};

export default AStudentRegister;
