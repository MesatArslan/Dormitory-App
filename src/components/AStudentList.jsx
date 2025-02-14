import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'react-feather'; // Import icons
import '../css/AStudentList.css';  // Updated CSS file

const AStudentList = () => {
  // State to hold students from localStorage
  const [students, setStudents] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null); // To track which student is being edited
  const [editableStudent, setEditableStudent] = useState({}); // Store the student being edited
  const [passwordVisibility, setPasswordVisibility] = useState({}); // Track password visibility per student

  // Fetch students from localStorage when the component mounts
  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
    setStudents(storedStudents);
  }, []);

  // Function to toggle password visibility for each student
  const togglePasswordVisibility = (index) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle visibility for the specific student
    }));
  };

  // Function to handle student edit
  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditableStudent(students[index]);
  };

  // Function to handle input change in edit mode
  const handleInputChange = (e) => {
    setEditableStudent({
      ...editableStudent,
      [e.target.name]: e.target.value,
    });
  };

  // Function to save edited student details
  const handleSave = () => {
    const updatedStudents = [...students];
    updatedStudents[editingIndex] = editableStudent;
    setStudents(updatedStudents);
    setEditingIndex(null);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
  };

  // Function to cancel editing
  const handleCancel = () => {
    setEditingIndex(null);
  };

  // Function to delete a student by index
  const handleDelete = (indexToDelete) => {
    const updatedStudents = students.filter((_, index) => index !== indexToDelete);
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
  };

  return (
    <div className="student-list-container">
      <h2>Student List</h2>
      <table className="student-list-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student, index) => (
              <tr key={index}>
                <td>{index + 1}</td> {/* ID */}
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      name="name"
                      value={editableStudent.name}
                      onChange={handleInputChange}
                    />
                  ) : (
                    student.name
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      name="surname"
                      value={editableStudent.surname}
                      onChange={handleInputChange}
                    />
                  ) : (
                    student.surname
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      name="email"
                      value={editableStudent.email}
                      onChange={handleInputChange}
                    />
                  ) : (
                    student.email
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      name="phone"
                      value={editableStudent.phone}
                      onChange={handleInputChange}
                    />
                  ) : (
                    student.phone
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <div className="password-field">
                      <input
                        type={passwordVisibility[index] ? "text" : "password"} // Toggle input type
                        name="password"
                        value={editableStudent.password}
                        onChange={handleInputChange}
                      />
                      <span
                        onClick={() => togglePasswordVisibility(index)}
                        className="eye-icon"
                      >
                        {passwordVisibility[index] ? <EyeOff /> : <Eye />}
                      </span>
                    </div>
                  ) : (
                    <div className="password-field">
                      <span>
                        {passwordVisibility[index] ? student.password : "••••••••"}
                      </span> {/* Hidden password */}
                      <span
                        onClick={() => togglePasswordVisibility(index)}
                        className="eye-icon"
                      >
                        {passwordVisibility[index] ? <EyeOff /> : <Eye />}
                      </span>
                    </div>
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <div>
                      <button className="save-btn" onClick={handleSave}>
                        Save
                      </button>
                      <button className="cancel-btn" onClick={handleCancel}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No students registered yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AStudentList;
