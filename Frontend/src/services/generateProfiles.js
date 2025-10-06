// Simple deterministic "AI" profile generator based on sample tasks.
// Produces an array of objects: { Name, Rating, Review }
const clamp = (v, a = 0, b = 100) => Math.max(a, Math.min(b, v));

function daysBetween(dateA, dateB = new Date()) {
  const a = new Date(dateA);
  const diff = (dateB - a) / (1000 * 60 * 60 * 24);
  return Math.floor(diff);
}

export default function generateProfiles(tasks = []) {
  // Group tasks by assignee
  const byAssignee = {};
  tasks.forEach((t) => {
    const name = t.assignee || 'Unassigned';
    if (!byAssignee[name]) byAssignee[name] = [];
    byAssignee[name].push(t);
  });

  const profiles = Object.keys(byAssignee).map((name) => {
    const userTasks = byAssignee[name];
    const total = userTasks.length || 1;
    const done = userTasks.filter((t) => t.status === 'done').length;
    const inProgress = userTasks.filter((t) => t.status === 'inProgress').length;
    const toDo = userTasks.filter((t) => t.status === 'toDo').length;
    const review = userTasks.filter((t) => t.status === 'review').length;
    const avgHistory = userTasks.reduce((s, t) => s + (t.historyLogs ? t.historyLogs.length : 0), 0) / total;
    const overdue = userTasks.filter((t) => {
      if (!t.deadline) return false;
      const dl = new Date(t.deadline);
      return dl < new Date() && t.status !== 'done';
    }).length;
    const recentUpdates = userTasks.filter((t) => {
      if (!t.updatedAt) return false;
      return daysBetween(t.updatedAt) <= 7;
    }).length;

    // Score components (weights chosen to produce readable ratings)
    const completionScore = (done / total) * 45; // up to 45
    const timelinessScore = ((total - overdue) / total) * 30; // up to 30
    const activityScore = Math.min(1, avgHistory / 3) * 15; // up to 15
    const responsiveness = Math.min(1, recentUpdates / Math.max(1, total)) * 10; // up to 10

    let raw = completionScore + timelinessScore + activityScore + responsiveness;
    raw = clamp(Math.round(raw));

    // Construct a human-friendly review with a few variations
    const parts = [];
    if (done / total >= 0.75) {
      parts.push("Consistently completes assigned work and moves tasks to 'done' regularly.");
    } else if (done / total >= 0.4) {
      parts.push("Shows steady progress but a few tasks remain incomplete.");
    } else {
      parts.push("Several tasks are pending — may need help prioritizing or clearing blockers.");
    }

    if (overdue > 0) {
      parts.push(`${overdue} task${overdue > 1 ? 's are' : ' is'} overdue, which impacts delivery timelines.`);
    } else {
      parts.push('No overdue tasks at the moment — timely with deadlines.');
    }

    if (avgHistory >= 3) {
      parts.push('Maintains good traceability with detailed history logs and updates.');
    } else if (avgHistory >= 1) {
      parts.push('Provides basic updates; consider adding more context to activity logs.');
    } else {
      parts.push('Rarely documents progress in history logs — encourage brief status notes.');
    }

    if (responsiveness >= 0.5) {
      parts.push('Has recent updates and is active in the current sprint.');
    }

    // Add a final tailored suggestion
    if (raw >= 85) {
      parts.push('Excellent work — keep up the consistency and consider mentoring peers.');
    } else if (raw >= 65) {
      parts.push('Good performance; focus on resolving overdue items to improve impact.');
    } else if (raw >= 45) {
      parts.push('Average performance; consider pair-programming or backlog refinement to move items forward.');
    } else {
      parts.push('Needs attention — recommend a short sync to unblock tasks and set clear next steps.');
    }

    const reviewText = parts.join(' ');

    return {
      Name: name,
      Rating: raw,
      Review: reviewText,
      // extras for UI
      _meta: {
        totalTasks: total,
        done,
        inProgress,
        toDo,
        review,
        overdue,
        avgHistory: Number(avgHistory.toFixed(1)),
        recentUpdates
      }
    };
  });

  // Sort by rating descending for UI
  profiles.sort((a, b) => b.Rating - a.Rating);
  return profiles;
}
