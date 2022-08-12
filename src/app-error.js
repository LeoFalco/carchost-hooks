export class AppError extends Error {
  constructor ({ status, code, message, extra }) {
    super()
    this.status = status
    this.code = code
    this.message = message
    this.extra = extra
  }
}
