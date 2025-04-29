export type ErrorType<T = [{ message: string }]> = {
  data: {
    error: string
    messages: T
    statusCode: number
  }
  status: number
}