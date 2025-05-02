import { ChatAnthropic } from "@langchain/anthropic"
import { ChatOpenAI } from "@langchain/openai"

const claude35 = new ChatAnthropic({
  model: "claude-3-5-sonnet-20240620",
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const gpt41 = new ChatOpenAI({
  model: "gpt-4.1",
  apiKey: process.env.OPENAI_API_KEY,
})

const openaiO3 = new ChatOpenAI({
  model: "o3",
  apiKey: process.env.OPENAI_API_KEY,
})

const models = {
  claude35,
  gpt41,
  openaiO3,
}

export { models }
