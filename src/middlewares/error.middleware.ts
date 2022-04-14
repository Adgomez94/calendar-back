import { Request, Response, NextFunction } from 'express'

import HttpExceptions from '@/utils/exceptions/http.exception'

const ErrorMiddleware = (error:HttpExceptions, req:Request, res:Response, _next:NextFunction) => {
  const status = error.status || 500
  const message = error.message || 'Something went wrong'

  res.status(status).json({ message})
}

export default ErrorMiddleware