/**
 * Represents a successful result with a value
 */
type Success<T> = [T, null]

/**
 * Represents a failure result with an error
 */
type Failure<E> = [null, E]

/**
 * A Result type that can either be a Success with a value or a Failure with an error
 * @template T - The type of the success value
 * @template E - The type of the error value, defaults to Error
 */
type Result<T, E = Error> = Success<T> | Failure<E>

async function tryCatch<T, E = Error>(
  promise: Promise<T>,
): Promise<Result<T, E>> {
  try {
    const data = await promise
    return [data, null]
  } catch (error) {
    return [null, error as E]
  }
}

export { tryCatch }

export type { Success, Failure, Result }
