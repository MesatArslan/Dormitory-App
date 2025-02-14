import React, { useState, useEffect } from 'react';
import '../css/AStudentPermission.css'; // Add your CSS for styling

const AStudentPermission = () => {
  // State to hold students' vacation requests
  const [students, setStudents] = useState([]);

  // Load data from localStorage when the component mounts
  useEffect(() => {
    const storedPermissions = JSON.parse(localStorage.getItem('studentPermissions')) || [];
    setStudents(storedPermissions); // Load stored data
  }, []);

  // Save data to localStorage whenever students state changes
  useEffect(() => {
    localStorage.setItem('studentPermissions', JSON.stringify(students)); // Save data
  }, [students]);

  // Function to handle approval
  const handleApprove = (id) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id ? { ...student, status: 'approved' } : student
      )
    );
  };

  // Function to handle rejection
  const handleReject = (id) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id ? { ...student, status: 'rejected' } : student
      )
    );
  };

  return (
    <div className="student-permission-container">
      <h2>Student Vacation Requests</h2>

      {/* Check if there are any students */}
      {students.length === 0 ? (
        <p>No vacation requests at the moment.</p>
      ) : (
        <table className="permission-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Leave Date</th>
              <th>Return Date</th>
              <th>Contact Phone</th>
              <th>Stay Location</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Loop through the students data */}
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.studentName}</td> {/* Updated field */}
                <td>{student.leaveDate}</td> {/* Updated field */}
                <td>{student.returnDate}</td> {/* Updated field */}
                <td>{student.contactNumber}</td> {/* Updated field */}
                <td>{student.destination}</td> {/* Updated field */}
                <td>
                  {/* Status Display */}
                  {student.status === 'pending' && <span>Pending</span>}
                  {student.status === 'approved' && <span className="approved">Approved</span>}
                  {student.status === 'rejected' && <span className="rejected">Rejected</span>}
                </td>
                <td>
                  {/* Action Buttons */}
                  {student.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(student.id)}
                        className="approve-btn"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(student.id)}
                        className="reject-btn"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AStudentPermission;
