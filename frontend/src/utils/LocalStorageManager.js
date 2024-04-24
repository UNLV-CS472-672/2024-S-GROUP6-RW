// 2024-S-GROUP6-RW\frontend\src\utils\LocalStorageManager.js

export const saveToLocal = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const getFromLocal = (key) => {
    const data = localStorage.getItem(key);
    if (data !== null) { //checks if data has been assigned a value yet
        try {
            return JSON.parse(data);
        } catch (e) { 
            console.error("Parsing error in getFromLocal:", e);
            return null;  //return null to prevent undefined value
        }
    } else {
        console.log(`No item found with key: ${key}`);
        return null;  //return null to prevent undefined value
    }
    
};

export const removeFromLocal = (key) => {
    localStorage.removeItem(key);
};

export const clearLocalDataOnSignout = () => {
    localStorage.clear();
    console.log("All local storage data has been cleared.");
};

  