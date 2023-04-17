import * as dotenv from "dotenv";
import * as readline from 'readline';
import { OpenAI } from "langchain";
import { initializeAgentExecutor } from "langchain/agents";
import { SerpAPI } from "langchain/tools";
import { Calculator } from "langchain/tools";

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const model = new OpenAI({ temperature: 0 });
const tools = [
  new SerpAPI(process.env.SERPAPI_API_KEY, {
    location: "Austin,Texas,United States",
    hl: "en",
    gl: "us",
  }),
  new Calculator(),
];

const executor = await initializeAgentExecutor(
  tools,
  model,
  "zero-shot-react-description"
);


function getUserInput(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, (input) => {
      resolve(input);
      rl.close();
    });
  });
}

async function main() {
  const userInput = await getUserInput('Please enter your question: ');

  const input = userInput

  const result = await executor.call({ input });

  console.log(`${result.output}`);
  
}




main()
/*
import * as dotenv from "dotenv";
import { OpenAI } from "langchain";

dotenv.config();

const model = new OpenAI({
  modelName: "gpt-3.5-turbo",
  openAIApiKey: process.env.OPENAI_API_KEY,
});

const res = await model.call(
  "What's a good idea for an application to build with GPT-3?"
);

console.log(res);
*/
