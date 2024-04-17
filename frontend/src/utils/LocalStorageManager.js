// 2024-S-GROUP6-RW\frontend\src\utils\LocalStorageManager.js

export const saveToLocal = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const getFromLocal = (key) => {
    const data = localStorage.getItem(key);
    if (data !== null) {
        try {
            return JSON.parse(data);
        } catch (e) {
            console.error("Parsing error in getFromLocal:", e);
            return null;  
        }
    } else {
        console.log(`No item found with key: ${key}`);
        return null;  
    }
    
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

  