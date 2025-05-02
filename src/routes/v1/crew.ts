// npm
import { Router } from "express"

// controllers
import { generateCrewModule } from "../../controllers/v1/crew-module.js"

// module constants
const router = Router()

// routes
router.post("/generate-module", generateCrewModule)

export { router as crewRouter }
