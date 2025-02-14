import React, { useState, useEffect } from 'react';
import '../css/StudentFoodList.css';

const StudentFoodList = () => {
  // Fetch foodData and studentChoices from localStorage (which were saved in the AFoodList component)
  const storedFoodData = JSON.parse(localStorage.getItem('foodList')) || [];
  const storedChoices = JSON.parse(localStorage.getItem('studentChoices')) || [];

  // State to store the student's name
  const [studentName, setStudentName] = useState('');

  // Initialize student choices state. If there are stored choices, use them; otherwise, initialize with null
  const initialChoices = storedFoodData.map((_, index) => {
    return storedChoices.find(choice => choice.name === studentName)?.choices[index] || { breakfast: null, dinner: null };
  });

  const [choices, setChoices] = useState(initialChoices);

  // Handle student name input change
  const handleNameChange = (e) => {
    setStudentName(e.target.value);
  };

  // Handle click for Yes/No on Breakfast/Dinner
  const handleChoiceChange = (dayIndex, mealType, choice) => {
    const updatedChoices = [...choices];
    updatedChoices[dayIndex][mealType] = choice;
    setChoices(updatedChoices);
  };

  // Handle saving student choices and updating the count in localStorage
  const handleSave = () => {
    if (!studentName) {
      alert('Please enter your name!');
      return;
    }

    // Save the student's name and choices in localStorage
    const updatedStudentChoices = {
      name: studentName,  // Save the student's name here
      choices: choices,   // Save their meal choices
    };

    // Update or add student choices in localStorage
    const updatedChoices = storedChoices.filter(choice => choice.name !== studentName);  // Remove any existing choices for the same name
    updatedChoices.push(updatedStudentChoices);  // Add the new choice with the student's name

    localStorage.setItem('studentChoices', JSON.stringify(updatedChoices));

    // Update the count of 'yes' for breakfast and dinner in localStorage
    const updatedFoodData = storedFoodData.map((day, index) => {
      const choice = choices[index];
      const breakfastCount = choice.breakfast === 'yes' ? 1 : 0;
      const dinnerCount = choice.dinner === 'yes' ? 1 : 0;
      return {
        ...day,
        breakfastCount: day.breakfastCount ? day.breakfastCount + breakfastCount : breakfastCount,
        dinnerCount: day.dinnerCount ? day.dinnerCount + dinnerCount : dinnerCount,
      };
    });

    localStorage.setItem('foodList', JSON.stringify(updatedFoodData));
    alert('Your choices have been saved successfully!');
  };

  return (
    <div className="student-food-list-container">
      <h2>Choose Your Meals for the Month</h2>

      {/* Input for student's name */}
      <div className="student-name-container">
        <label htmlFor="studentName">Student Name: </label>
        <input
          type="text"
          id="studentName"
          value={studentName}
          onChange={handleNameChange}
          placeholder="Enter your name"
        />
      </div>

      {storedFoodData.length > 0 ? (
        storedFoodData.map((meal, index) => (
          <div key={meal.date} className="meal-day">
            <h3>Date: {meal.date}</h3>
            <div className="meal-item">
              <p>Breakfast: {meal.breakfast}</p>
              <button
                className={`meal-choice ${choices[index]?.breakfast === 'yes' ? 'selected' : ''}`}
                onClick={() => handleChoiceChange(index, 'breakfast', 'yes')}
              >
                Yes
              </button>
              <button
                className={`meal-choice ${choices[index]?.breakfast === 'no' ? 'selected' : ''}`}
                onClick={() => handleChoiceChange(index, 'breakfast', 'no')}
              >
                No
              </button>
            </div>

            <div className="meal-item">
              <p>Dinner: {meal.dinner}</p>
              <button
                className={`meal-choice ${choices[index]?.dinner === 'yes' ? 'selected' : ''}`}
                onClick={() => handleChoiceChange(index, 'dinner', 'yes')}
              >
                Yes
              </button>
              <button
                className={`meal-choice ${choices[index]?.dinner === 'no' ? 'selected' : ''}`}
                onClick={() => handleChoiceChange(index, 'dinner', 'no')}
              >
                No
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No food data found for this month.</p>
      )}

      <button className="save-button" onClick={handleSave}>
        Save Choices
      </button>
    </div>
  );
};

export default StudentFoodList;
