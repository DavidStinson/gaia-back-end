import { z } from "zod"

const moduleDataSchema = z.object({
  title: z.string(),
  about: z.string(),
  minutes: z.coerce.number(),
  learnerPersona: z.string(),
  learningObjectives: z.array(z.string()),
  tools: z.array(z.string()),
})

const microlessonSchema = z.object({
  title: z.string(),
  id: z.coerce.number(),
  minutes: z.coerce.number(),
  learningObjective: z.string(),
  outline: z.array(z.string()),
})

const moduleOutlineSchema = z.object({
  title: z.string(),
  about: z.string(),
  learnerPersona: z.string(),
  tools: z.array(z.string()),
  prerequisites: z.array(z.string()),
  microlessons: z.array(microlessonSchema),
})

export { moduleDataSchema, moduleOutlineSchema }
