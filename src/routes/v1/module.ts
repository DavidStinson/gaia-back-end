// npm
import { Router } from "express"

// controllers
import { generateModule } from "../../controllers/v1/module.js"

// module constants
const router = Router()

// routes
router.post("/generate", generateModule)

export { router as moduleRouter }
