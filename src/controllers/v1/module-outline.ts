// node
import { randomUUID } from "node:crypto"

// types
import type { Request, Response } from "express"

// zod
import { moduleDataSchema } from "../../zod/v1/module-outline.js"

// helpers
import { tryCatch } from "../../helpers/try-catch.js"
import { taskManagers } from "../../helpers/task-manager.js"

// services
import * as moduleOutlineAiService from "../../services-ai/v1/module-outline.js"

// controllers
async function generateModuleOutline(req: Request, res: Response) {
  const { error } = moduleDataSchema.safeParse(req.body)
  if (error) {
    console.log(error)
    return void res.status(400).json({ error: error.message })
  }

  const taskId = randomUUID()

  // Create a task for this request
  taskManagers.moduleOutline.createTask(taskId)

  res.status(200).json({ taskId })

  const [moduleOutline, moduleOutlineError] = await tryCatch(
    moduleOutlineAiService.generate(req.body),
  )

  if (moduleOutlineError) {
    taskManagers.moduleOutline.failTask(taskId, moduleOutlineError.message)
    return
  }

  taskManagers.moduleOutline.completeTask(taskId, moduleOutline)

  return
}

export { generateModuleOutline }
