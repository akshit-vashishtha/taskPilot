// Kanban board configuration
export const columns = [
  { 
    key: "toDo", 
    label: "To Do", 
    color: "bg-slate-50 border-slate-200", 
    limit: 5 
  },
  { 
    key: "inProgress", 
    label: "In Progress", 
    color: "bg-blue-50 border-blue-200", 
    limit: 3 
  },
  { 
    key: "review", 
    label: "Review", 
    color: "bg-amber-50 border-amber-200", 
    limit: 4 
  },
  { 
    key: "done", 
    label: "Done", 
    color: "bg-emerald-50 border-emerald-200", 
    limit: null 
  },
  { 
    key: "backlog", 
    label: "Backlog", 
    color: "bg-red-50 border-red-200", 
    limit: null 
  },
];

// Priority configurations
export const priorities = {
  low: { 
    color: "text-green-600 bg-green-100", 
    icon: "↓",
    label: "Low"
  },
  medium: { 
    color: "text-yellow-600 bg-yellow-100", 
    icon: "→",
    label: "Medium"
  },
  high: { 
    color: "text-red-600 bg-red-100", 
    icon: "↑",
    label: "High"
  },
  urgent: { 
    color: "text-purple-600 bg-purple-100", 
    icon: "!!",
    label: "Urgent"
  },
};

// Status options for forms
export const statusOptions = [
  { key: "backlog", label: "Backlog" },
  { key: "toDo", label: "To Do" },
  { key: "inProgress", label: "In Progress" },
  { key: "review", label: "Review" },
  { key: "done", label: "Done" },
];

// Priority options for forms
export const priorityOptions = [
  { key: "low", label: "Low Priority" },
  { key: "medium", label: "Medium Priority" },
  { key: "high", label: "High Priority" },
  { key: "urgent", label: "Urgent Priority" },
];

// Helper functions for configuration
export const getColumnByKey = (key) => {
  return columns.find(column => column.key === key);
};

export const getPriorityConfig = (priority) => {
  return priorities[priority] || priorities.medium;
};

export const getStatusLabel = (statusKey) => {
  const status = statusOptions.find(option => option.key === statusKey);
  return status ? status.label : statusKey;
};