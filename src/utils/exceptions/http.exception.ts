
class HttpExceptions extends Error {

  constructor(
    public message: string,
    public status: number) {
    super(message)
    
    this.message = message
    this.status = status
  }
}

export default HttpExceptions