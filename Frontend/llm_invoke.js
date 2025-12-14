import OpenAI from "openai";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

const client = new OpenAI({ 
  apiKey: apiKey,
  dangerouslyAllowBrowser: true 
});

export async function generateTaskDetails(task) {
  const prompt = `
    You are a project management AI assistant. 
    I have a task with the following details:
    Title: ${task.title}
    Priority: ${task.priority}
    Assignee: ${task.assignee}
    Due Date: ${task.deadline}
    ${task.description ? `Description: ${task.description}` : ''}
    ${task.tags ? `Tags: ${task.tags}` : ''}
    ${task.complexityScore !== null && task.complexityScore !== undefined ? `Complexity Score: ${task.complexityScore}` : ''}
    ${task.riskScore !== null && task.riskScore !== undefined ? `Risk Score: ${task.riskScore}` : ''}
    ${task.impactScore !== null && task.impactScore !== undefined ? `Impact Score: ${task.impactScore}` : ''}
    
    Please generate the following optional fields for this task. Use the provided details as context to make the generated fields more accurate.
    1. Description (a concise professional description)
    2. Tags (comma separated list of 3-5 relevant tags)
    3. Complexity Score (0-10 integer)
    4. Risk Score (0-10 integer)
    5. Impact Score (0-10 integer)
    
    Return the response in valid JSON format with keys: "description", "tags", "complexityScore", "riskScore", "impactScore".
    Do not include markdown formatting like \`\`\`json.
  `;

  try {
    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const content = response.choices[0].message.content;
    const cleanContent = content.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanContent);
  } catch (e) {
    console.error("AI generation failed", e);
    throw e;
  }
}

export async function generateDeveloperRating(kanban_data) {
  const prompt = `
    You are a senior engineering manager and project evaluation AI.

    I have Kanban task data for a team. Each task contains:
    - Status (toDo, inProgress, review, done)
    - Priority
    - Assignee
    - Deadline
    - Complexity Score
    - Risk Score
    - Impact Score
    - History logs describing progress and decisions

    Your job is to evaluate each developer’s performance based on this data.

    Rating rules:
    - Rate developers on a scale of 1 to 10 (decimals allowed).
    - Consider:
      1. Difficulty of work handled (complexity, risk, impact)
      2. Execution quality and depth inferred from history logs
      3. Task status progression (done > review > inProgress > toDo)
      4. Ownership, responsibility, and production readiness
    - High-quality in-progress or review work can score higher than completed low-effort tasks.
    - Be fair, realistic, and avoid favoritism.

    Kanban task data:
    ${JSON.stringify(kanban_data, null, 2)}

    Return the response in valid JSON format as an array.
    Each item must contain:
    {
      "name": "Developer Name",
      "developerRating": number,
      "justification": "Short professional explanation"
    }

    Do not include markdown formatting like \`\`\`json.
    Do not include any text outside the JSON response.
  `;

  try {
    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const content = response.choices[0].message.content;
    const cleanContent = content.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanContent);
  } catch (e) {
    console.error("Developer rating generation failed", e);
    throw e;
  }
}
