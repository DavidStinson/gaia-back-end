// types
import type { WebSocket } from "ws"
import type { ModuleOutline, Module } from "../types.js"

interface Task<T = any> {
  id: string
  status: "pending" | "completed" | "error"
  result?: T
  error?: string
  subscribers: Set<WebSocket>
}

class TaskManager<T = any> {
  private tasks: Map<string, Task<T>> = new Map()

  createTask(id: string): void {
    this.tasks.set(id, {
      id,
      status: "pending",
      subscribers: new Set(),
    })
  }

  subscribeToTask(taskId: string, ws: WebSocket): boolean {
    const task = this.tasks.get(taskId)
    if (!task) return false

    task.subscribers.add(ws)
    return true
  }

  completeTask(taskId: string, result: T): void {
    const task = this.tasks.get(taskId)
    if (!task) return

    task.status = "completed"
    task.result = result

    // Notify all subscribers
    for (const subscriber of task.subscribers) {
      subscriber.send(
        JSON.stringify({
          type: "task_completed",
          taskId,
          result,
        }),
      )
    }
  }

  failTask(taskId: string, error: string): void {
    const task = this.tasks.get(taskId)
    if (!task) return

    task.status = "error"
    task.error = error

    // Notify all subscribers
    for (const subscriber of task.subscribers) {
      subscriber.send(
        JSON.stringify({
          type: "error",
          taskId,
          error,
        }),
      )
    }
  }

  getTaskStatus(taskId: string): "pending" | "completed" | "error" | null {
    return this.tasks.get(taskId)?.status ?? null
  }
}

// Create task managers
const taskManagers = {
  moduleOutline: new TaskManager<ModuleOutline>(),
  module: new TaskManager<Module>(),
  // Add more task managers here as needed
  // userProfile: new TaskManager<UserProfile>(),
  // analytics: new TaskManager<AnalyticsData>(),
}

export { taskManagers }
