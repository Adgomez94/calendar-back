import { Request, Response, NextFunction } from 'express'

import userModel from './user.model'
import HttpExceptions from '@/utils/exceptions/http.exception'

const validationUser = async(
  req: Request,
  res: Response,
  next: NextFunction
) => 
{
  const { email } = req.body
  try {
    const user = await userModel.findOne({email}).countDocuments()
    if(user) next(new HttpExceptions('El usuario ya esta registrado', 400))
    next()
  } catch (error) {
    next(new HttpExceptions('Comuniquese con el administrador', 500))
  }
}

export default validationUser