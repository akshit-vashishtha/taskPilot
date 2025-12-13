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
    
    Please generate the following optional fields for this task:
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
    // Remove any potential markdown code blocks if the model adds them
    const cleanContent = content.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanContent);
  } catch (e) {
    console.error("AI generation failed", e);
    throw e;
  }
}
