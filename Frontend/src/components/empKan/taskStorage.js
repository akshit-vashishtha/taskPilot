const STORAGE_KEY = "kanban_demo";

export const loadTasks = (fallback = []) => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fallback));
    return fallback;
  } catch {
    return fallback;
  }
};

export const saveTasks = (tasks) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

export const clearTasks = () => {
  localStorage.removeItem(STORAGE_KEY);
};
