export interface ServerError {
  success: boolean
  errors: Error[]
}

export interface Error {
  code: string
  minimum: number
  type: string
  inclusive: boolean
  message: string
  path: string[]
}
