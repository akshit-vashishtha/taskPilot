// Sample tasks for development and testing (expanded)
export const sampleTasks = [
  {
    id: 1,
    title: "Design UI Components",
    status: "toDo",
    deadline: "2025-12-20",
    priority: "high",
    assignee: "Arjun Patel",
    complexityScore: 6,
    riskScore: 4,
    impactScore: 6,
    description: "Create reusable UI components for the dashboard",
    tags: ["design", "frontend"],
    createdAt: "2025-10-01T09:00:00.000Z",
    updatedAt: "2025-10-01T09:00:00.000Z",
    position: 0,
    historyLogs: [
      "1. Added to backlog 18 days ago.",
      "2. Moved to 'toDo' after a two-day design spike; created component checklist, token mapping, and accessibility considerations — estimated 7 days of work.",
      "3. Minor spec changes added 2 days later (button states and token renames)."
    ]
  },
  {
    id: 2,
    title: "Build REST API",
    status: "inProgress",
    deadline: "2025-12-18",
    priority: "high",
    assignee: "Priya Sharma",
    complexityScore: 8,
    riskScore: 7,
    impactScore: 8,
    description: "Develop backend API endpoints for user authentication and task management",
    tags: ["backend", "api"],
    createdAt: "2025-10-01T10:00:00.000Z",
    updatedAt: "2025-10-02T14:30:00.000Z",
    position: 0,
    historyLogs: [
      "1. Scaffolded initial endpoints and mocked responses 8 days ago.",
      "2. Added authentication middleware and basic validation schemas.",
      "3. Integration tests added after discovering auth edge cases (3 days ago); revealed inconsistent error codes across services.",
      "4. Implemented request throttling to mitigate load issues observed in staging.",
      "5. Currently in-progress: fixing token refresh race condition and hardening refresh token rotation with additional tests."
    ]
  },
  {
    id: 3,
    title: "Write Documentation",
    status: "done",
    deadline: "2025-12-10",
    priority: "medium",
    assignee: "Rohit Kumar",
    complexityScore: 2,
    riskScore: 1,
    impactScore: 4,
    description: "Complete technical documentation for API endpoints and component usage",
    tags: ["docs"],
    createdAt: "2025-09-28T08:00:00.000Z",
    updatedAt: "2025-10-03T16:45:00.000Z",
    position: 0,
    historyLogs: [
      "1. Started as a draft in backlog 12 days ago.",
      "2. Reviewed by the team and polished; writing took 5 days and included code samples for endpoints and usage examples."
    ]
  },
  {
    id: 4,
    title: "Code Review",
    status: "inProgress",
    deadline: "2025-12-17",
    priority: "medium",
    assignee: "Ananya Singh",
    complexityScore: 3,
    riskScore: 2,
    impactScore: 3,
    description: "Review pull requests for authentication module and task management features",
    tags: ["review"],
    createdAt: "2025-10-02T11:00:00.000Z",
    updatedAt: "2025-10-03T09:15:00.000Z",
    position: 1,
    historyLogs: [
      "1. Assigned to the review queue 6 days ago.",
      "2. Found a blocker related to schema mismatch and requested changes; reviewer provided examples of failing cases.",
      "3. Author pushed changes addressing most comments but introduced a minor performance regression.",
      "4. Re-review scheduled after author fixes."
    ]
  },
  {
    id: 5,
    title: "Setup CI/CD Pipeline",
    status: "toDo",
    deadline: "2025-12-25",
    priority: "high",
    assignee: "Karan Mehta",
    complexityScore: 7,
    riskScore: 5,
    impactScore: 7,
    description: "Configure automated testing and deployment pipeline using GitHub Actions",
    tags: ["devops", "ci/cd", "automation"],
    createdAt: "2025-10-03T13:00:00.000Z",
    updatedAt: "2025-10-03T13:00:00.000Z",
    position: 1,
    historyLogs: [
      "1. Requested by product after last release outage.",
      "2. Initial workflow template added; still awaiting CI secrets and runner assignment before the pipeline can run end-to-end."
    ]
  },
  {
    id: 6,
    title: "Database Schema Design",
    status: "review",
    deadline: "2025-12-15",
    priority: "high",
    assignee: "David Kumar",
    complexityScore: 9,
    riskScore: 8,
    impactScore: 9,
    description: "Design and implement database schema for user management and task storage",
    tags: ["database", "backend", "schema"],
    createdAt: "2025-10-01T15:00:00.000Z",
    updatedAt: "2025-10-04T10:00:00.000Z",
    position: 0,
    historyLogs: [
      "1. Drafted ER diagram and normalization rules.",
      "2. Reworked relationships after performance review to reduce costly joins and improve query patterns; added specific indices and pagination support.",
      "3. Added sample migration scripts and rollback plans.",
      "4. Performed load tests showing improved query latency.",
      "5. Currently under review for migration safety and rollback strategies.",
      "6. Stakeholders requested audit fields and soft-delete strategy.",
      "7. Final review scheduled with devops to align backup windows."
    ]
  },
  {
    id: 7,
    title: "Mobile Responsive Design",
    status: "toDo",
    deadline: "2025-12-30",
    priority: "medium",
    assignee: "Meera Nair",
    complexityScore: 5,
    riskScore: 3,
    impactScore: 6,
    description: "Ensure all components are mobile-friendly and responsive across devices",
    tags: ["frontend", "mobile", "responsive"],
    createdAt: "2025-10-02T16:00:00.000Z",
    updatedAt: "2025-10-02T16:00:00.000Z",
    position: 2,
    historyLogs: [
      "1. Brought forward from sprint planning as a stretch goal.",
      "2. Prototype created for hero section; responsive breakpoints implemented but needs QA on small tablets and landscape phones."
    ]
  },
  {
    id: 8,
    title: "User Authentication",
    status: "review",
    deadline: "2025-12-12",
    priority: "urgent",
    assignee: "Neha Verma",
    complexityScore: 9,
    riskScore: 9,
    impactScore: 10,
    description: "Implement JWT-based authentication with login, signup, and password reset",
    tags: ["auth", "security", "backend"],
    createdAt: "2025-09-30T12:00:00.000Z",
    updatedAt: "2025-10-04T08:30:00.000Z",
    position: 1,
    historyLogs: [
      "1. Started as high-priority after a security audit flagged missing refresh handling.",
      "2. Authentication MVP completed in 10 days and deployed to staging with basic social login disabled.",
      "3. Review flagged token expiry edge cases and session-handling inconsistencies; fixes in progress with added regression tests.",
      "4. Patch released to staging addressing cookie scoping issues.",
      "5. Rolled back social login changes due to provider rate limits.",
      "6. Monitoring added for login success/failure trends."
    ]
  },
  {
    id: 9,
    title: "Analytics Dashboard",
    status: "toDo",
    deadline: "2025-12-01",
    priority: "medium",
    assignee: "Sahil Gupta",
    complexityScore: 6,
    riskScore: 4,
    impactScore: 7,
    description: "Create analytics dashboard for engagement and usage metrics",
    tags: ["analytics", "dashboard"],
    createdAt: "2025-10-04T09:30:00.000Z",
    updatedAt: "2025-10-04T09:30:00.000Z",
    position: 0,
    historyLogs: [
      "1. Concept sketched during roadmap session.",
      "2. Stakeholders requested daily and weekly views; requirements updated to include export and preset filters.",
      "3. Data model prototype built to validate KPIs and retention windows."
    ]
  },
  {
    id: 10,
    title: "Performance Optimization",
    status: "inProgress",
    deadline: "2025-12-22",
    priority: "high",
    assignee: "Leena Roy",
    complexityScore: 8,
    riskScore: 6,
    impactScore: 9,
    description: "Optimize bundle size and reduce initial load time",
    tags: ["performance", "frontend"],
    createdAt: "2025-10-01T07:45:00.000Z",
    updatedAt: "2025-10-05T12:00:00.000Z",
    position: 2,
    historyLogs: [
      "1. Profiling revealed large vendor bundles; began code-splitting and dependency audit.",
      "2. Replaced a heavy charting library with a lighter alternative for the dashboard.",
      "3. Implemented tree-shaking-friendly exports across shared components.",
      "4. Lazy-loading implemented for heavy charts and non-critical widgets; observed a 22% improvement in initial paint in staging.",
      "5. Measured load improvements across 3 major pages."
    ]
  },
  {
    id: 11,
    title: "Onboarding Flow",
    status: "toDo",
    deadline: "2025-12-28",
    priority: "medium",
    assignee: "Aisha Khan",
    complexityScore: 4,
    riskScore: 2,
    impactScore: 6,
    description: "Design and implement first-time user onboarding steps",
    tags: ["ux", "onboarding"],
    createdAt: "2025-10-03T10:20:00.000Z",
    updatedAt: "2025-10-03T10:20:00.000Z",
    position: 0,
    historyLogs: [
      "1. Wireframes approved by PM.",
      "2. Content for tips and modals still pending — blocking copy and UX copy review."
    ]
  },
  {
    id: 12,
    title: "Feature Flagging System",
    status: "review",
    deadline: "2025-12-19",
    priority: "high",
    assignee: "Vikram Desai",
    complexityScore: 7,
    riskScore: 5,
    impactScore: 8,
    description: "Introduce a feature flagging system to safely roll out features",
    tags: ["devops", "feature-flag"],
    createdAt: "2025-09-29T14:00:00.000Z",
    updatedAt: "2025-10-04T11:00:00.000Z",
    position: 1,
    historyLogs: [
      "1. Prototype implemented with local toggles for developers.",
      "2. Added remote configuration, audit logs, and a simple SDK; security review ongoing to ensure safe rollout.",
      "3. Created lightweight management UI for toggles and percentage rollouts.",
      "4. Added integration with analytics for experiment tracking."
    ]
  },
  {
    id: 13,
    title: "Accessibility Audit",
    status: "toDo",
    deadline: "2025-12-05",
    priority: "low",
    assignee: "Nina Bose",
    complexityScore: 3,
    riskScore: 2,
    impactScore: 5,
    description: "Run accessibility checks and fix critical issues",
    tags: ["a11y", "ux"],
    createdAt: "2025-10-05T09:00:00.000Z",
    updatedAt: "2025-10-05T09:00:00.000Z",
    position: 0,
    historyLogs: [
      "1. Initial automated scan found 12 issues.",
      "2. Prioritized color contrast and focus order fixes; one complex ARIA pattern still needs manual testing.",
      "3. Accessibility champions assigned to validate keyboard and screen reader flows."
    ]
  },
  {
    id: 14,
    title: "Beta Feedback Triage",
    status: "inProgress",
    deadline: "2025-12-26",
    priority: "medium",
    assignee: "Omar Farouk",
    complexityScore: 4,
    riskScore: 3,
    impactScore: 6,
    description: "Collect and triage beta user feedback for the release",
    tags: ["beta", "feedback"],
    createdAt: "2025-10-02T09:30:00.000Z",
    updatedAt: "2025-10-05T15:30:00.000Z",
    position: 1,
    historyLogs: [
      "1. Feedback channel opened and integrated with project board.",
      "2. Top 5 issues assigned to owners; two were quickly resolved, three require product decisions.",
      "3. Weekly triage meetings scheduled to track progress and assign severity."
    ]
  },
  {
    id: 15,
    title: "Email Notifications",
    status: "toDo",
    deadline: "2025-12-24",
    priority: "low",
    assignee: "Priyanka Iyer",
    complexityScore: 5,
    riskScore: 3,
    impactScore: 5,
    description: "Add email notifications for task assignments and mentions",
    tags: ["notifications", "backend"],
    createdAt: "2025-10-04T12:00:00.000Z",
    updatedAt: "2025-10-04T12:00:00.000Z",
    position: 0,
    historyLogs: [
      "1. Feature requested by customer success for better retention.",
      "2. Design includes digest and immediate modes; implementation pending with a decision needed on provider and rate limits."
    ]
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