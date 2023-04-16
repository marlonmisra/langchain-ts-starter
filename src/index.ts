import * as dotenv from "dotenv";
import { OpenAI } from "langchain";
import { initializeAgentExecutor } from "langchain/agents";
import { SerpAPI } from "langchain/tools";
import { Calculator } from "langchain/tools";

dotenv.config();

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
console.log("Loaded agent.");

const input =
  "Who is Olivia Wilde's boyfriend?" +
  " What is his current age raised to the 0.23 power?";
console.log(`Executing with input "${input}"...`);

const result = await executor.call({ input });

console.log(`Got output ${result.output}`);


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
