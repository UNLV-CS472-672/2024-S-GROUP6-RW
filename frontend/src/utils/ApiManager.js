// 2024-S-GROUP6-RW\frontend\src\utils\ApiManager.js
import axios from 'axios';
import { getToken } from '../auth/authService';
import { getFromLocal } from "./LocalStorageManager"

const API_ENDPOINT = 'http://localhost:8080';

export const gettingStartedCreateTrip = async () => {
  // Fetch data from local storage
  const tripTitle = getFromLocal('tripTitle');
  const locationName = getFromLocal('LocationName');
  const startDate = getFromLocal('startDate');
  const endDate = getFromLocal('endDate');
  const username = getFromLocal('username');

  // Construct the trip data object
  const tripData = {
    Username: username,
    TripTitle: tripTitle,
    LocationName: locationName,
    StartDate: startDate,
    EndDate: endDate,
  };

  console.log(tripData)

  try {
    // Retrieve the token
    const token = getToken();
    // Make the API call
    const response = await axios.post(`${API_ENDPOINT}/create_trip`, tripData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data; // Return the response data from the API call
  } catch (error) {
    console.error('Error creating trip:', error);
  }
};

export const getProfile = async ( username ) => {

  const userData = {
    Username: username,
  };
  console.log(userData);

  try {
    // Retrieve the token
    const token = getToken();
    // Make the API call
    const response = await axios.post(`${API_ENDPOINT}/get_profile`, userData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    console.log("Response: " + response.data);
    return response.data; // Return the response data from the API call
  } catch (error) {
    console.error('Error getting profile:', error);
  }
};