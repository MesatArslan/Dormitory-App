import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../css/StudentFoodList.css';

const StudentFoodList = () => {
  // Fetch foodData and studentChoices from localStorage (which were saved in the AFoodList component)
  const storedFoodData = JSON.parse(localStorage.getItem('foodList')) || [];
  const storedChoices = JSON.parse(localStorage.getItem('studentFoodChoices')) || [];

  // State to store the student's name
  const studentName = useSelector((state) => state.studentS.student);

  // Initialize student choices state. If there are stored choices, use them; otherwise, initialize with null
  const initialChoices = storedFoodData.map((_, index) => {
    return storedChoices.find(choice => choice.name === studentName)?.choices[index] || { breakfast: null, dinner: null };
  });

  const [choices, setChoices] = useState(initialChoices);

  // Get current date to compare with the meal dates
  const currentDate = new Date();

  // Function to check if the date has passed
  const isDatePassed = (mealDate) => {
    const mealDateObj = new Date(mealDate);
    return mealDateObj < currentDate;
  };

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

    localStorage.setItem('studentFoodChoices', JSON.stringify(updatedChoices));

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

      {storedFoodData.length > 0 ? (
  storedFoodData.map((meal, index) => (
    <div key={meal.date} className="meal-day">
      <h3>{meal.date}</h3>
      <div className="meal-row">
        <div className="meal-item">
          <h3>Breakfast:</h3>
          <h4>{meal.breakfast}</h4>
          <button
            className={`meal-choice ${choices[index]?.breakfast === 'yes' ? 'selected' : ''}`}
            onClick={() => handleChoiceChange(index, 'breakfast', 'yes')}
            disabled={isDatePassed(meal.date)}  // Disable if the date has passed
          >
            Yes
          </button>
          <button
            className={`meal-choice ${choices[index]?.breakfast === 'no' ? 'selected' : ''}`}
            onClick={() => handleChoiceChange(index, 'breakfast', 'no')}
            disabled={isDatePassed(meal.date)}  // Disable if the date has passed
          >
            No
          </button>
        </div>

        <div className="meal-item">
          <h3>Dinner: </h3>
          <h4>{meal.dinner}</h4>
          <button
            className={`meal-choice ${choices[index]?.dinner === 'yes' ? 'selected' : ''}`}
            onClick={() => handleChoiceChange(index, 'dinner', 'yes')}
            disabled={isDatePassed(meal.date)}  // Disable if the date has passed
          >
            Yes
          </button>
          <button
            className={`meal-choice ${choices[index]?.dinner === 'no' ? 'selected' : ''}`}
            onClick={() => handleChoiceChange(index, 'dinner', 'no')}
            disabled={isDatePassed(meal.date)}  // Disable if the date has passed
          >
            No
          </button>
        </div>
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
