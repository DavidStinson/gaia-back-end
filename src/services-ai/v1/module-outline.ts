// models
import { models } from "./models.js"

// docs
import { gaLearningPhilosophy } from "../../docs/index.js"

// prompts
import {
  generatePromptTemplate,
  qaPromptTemplate,
} from "../../prompts/v1/module-outline.js"

// helpers
import { tryCatch } from "../../helpers/try-catch.js"

// zod
import { moduleOutlineSchema } from "../../zod/v1/module-outline.js"

// types
interface ModuleOutlineReqData {
  title: string
  about: string
  minutes: number
  learnerPersona: string
  learningObjectives: string[]
  tools: string[]
}

// ai services
const generate = async (reqData: ModuleOutlineReqData) => {
  const structuredClaude35 = models.claude35.withStructuredOutput(
    moduleOutlineSchema,
    { name: "moduleOutlineSchema" },
  )

  const structuredOpenaiO3 = models.openaiO3.withStructuredOutput(
    moduleOutlineSchema,
    { name: "moduleOutlineSchema" },
  )

  const [generatePrompt, templateError] = await tryCatch(
    generatePromptTemplate.invoke({
      ...reqData,
      gaLearningPhilosophy,
    }),
  )

  if (templateError) {
    throw templateError
  }

  const [generateResponse, llmError] = await tryCatch(
    structuredClaude35.invoke(generatePrompt),
  )

  if (llmError) {
    throw llmError
  }

  console.log(generateResponse)

  const [qaPrompt, qaTemplateError] = await tryCatch(
    qaPromptTemplate.invoke({
      gaLearningPhilosophy,
      generateResponse,
    }),
  )

  if (qaTemplateError) {
    throw qaTemplateError
  }

  const [qaResponse, qaLlmError] = await tryCatch(
    structuredOpenaiO3.invoke(qaPrompt),
  )

  if (qaLlmError) {
    throw qaLlmError
  }

  // const chain = generatePromptTemplate
  //   .pipe(structuredClaude35)
  //   .pipe(qaPromptTemplate)
  //   .pipe(structuredOpenaiO3)

  // const [response, llmError] = await tryCatch(
  //   chain.invoke({ ...reqData, gaLearningPhilosophy }),
  // )

  return qaResponse
}

export { generate }
