// 2024-S-GROUP6-RW\frontend\src\utils\ApiManager.js
import axios from 'axios';

const API_ENDPOINT = 'http://localhost:8080/signin';

export const saveExpenseToServer = async (expenseData) => {
  try {
    const response = await axios.post(`${API_ENDPOINT}/expenses`, expenseData);
    return response.data;
  } catch (error) {
    console.error('Error saving expense to server:', error);
  }
};

export const saveTripToServer = async (tripData) => {
  try {
    const response = await axios.post(`${API_ENDPOINT}/trips`, tripData);
    return response.data;
  } catch (error) {
    console.error('Error saving trip to server:', error);
  }
};

export const saveActivityToServer = async (activityData) => {
  try {
    const response = await axios.post(`${API_ENDPOINT}/activities`, activityData);
    return response.data;
  } catch (error) {
    console.error('Error saving activity to server:', error);
  }
};

// Add additional API call functions as needed
