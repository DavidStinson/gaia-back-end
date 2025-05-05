// models
import { models } from "./models.js"

// docs
import * as docs from "../../docs/index.js"

// prompts
import {
  smePromptTemplate,
  ledPromptTemplate,
} from "../../prompts/v1/module.js"

// helpers
import { tryCatch } from "../../helpers/try-catch.js"

// types
import type { ModuleOutline, Module } from "../../types.js"

// ai services
async function generate(reqData: ModuleOutline): Promise<Module> {
  let smePreviousMicrolessonContent = ""
  let ledPreviousMicrolessonContent = ""

  const module: Module = {
    ...reqData,
    microlessons: reqData.microlessons.map((microlesson) => ({
      ...microlesson,
      smeResponse: "",
      ledResponse: "",
    })),
  }

  for await (const microlesson of module.microlessons) {
    const [smePrompt, templateError] = await tryCatch(
      smePromptTemplate.invoke({
        ...reqData,
        microlessonTitle: microlesson.title,
        microlessonTime: microlesson.minutes,
        microlessonLearningObjective: microlesson.learningObjective,
        microlessonOutline: microlesson.outline,
        smePreviousMicrolessonContent,
        docsGaLearningPhilosophy: docs.gaLearningPhilosophy,
        docsTechnicalVoice: docs.technicalVoice,
      }),
    )

    if (templateError) {
      throw templateError
    }

    const [smeResponse, smeLlmError] = await tryCatch(
      models.gpt41.invoke(smePrompt),
    )

    if (smeLlmError) {
      throw smeLlmError
    }

    console.log(smeResponse.content.toString())

    smePreviousMicrolessonContent += smeResponse.content.toString()

    microlesson.smeResponse = smeResponse.content.toString()

    const [ledPrompt, ledTemplateError] = await tryCatch(
      ledPromptTemplate.invoke({
        ...reqData,
        smeResponse,
        ledPreviousMicrolessonContent,
        microlessonTitle: microlesson.title,
        microlessonTime: microlesson.minutes,
        microlessonLearningObjective: microlesson.learningObjective,
        microlessonOutline: microlesson.outline,
        docsGaLearningPhilosophy: docs.gaLearningPhilosophy,
        docsTechnicalVoice: docs.technicalVoice,
        docsCraftingModularCode: docs.craftingModularCode,
        docsMarkdownDocumentStructure: docs.markdownDocumentStructure,
        docsWritingModularly: docs.writingModularly,
        docsGaInclusivityGuidelines: docs.gaInclusivityGuidelines,
        docsExerciseInstructionGuidelines: docs.exerciseInstructionGuidelines,
      }),
    )

    if (ledTemplateError) {
      throw ledTemplateError
    }

    const [ledResponse, ledLlmError] = await tryCatch(
      models.gpt41.invoke(ledPrompt),
    )

    if (ledLlmError) {
      throw ledLlmError
    }

    console.log(ledResponse.content.toString())

    ledPreviousMicrolessonContent += ledResponse.content.toString()

    microlesson.ledResponse = ledResponse.content.toString()
  }

  return module
}

export { generate }
