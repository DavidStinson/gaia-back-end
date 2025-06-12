// node
import { randomUUID } from "node:crypto"

// types
import type { Request, Response } from "express"
import { moduleDataSchema } from "../../zod/v1/module-outline.js"

// docs
import * as docs from "../../docs/index.js"

// helpers
import { tryCatch } from "../../helpers/try-catch.js"
import { taskManagers } from "../../helpers/task-manager.js"
import type { Module } from "../../types.js"

// module constants
const crewAPI = process.env.CREW_API
const crewToken = process.env.CREW_TOKEN

// controllers
async function generateCrewModule(req: Request, res: Response) {
  const { error } = moduleDataSchema.safeParse(req.body)
  if (error) {
    console.log(error)
    return void res.status(400).json({ error: error.message })
  }

  console.log(req.body)

  const crewPayload = {
    inputs: {
      prerequisites: [],
      microlessons: [],
      tools: req.body.tools,
      doc_technical_voice: docs.technicalVoice,
      module_topic: req.body.about,
      doc_writing_modularly: docs.writingModularly,
      final_format: "markdown",
      module_minutes: req.body.minutes,
      doc_ga_inclusivity_guidelines: docs.gaInclusivityGuidelines,
      doc_crafting_modular_code: docs.craftingModularCode,
      doc_exercise_instruction_guidelines: docs.exerciseInstructionGuidelines,
      doc_markdown_document_structure: docs.markdownDocumentStructure,
      learner_persona: req.body.learnerPersona,
      module_title: req.body.title,
      doc_ga_learning_philosophy: docs.gaLearningPhilosophy,
      learning_objectives: req.body.learningObjectives,
      microlessons_text: "",
    },
    flowFinishWebhookUrl: "",
  }

  const [kickoffResponse, kickOffError] = await tryCatch(
    fetch(`${crewAPI}/kickoff`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${crewToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(crewPayload),
    }),
  )

  if (kickOffError) {
    console.error("Error contacting Crew AI during kickoff:", kickOffError)
    return void res.status(500).json({
      message: "Error contacting Crew AI system during kickoff.",
    })
  }

  if (!kickoffResponse.ok) {
    console.log("Crew AI response:", kickoffResponse.status)
    console.log("Crew AI response body:", await kickoffResponse.text())

    return void res.status(500).json({
      message: `Crew AI responded with status ${kickoffResponse.status} during kickoff`,
    })
  }

  const initialCrewResponse = await kickoffResponse.json()

  if (
    !initialCrewResponse ||
    typeof initialCrewResponse !== "object" ||
    !("kickoff_id" in initialCrewResponse)
  ) {
    return void res.status(500).json({
      message: "Crew AI did not return a kickoff ID.",
    })
  }

  const taskId = randomUUID()

  taskManagers.module.createTask(taskId)

  res.status(200).json({ taskId })

  const crewResponseId = initialCrewResponse.kickoff_id
  let isCrewComplete = false
  let output = ""

  while (!isCrewComplete) {
    console.log("Checking crew status...")
    await new Promise((resolve) => setTimeout(resolve, 5000))
    console.log("Fetching crew status... (after setTimeout)")

    const [crewResponse, crewResponseError] = await tryCatch(
      fetch(`${crewAPI}/status/${crewResponseId}`, {
        headers: {
          Authorization: `Bearer ${crewToken}`,
        },
      }),
    )

    if (crewResponseError) {
      console.error("Error contacting Crew AI:", crewResponseError)
      return void res.status(500).json({
        success: false,
        message: "Error contacting Crew AI system after kickoff.",
      })
    }

    const response = await crewResponse.json()

    console.log("Crew status:", response)

    if (
      !response ||
      typeof response !== "object" ||
      !("state" in response) ||
      !("result" in response)
    ) {
      console.error("Crew AI did not return a valid response after kickoff.")
      return void res.status(500).json({
        message: "Crew AI did not return a valid response after kickoff.",
      })
    }

    if (response.state === "SUCCESS") {
      isCrewComplete = true
    }

    if (
      response.state === "FAILED" ||
      (response.state === "SUCCESS" &&
        !response.result &&
        typeof response.result !== "string")
    ) {
      console.error("Crew AI failed to generate the module.")
      return void res.status(500).json({
        success: false,
        message: "Crew AI failed to generate the module.",
      })
    }

    if (typeof response.result === "string") {
      output = response.result
    }
  }

  const finalOutput = await JSON.parse(output)

  console.log("Final output:", finalOutput)

  const fixedOutput: Module = {
    title: finalOutput.title,
    about: finalOutput.about,
    learnerPersona: finalOutput.learner_persona,
    prerequisites: finalOutput.prerequisites,
    tools: finalOutput.tools,
    microlessons: [],
  }

  fixedOutput.microlessons = finalOutput.microlessons.map(
    (microlesson: any) => ({
      id: microlesson.id,
      title: microlesson.title,
      learningObjective: microlesson.learning_objective,
      minutes: microlesson.minutes,
      outline: microlesson.outline,
      smeResponse: microlesson.sme_response,
      ledResponse: microlesson.led_response,
    }),
  )

  taskManagers.module.completeTask(taskId, fixedOutput)
  return
}

export { generateCrewModule }
