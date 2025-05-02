// npm
import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import 'dotenv/config'

// types
import { validateEnv } from './zod/env.js'

validateEnv()

// routes
import { v1Router } from './routes/v1/index.js'

// do the thing
const app = express()

// middleware
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routes
app.use('/api/v1', v1Router)

// 404
app.use((req, res) => {
  console.log(`${req.method} ${req.url}`)
  res.status(404).json({
    success: false,
    message: 'Not found',
  })
})



app.listen(process.env.PORT, () => {
  console.log(`The server is running on port ${process.env.PORT}`)
})
