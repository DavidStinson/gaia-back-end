// types
import type { Request, Response } from "express"

// zod
import { moduleDataSchema } from "../../zod/v1/module-outline.js"

// services
import * as moduleOutlineAiService from "../../services-ai/v1/module-outline.js"

// controllers
async function generateModuleOutline(req: Request, res: Response) {
  const { error } = moduleDataSchema.safeParse(req.body)
  if (error) {
    console.log(error)
    return void res.status(400).json({ error: error.message })
  }

  const AiModuleOutline = await moduleOutlineAiService.generate(req.body)

  res.status(200).json(AiModuleOutline)
  return
}

export { generateModuleOutline }
