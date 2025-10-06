// Simple Gemini service wrapper with a fallback heuristic.
// Usage: import { fillMissingFields } from '../services/geminiServices';
// Calls a local proxy at /api/gemini/fill by default. If that fails or is not configured
// the function will run a local heuristic to populate missing metric fields.

async function callGeminiProxy(task) {
  const proxyUrl = process.env.REACT_APP_GEMINI_PROXY || '/api/gemini/fill';
  const res = await fetch(proxyUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task }),
  });
  if (!res.ok) throw new Error(`Proxy error: ${res.status}`);
  return res.json();
}

function localHeuristicFill(task) {
  // Deterministic, explainable fallback if no AI key/proxy is available.
  const out = { ...task };

  // Complexity: based on description length + number of tags
  const descLen = (task.description || '').trim().length;
  let complexity = 5;
  if (descLen === 0) complexity = 3;
  else if (descLen < 80) complexity = 4;
  else if (descLen < 200) complexity = 6;
  else complexity = 8;
  // tags bump
  const tagCount = task.tags ? (Array.isArray(task.tags) ? task.tags.length : (String(task.tags).split(',').filter(Boolean).length)) : 0;
  complexity = Math.min(10, complexity + Math.min(2, tagCount));

  // Risk: higher for urgent/high priority or many tags
  const p = String(task.priority || '').toLowerCase();
  let risk = p === 'urgent' ? 7 : p === 'high' ? 6 : p === 'medium' ? 4 : 2;
  risk = Math.min(10, risk + Math.min(2, tagCount));

  // Impact: depends on priority and keywords
  let impact = p === 'urgent' ? 9 : p === 'high' ? 7 : p === 'medium' ? 5 : 3;
  const desc = String(task.description || '').toLowerCase();
  if (/(release|launch|payment|critical|security)/.test(desc)) impact = Math.max(impact, 8);

  // Only set values if they were blank/null
  out.complexityScore = task.complexityScore === null || task.complexityScore === undefined ? complexity : task.complexityScore;
  out.riskScore = task.riskScore === null || task.riskScore === undefined ? risk : task.riskScore;
  out.impactScore = task.impactScore === null || task.impactScore === undefined ? impact : task.impactScore;

  // Optionally fill a minimal description
  if (!task.description || !String(task.description).trim()) {
    out.description = 'No description provided — filled by local heuristic.';
  }

  return out;
}

export async function fillMissingFields(task) {
  // Ensure we operate on a shallow copy
  const input = { ...task };
  try {
    const data = await callGeminiProxy(input);
    // Expect proxy to return an object with fields to merge (e.g., complexityScore)
    if (data && typeof data === 'object') {
      return { ...input, ...data };
    }
    return localHeuristicFill(input);
  } catch (err) {
    console.warn('Gemini proxy failed, falling back to local heuristic:', err);
    return localHeuristicFill(input);
  }
}

export default { fillMissingFields };
