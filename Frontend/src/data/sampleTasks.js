// Sample tasks for development and testing
export const sampleTasks = [
  {
    id: 1,
    title: "Design UI Components",
    status: "toDo",
    deadline: "2025-10-20", // Updated to future date
    priority: "high",
  assignee: "Arjun Patel",
    complexityScore: 6,
    riskScore: 4,
    impactScore: 6,
    description: "Create reusable UI components for the dashboard",
    tags: ["design", "frontend"],
    createdAt: "2025-10-01T09:00:00.000Z",
    updatedAt: "2025-10-01T09:00:00.000Z",
    position: 0
  },
  {
    id: 2,
    title: "Build REST API",
    status: "inProgress",
    deadline: "2025-10-18", // Updated to future date
    priority: "high",
  assignee: "Priya Sharma",
    complexityScore: 8,
    riskScore: 7,
    impactScore: 8,
    description: "Develop backend API endpoints for user authentication and task management",
    tags: ["backend", "api"],
    createdAt: "2025-10-01T10:00:00.000Z",
    updatedAt: "2025-10-02T14:30:00.000Z",
    position: 0
  },
  {
    id: 3,
    title: "Write Documentation",
    status: "done",
    deadline: "2025-10-10", // Updated to future date
    priority: "medium",
  assignee: "Rohit Kumar",
    complexityScore: 2,
    riskScore: 1,
    impactScore: 4,
    description: "Complete technical documentation for API endpoints and component usage",
    tags: ["docs"],
    createdAt: "2025-09-28T08:00:00.000Z",
    updatedAt: "2025-10-03T16:45:00.000Z",
    position: 0
  },
  {
    id: 4,
    title: "Code Review",
    status: "inProgress",
    deadline: "2025-10-17", // Updated to future date
    priority: "medium",
  assignee: "Ananya Singh",
    complexityScore: 3,
    riskScore: 2,
    impactScore: 3,
    description: "Review pull requests for authentication module and task management features",
    tags: ["review"],
    createdAt: "2025-10-02T11:00:00.000Z",
    updatedAt: "2025-10-03T09:15:00.000Z",
    position: 1
  },
  {
    id: 5,
    title: "Setup CI/CD Pipeline",
    status: "toDo",
    deadline: "2025-10-25",
    priority: "high",
  assignee: "Karan Mehta",
    complexityScore: 7,
    riskScore: 5,
    impactScore: 7,
    description: "Configure automated testing and deployment pipeline using GitHub Actions",
    tags: ["devops", "ci/cd", "automation"],
    createdAt: "2025-10-03T13:00:00.000Z",
    updatedAt: "2025-10-03T13:00:00.000Z",
    position: 1
  },
  {
    id: 6,
    title: "Database Schema Design",
    status: "review",
    deadline: "2025-10-15",
    priority: "high",
  assignee: "David Kumar",
    complexityScore: 9,
    riskScore: 8,
    impactScore: 9,
    description: "Design and implement database schema for user management and task storage",
    tags: ["database", "backend", "schema"],
    createdAt: "2025-10-01T15:00:00.000Z",
    updatedAt: "2025-10-04T10:00:00.000Z",
    position: 0
  },
  {
    id: 7,
    title: "Mobile Responsive Design",
    status: "toDo",
    deadline: "2025-10-30",
    priority: "medium",
  assignee: "Meera Nair",
    complexityScore: 5,
    riskScore: 3,
    impactScore: 6,
    description: "Ensure all components are mobile-friendly and responsive across devices",
    tags: ["frontend", "mobile", "responsive"],
    createdAt: "2025-10-02T16:00:00.000Z",
    updatedAt: "2025-10-02T16:00:00.000Z",
    position: 2
  },
  {
    id: 8,
    title: "User Authentication",
    status: "review",
    deadline: "2025-10-12",
    priority: "urgent",
  assignee: "Neha Verma",
    complexityScore: 9,
    riskScore: 9,
    impactScore: 10,
    description: "Implement JWT-based authentication with login, signup, and password reset",
    tags: ["auth", "security", "backend"],
    createdAt: "2025-09-30T12:00:00.000Z",
    updatedAt: "2025-10-04T08:30:00.000Z",
    position: 1
  }
];

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