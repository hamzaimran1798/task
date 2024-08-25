require('dotenv').config();
const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function main() {
  const chatCompletion = await groq.chat.completions.create({
    "messages": [
      {
        "role": "system",
        "content": "you are chatbot that helps maths student with their calculus problems."
      },
      {
        "role": "user",
        "content": "what is derivatives tell  me in short?"
      }
    ],
    "model": "llama3-8b-8192",
    "temperature": 1,
    "max_tokens": 200,
    "top_p": 1,
    "stream": true,
    "stop": null
  });

  for await (const chunk of chatCompletion) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
}

main();