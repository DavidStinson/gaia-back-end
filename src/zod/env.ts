import { z } from 'zod'

import type { TypeOf } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number(),
  ANTHROPIC_API_KEY: z.string(),
})

declare global {
  namespace NodeJS {
    interface ProcessEnv extends TypeOf<typeof envSchema> {}
  }
}

function validateEnv() {
  try {
    envSchema.parse(process.env)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const { fieldErrors } = error.flatten()
      const errorMessages = Object.entries(fieldErrors)
        .map(([field, errs]) => errs ? `${field}: ${errs.join(', ')}` : field)
        .join('\n')
      console.error('Missing environment variables:\n' + errorMessages)
      process.exit(1)
    }
  }
}

export { validateEnv }
