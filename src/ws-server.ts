// types
import type { CustomWebSocket } from "./types.js"

// helpers
import { taskManagers } from "./helpers/task-manager.js"
import { tryCatch } from "./helpers/try-catch.js"

// types


interface WsTask {
  taskId: string
  taskType: string
  msgType: string
}

// zod
import { wsTaskSchema } from "./zod/v1/ws.js"

function wsConnection(ws: CustomWebSocket) {
  ws.isAlive = true
  console.log("New websocket connection established")

  ws.on("message", async (message) => {
    const [data, parseError] = await tryCatch(JSON.parse(message.toString()))

    if (parseError) {
      console.error("Error parsing message:", parseError)
      ws.send(
        JSON.stringify({
          type: "error",
          message: "Invalid message format",
        }),
      )
      return
    }

    const { error } = wsTaskSchema.safeParse(data)
    if (error) {
      console.log(error)
      ws.send(
        JSON.stringify({
          type: "error",
          message: `An error occurred: ${error.message}`,
        }),
      )
      return
    }

    const { taskId, taskType, msgType } = data as WsTask

    if (msgType !== "subscribe") {
      ws.send(
        JSON.stringify({
          type: "error",
          message: `Msg type not supported: ${msgType}`,
        }),
      )
      return
    }


    const taskManager = taskManagers[taskType as keyof typeof taskManagers]
    
    if (!taskManager) {
      ws.send(
        JSON.stringify({
          type: "error",
          message: `Task type not found: ${taskType}`,
        }),
      )
      return
    }

    const success = taskManager.subscribeToTask(taskId, ws)
    if (!success) {
      ws.send(
        JSON.stringify({
          type: "error",
          message: `Task not found: ${taskId}`,
        }),
      )
    }
  })

  ws.on("error", (error) => {
    console.error("WebSocket error:", error)
  })

  ws.on("close", () => {
    ws.isAlive = false
  })

  ws.on("pong", () => {
    ws.isAlive = true
  })

  const interval = setInterval(
    () => {
      if (!ws.isAlive) return ws.terminate()
      ws.isAlive = false
      ws.ping()
    },
    20000,
  )
  
  ws.on("close", () => {
    ws.isAlive = false
    clearInterval(interval)
  })
}

export { wsConnection, taskManagers }
