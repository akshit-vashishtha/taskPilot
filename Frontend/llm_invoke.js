import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function runPrompt(prompt) {
  const response = await client.responses.create({
    model: "gpt-3.5-turbo",
    input: prompt,
  });

  return response.output_text;
}


// runPrompt("What is Halo Combat Evolved ? Explain in 200 words").then((response) => {
//   console.log(response);
// });