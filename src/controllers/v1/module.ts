// node
import { randomUUID } from "node:crypto"

// types
import type { Request, Response } from "express"

// zod
import { moduleOutlineSchema } from "../../zod/v1/module-outline.js"

// helpers
import { tryCatch } from "../../helpers/try-catch.js"
import { taskManagers } from "../../helpers/task-manager.js"

// services
import * as moduleAiService from "../../services-ai/v1/module.js"

// controllers
async function generateModule(req: Request, res: Response) {
  const { error } = moduleOutlineSchema.safeParse(req.body)
  if (error) {
    console.log(error)
    return void res.status(400).json({ error: error.message })
  }

  const taskId = randomUUID()

  res.status(200).json({ taskId })

  taskManagers.module.createTask(taskId)

  const [module, moduleError] = await tryCatch(
    moduleAiService.generate(req.body),
  )

  if (moduleError) {
    taskManagers.moduleOutline.failTask(taskId, moduleError.message)
    return
  }

  taskManagers.module.completeTask(taskId, module)
}

export { generateModule }
