// 2024-S-GROUP6-RW\frontend\src\utils\LocalStorageManager.js

export const saveToLocal = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const getFromLocal = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
};

export const removeFromLocal = (key) => {
    localStorage.removeItem(key);
};

export const clearLocalDataOnSignout = () => {
    // Trips
    localStorage.removeItem('LocationName');
    localStorage.removeItem('trips');
    localStorage.removeItem('activities');

};

  