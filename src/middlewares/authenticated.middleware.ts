import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import HttpExceptions from '@/utils/exceptions/http.exception'
import { verifyToken } from '../utils/token'


const validationJWT = async(
  req:Request,
  res: Response,
  next: NextFunction
) => 
{
  const token = req.header('x-token')
  if(!token) return next(new HttpExceptions('Unauthorised', 401))

  const payload = await verifyToken(token)
  if (payload instanceof jwt.JsonWebTokenError) return next(new HttpExceptions('Unauthorised', 401))
  req.body.user = {
    uid: payload.uid,
    email: payload.email,
    name: payload.name
  }
  next()
}

export default validationJWT