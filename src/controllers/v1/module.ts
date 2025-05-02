// types
import type { Request, Response } from "express"

// services
import * as moduleAiService from "../../services-ai/v1/module.js"

// zod
import { moduleOutlineSchema } from "../../zod/v1/module-outline.js"

// controllers
async function generateModule(req: Request, res: Response) {
  const { error } = moduleOutlineSchema.safeParse(req.body)
  if (error) {
    console.log(error)
    return void res.status(400).json({ error: error.message })
  }

  const aiModule = await moduleAiService.generate(req.body)

  console.log(aiModule)

  return void res.status(200).json(aiModule)
}

export { generateModule }
