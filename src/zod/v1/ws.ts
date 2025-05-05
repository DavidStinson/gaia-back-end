import { z } from 'zod'

const wsTaskSchema = z.object({
  taskId: z.string(),
  taskType: z.string(),
  msgType: z.string(),
})

export { wsTaskSchema }
