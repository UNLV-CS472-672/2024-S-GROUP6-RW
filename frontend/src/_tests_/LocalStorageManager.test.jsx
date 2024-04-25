import { saveToLocal, getFromLocal, removeFromLocal, clearLocalDataOnSignout } from '../utils/LocalStorageManager';

// Mocks to ensure no collisions with global localStorage during other tests
beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe('LocalStorageManager', () => {
  describe('saveToLocal', () => {
    it('should save data to localStorage', () => {
      const key = 'testKey';
      const data = { id: 1, name: 'Test' };
      saveToLocal(key, data);
      expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(data));
    });
  });

  describe('getFromLocal', () => {
    it('should return parsed data from localStorage', () => {
      const key = 'testKey';
      const data = { id: 1, name: 'Test' };
      localStorage.setItem(key, JSON.stringify(data));
      expect(getFromLocal(key)).toEqual(data);
    });

    it('should log and return null if data is corrupt', () => {
      const key = 'corruptData';
      localStorage.setItem(key, 'not valid json');
      const consoleSpy = jest.spyOn(console, 'error');
      expect(getFromLocal(key)).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith('Parsing error in getFromLocal:', expect.any(Error));
    });

    it('should log and return null if no data found', () => {
      const key = 'missingKey';
      const consoleSpy = jest.spyOn(console, 'log');
      expect(getFromLocal(key)).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith(`No item found with key: ${key}`);
    });
  });

  describe('removeFromLocal', () => {
    it('should remove the item from localStorage', () => {
      const key = 'testKey';
      localStorage.setItem(key, JSON.stringify({ id: 1 }));
      removeFromLocal(key);
      expect(localStorage.removeItem).toHaveBeenCalledWith(key);
    });
  });

  describe('clearLocalDataOnSignout', () => {
    it('should clear all data from localStorage', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      clearLocalDataOnSignout();
      expect(localStorage.clear).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith('All local storage data has been cleared.');
    });
  });
});
