// types
type RequestState = "pending" | "processing" | "completed" | "failed"
type RequestResult<T> = {
  state: RequestState
  result?: T
  error?: string
  createdAt: number
  updatedAt: number
}

// store
const requestStore = new Map<string, RequestResult<any>>()

// helpers
const generateRequestId = () => Math.random().toString(36).substring(2, 15)

// service
const trackRequest = <T>(initialData: Partial<T> = {}) => {
  const requestId = generateRequestId()
  const now = Date.now()

  requestStore.set(requestId, {
    state: "pending",
    result: initialData,
    createdAt: now,
    updatedAt: now,
  })

  return requestId
}

const updateRequest = <T>(
  requestId: string,
  update: Partial<RequestResult<T>>,
) => {
  const request = requestStore.get(requestId)
  if (!request) return false

  requestStore.set(requestId, {
    ...request,
    ...update,
    updatedAt: Date.now(),
  })

  return true
}

const getRequest = <T>(requestId: string): RequestResult<T> | undefined => {
  return requestStore.get(requestId)
}

const cleanupOldRequests = (maxAge: number = 2 * 60 * 60 * 1000) => {
  // 2 hours
  const now = Date.now()
  for (const [id, request] of requestStore.entries()) {
    if (now - request.updatedAt > maxAge) {
      requestStore.delete(id)
    }
  }
}

// Start cleanup interval
setInterval(cleanupOldRequests, 60 * 60 * 1000) // Run every hour

export {
  trackRequest,
  updateRequest,
  getRequest,
  type RequestState,
  type RequestResult,
}
