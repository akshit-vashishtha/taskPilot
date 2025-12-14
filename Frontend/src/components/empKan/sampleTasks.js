// Sample tasks for development and testing (expanded)
export const sampleTasks = [];

// Helper function to get tasks by status
export const getTasksByStatus = (status) => {
  return sampleTasks.filter(task => task.status === status);
};

// Helper function to get next available ID
export const getNextTaskId = () => {
  return Math.max(...sampleTasks.map(task => task.id)) + 1;
};

// Helper function to add timestamps
export const addTimestamps = (task) => {
  const now = new Date().toISOString();
  return {
    ...task,
    createdAt: now,
    updatedAt: now
  };
};

// Helper function to update timestamp
export const updateTimestamp = (task) => {
  return {
    ...task,
    updatedAt: new Date().toISOString()
  };
};