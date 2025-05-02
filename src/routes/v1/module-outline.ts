// npm
import { Router } from "express"

// controllers
import { generateModuleOutline } from "../../controllers/v1/module-outline.js"

// module constants
const router = Router()

// routes
router.post("/generate", generateModuleOutline)

export { router as moduleOutlineRouter }
