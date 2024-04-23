// 2024-S-GROUP6-RW\frontend\src\utils\ApiManager.js
import axios from 'axios';
import { getToken } from '../auth/authService';
import { getFromLocal } from "./LocalStorageManager"

const API_ENDPOINT = 'http://localhost:8080';

export const CreateTrip = async () => {
  // Fetch data from local storage
  const tripTitle = getFromLocal('tripTitle');
  const locationName = getFromLocal('LocationName');
  const startDate = getFromLocal('startDate');
  const endDate = getFromLocal('endDate');
  const username = getFromLocal('username');

  // Construct the trip data object
  const tripData = {
    TripOwner: username,
    Title: tripTitle,
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

export const getAllTrips = async () => {
  try {
    // Fetch the username from local storage
    const username = getFromLocal('username');

    // If username is not found
    if (!username) {
      console.error('Username is not set in local storage');
      return null;
    }

    // Construct the payload
    const payload = {
      Username: username
    };

    // Retrieve the token
    const token = getToken();

    // Make the API call
    const response = await axios.post(`${API_ENDPOINT}/get_all_trips`, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log("All trips response:", response.data);
    return response.data; // Return the response data from the API call

  } catch (error) {
    console.error('Error retrieving all trips:', error);
    return null;
  }
};
