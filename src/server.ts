// npm
import express from "express"
import cors from "cors"
import logger from "morgan"
import "dotenv/config"
import { WebSocketServer } from "ws"

// types
import type { CustomWebSocket } from "./types.js"
import { validateEnv } from "./zod/env.js"

validateEnv()

// routes
import { v1Router } from "./routes/v1/index.js"

// ws
import { wsConnection } from "./ws-server.js"

// server
const app = express()
const wsServer = new WebSocketServer({ noServer: true })

// middleware
app.use(cors())
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routes
app.use("/api/v1", v1Router)

// 404
app.use((req, res) => {
  console.log(`${req.method} ${req.url}`)
  res.status(404).json({
    success: false,
    message: "Not found",
  })
})

const server = app.listen(process.env.PORT, () => {
  console.log(`The server is running on port ${process.env.PORT}`)
})

// ws setup
server.on("upgrade", (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, (ws) => {
    wsServer.emit("connection", ws, request)
  })
})

wsServer.on("connection", wsConnection)

export { wsServer }
