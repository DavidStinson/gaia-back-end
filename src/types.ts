// types
import type { WebSocket } from "ws"

interface CustomWebSocket extends WebSocket {
  isAlive: boolean
}

interface ModuleOutline {
  title: string
  about: string
  learnerPersona: string
  tools: string[]
  prerequisites: string[]
  microlessons: {
    title: string
    minutes: number
    learningObjective: string
    outline: string[]
  }[]
}

interface Module {
  title: string
  about: string
  learnerPersona: string
  tools: string[]
  prerequisites: string[]
  microlessons: {
    title: string
    minutes: number
    learningObjective: string
    outline: string[]
    smeResponse: string
    ledResponse: string
  }[]
}

export type { CustomWebSocket, ModuleOutline, Module }
