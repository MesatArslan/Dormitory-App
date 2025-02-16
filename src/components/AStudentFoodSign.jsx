import React, { useState, useEffect } from 'react';
import '../css/StudentFoodSign.css'; // Make sure to create this CSS for styling

const AStudentFoodSign = () => {
  // State to store food list (e.g., dates and menu items) and students' choices from localStorage
  const [foodList, setFoodList] = useState([]);
  const [studentChoices, setStudentChoices] = useState([]);

  useEffect(() => {
    // Fetch food list and student choices from localStorage
    const storedFoodList = JSON.parse(localStorage.getItem('foodList')) || [];
    const storedStudentChoices = JSON.parse(localStorage.getItem('studentFoodChoices')) || [];

    // Set the fetched data into state
    setFoodList(storedFoodList);
    setStudentChoices(storedStudentChoices);
  }, []);

  // Function to count how many students signed up for "yes" for breakfast or dinner for a specific day
  const countMealSignups = (dayIndex, mealType) => {
    // Filter student choices and count those with 'yes' for the specified meal
    return studentChoices.reduce((count, choice) => {
      const studentChoiceForDay = choice.choices[dayIndex];
      if (studentChoiceForDay && studentChoiceForDay[mealType] === 'yes') {
        count++;
      }
      return count;
    }, 0);
  };

  return (
    <div className="student-food-sign-container">
      <h2>Meal Sign-Up Summary</h2>

      {/* Display the summary of signed-up students by day */}
      <div className="students-summary">
        {foodList.length === 0 ? (
          <p>No food data available.</p>
        ) : (
          foodList.map((meal, index) => (
            <div key={meal.date} className="day-summary">
              <h4>{meal.date}</h4>
              <div className="meal-summary">
                <div>
                  <h5>Breakfast: {meal.breakfast}</h5>
                  <p>{countMealSignups(index, 'breakfast')} students signed up</p>
                </div>
                <div>
                  <h5>Dinner: {meal.dinner}</h5>
                  <p>{countMealSignups(index, 'dinner')} students signed up</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AStudentFoodSign;
