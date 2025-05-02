// npm
import { Router } from 'express'

// routers
import { moduleOutlineRouter } from './module-outline.js'
import { moduleRouter } from './module.js'
import { crewRouter } from './crew.js'

// module constants
const router = Router()

// routes
router.use('/module-outline', moduleOutlineRouter)
router.use('/module', moduleRouter)
router.use('/crew', crewRouter)

export { router as v1Router }
