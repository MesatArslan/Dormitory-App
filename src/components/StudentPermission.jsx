import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; // Importing the useSelector hook
import '../css/StudentPermissionn.css';

const initialStatus = "Pending"; // Default status is Pending

const StudentPermission = () => {
  // Get student's full name from Redux store (but we won't display it)
  const studentName = useSelector((state) => state.studentS.student);

  const [leaveDate, setLeaveDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [destination, setDestination] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [permissionStatus, setPermissionStatus] = useState(initialStatus);
  const [submittedRequest, setSubmittedRequest] = useState(null); // To store and display the most recent submission

  // Check if there's a previously submitted request in localStorage
  useEffect(() => {
    const storedPermissions = JSON.parse(localStorage.getItem('studentPermissions')) || [];

    // Find the last request submitted by this student
    const lastRequest = storedPermissions.find(
      (request) => request.studentName === studentName
    );

    if (lastRequest) {
      setSubmittedRequest(lastRequest); // Set the last submitted request
      setPermissionStatus(lastRequest.status); // Set the status of the last request
    }
  }, [studentName]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const newRequest = {
      id: Date.now(), // Unique ID based on timestamp
      studentName,    // Use full student name from Redux
      leaveDate,
      returnDate,
      destination,
      contactNumber,
      status: "pending", // Default status when submitted
    };

    // Get the existing requests from local storage
    const storedPermissions = JSON.parse(localStorage.getItem('studentPermissions')) || [];

    // Add the new request
    const updatedPermissions = [...storedPermissions, newRequest];

    // Store the updated permission list in local storage
    localStorage.setItem('studentPermissions', JSON.stringify(updatedPermissions));

    // Set the submittedRequest state to show confirmation
    setSubmittedRequest(newRequest);
    setPermissionStatus("pending"); // Set status to pending for the new request

    // Reset the form fields
    setLeaveDate('');
    setReturnDate('');
    setDestination('');
    setContactNumber('');

    // Optionally show a success alert
    alert('Permission request submitted!');
  };

  return (
    <div className="student-permission-container">
      <h2>Request Permission</h2>
      
      {/* Form to request permission */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>When will you go?</label>
          <input
            type="date"
            value={leaveDate}
            onChange={(e) => setLeaveDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>When will you return?</label>
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Where will you go?</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="City, town, address"
            required
          />
        </div>
        <div className="form-group">
          <label>Contact Number</label>
          <input
            type="tel"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            placeholder="Phone number"
            required
          />
        </div>
        <button type="submit" className="submit-btn">Submit Request</button>
      </form>

      {/* Display the submitted request and status if it exists */}
      {submittedRequest && (
        <div className="submitted-request-status">
          <h3>Your Last Permission Request</h3>
          <p><strong>Leave Date:</strong> {submittedRequest.leaveDate}</p>
          <p><strong>Return Date:</strong> {submittedRequest.returnDate}</p>
          <p><strong>Destination:</strong> {submittedRequest.destination}</p>
          <p><strong>Contact Number:</strong> {submittedRequest.contactNumber}</p>
          <p><strong>Status:</strong> {permissionStatus}</p> {/* Status is shown here */}
        </div>
      )}

    </div>
  );
};

export default StudentPermission;
