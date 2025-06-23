import { OpenAI } from 'openai';
import dotenv from 'dotenv';
dotenv.config();


export async function generateReadmeFromContextFromOpenAi(context, projectName) {
  console.log(projectName)
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const prompt = `
    You are a helpful assistant. Write a detailed and well-formatted README.md file for a GitHub project named "${projectName}".
    Use the following context: ${context}.
    Include sections like Introduction, Features, Installation, Usage, and License.
  `;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are a helpful README generator bot.' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.7
  });

  return completion.choices[0].message.content;
}

export async function generateReadmeFromContextFromOpenRouter(context, projectName, stack = []) {
  console.log("📝 Generating README from context using OpenRouter...");
  const techStackList = stack.map(tech => `- ${tech}`).join('\n');

  const prompt = `
Generate a professional and well-structured README.md file for a GitHub project.

Project Name: **${projectName}**

Description:
${context}

Tech Stack:
${techStackList}

Add emojis to section headers and features. Include the following sections:
- 📌 Introduction
- 🚀 Features
- 🛠️ Tech Stack
- 📦 Installation
- 🧪 Usage
- 🤝 Contributing (optional)
- 📝 License

Format it cleanly in Markdown. Use clear, simple language for developers.
`;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant that writes great README files." },
        { role: "user", content: prompt.trim() }
      ]
    })
  });

  const data = await response.json();

  if (!data.choices || !data.choices[0]?.message?.content) {
    console.error("❌ Failed to generate README from OpenRouter response:", data);
    return "README generation failed.";
  }

  const readme = data.choices[0].message.content;
  console.log("✅ README generated successfully:\n\n");
  return readme;
}

