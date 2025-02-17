import React, { useState, useEffect } from 'react';
import '../css/AFoodList.css';  // Import the CSS for styling

const AFoodList = () => {
  const [foodData, setFoodData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [breakfast, setBreakfast] = useState('');
  const [dinner, setDinner] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);  // Track which row is being edited
  const [editableMeal, setEditableMeal] = useState({ breakfast: '', dinner: '' }); // Store editable meal values

  // Load saved food data from localStorage when the component mounts
  useEffect(() => {
    const storedFoodData = JSON.parse(localStorage.getItem('foodList')) || [];
    setFoodData(storedFoodData);
  }, []);

  // Handle changes in meal input (upper form part)
  const handleMealChange = (meal, value) => {
    if (meal === 'breakfast') {
      setBreakfast(value);
    } else if (meal === 'dinner') {
      setDinner(value);
    }
  };

  // Add or Update food data in the top form
  const handleAddFood = () => {
    const newData = {
      date: selectedDate,
      breakfast,
      dinner,
    };

    setFoodData((prevData) => {
      let updatedData = [...prevData];

      // If food list exceeds 45 items, remove the first entry
      if (updatedData.length >= 45) {
        updatedData.shift();  // Remove the first item
      }

      // Check if the selected date already exists in the list
      const index = updatedData.findIndex(item => item.date === selectedDate);
      if (index === -1) {
        updatedData.push(newData);  // Add new meal entry
      } else {
        updatedData[index] = newData;  // Update existing entry
      }
      return updatedData;
    });

    // Clear input fields after adding
    setBreakfast('');
    setDinner('');
  };

  // Handle saving data to localStorage
  const handleSave = () => {
    localStorage.setItem('foodList', JSON.stringify(foodData));
    alert('Food list saved to local storage!');
  };

  // Handle editing a specific row
  const handleEdit = (index) => {
    setEditingIndex(index);  // Set which row is being edited
    setEditableMeal({
      breakfast: foodData[index].breakfast,
      dinner: foodData[index].dinner
    });
  };

  // Handle changes to editable meal in the table
  const handleEditableMealChange = (meal, value) => {
    setEditableMeal((prevMeal) => ({
      ...prevMeal,
      [meal]: value,
    }));
  };

  // Handle saving the edited meal for a specific row
  const handleSaveEdit = (index) => {
    const updatedData = [...foodData];
    updatedData[index] = {
      ...updatedData[index],
      breakfast: editableMeal.breakfast,
      dinner: editableMeal.dinner
    };
    setFoodData(updatedData);
    setEditingIndex(null);  // Exit edit mode
  };

  // Handle canceling the edit operation
  const handleCancelEdit = () => {
    setEditingIndex(null);  // Exit edit mode without saving
  };

  // Format date to DD/MM/YYYY
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  // Add buttons to increase/decrease the selected date by 1 day
  const handleDateChange = (days) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate.toISOString().split('T')[0]);
  };

  // Function to clear all food data
  const handleClearFoodList = () => {
    if (window.confirm("Are you sure you want to clear the entire food list?")) {
      localStorage.removeItem('foodList');  // Clear food data from localStorage
      setFoodData([]);  // Clear the food data state
      alert('Food list has been cleared!');
    }
  };

  return (
    <div className="food-list-container">
      <h2>Food List for the Month</h2>
      
      {/* Form to Add/Update Meal Data */}
      <div className="meal-form">
        <div className="form-group">
          <label className='label'>Date</label>
          <div className='form-group-a'>
            <button className='forward-backward' onClick={() => handleDateChange(-1)}>{'<'}</button>  {/* Backward button */}
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <button className='forward-backward' onClick={() => handleDateChange(1)}>{'>'}</button>  {/* Forward button */}
          </div>
        </div>

        <div className="form-group">
          <label>Breakfast</label>
          <input
            type="text"
            value={breakfast}
            onChange={(e) => handleMealChange('breakfast', e.target.value)}
            placeholder="Enter Breakfast Food"
          />
        </div>

        <div className="form-group">
          <label>Dinner</label>
          <input
            type="text"
            value={dinner}
            onChange={(e) => handleMealChange('dinner', e.target.value)}
            placeholder="Enter Dinner Food"
          />
        </div>

        <button type="button" className="btn-add" onClick={handleAddFood}>
          Add Meal
        </button>
      </div>

      {/* Table for Meals */}
      <div className="food-list-table">
        <h3>Meals List</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Breakfast</th>
              <th>Dinner</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {foodData.length > 0 ? (
              foodData.map((item, index) => (
                <tr key={index}>
                  <td>{formatDate(item.date)}</td>
                  
                  {/* Inline Editing for Meals */}
                  {editingIndex === index ? (
                    <>
                      <td>
                        <input
                          type="text"
                          value={editableMeal.breakfast}
                          onChange={(e) => handleEditableMealChange('breakfast', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={editableMeal.dinner}
                          onChange={(e) => handleEditableMealChange('dinner', e.target.value)}
                        />
                      </td>
                      <td>
                        <button className='save-btn' onClick={() => handleSaveEdit(index)}>Save</button>
                        <button className='cancel-btn' onClick={handleCancelEdit}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{item.breakfast}</td>
                      <td>{item.dinner}</td>
                      <td>
                        <button onClick={() => handleEdit(index)}>Edit</button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No meals added yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <button className="btn-save" onClick={handleSave}>Save All Meals</button>
      <button className="btn-clear" onClick={handleClearFoodList}>Clear Food List</button> {/* Clear button */}
    </div>
  );
};

export default AFoodList;
