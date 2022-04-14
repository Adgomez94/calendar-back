import { Request, Response, NextFunction, RequestHandler} from 'express'
import Joi from 'joi'

const validationSchema = ( schema: Joi.Schema ):RequestHandler => {

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ) =>{
    const validationOption = {
      abortEarly: true,
      allowUnknown: true,
      stripUnknown: true,
      skipFunctions: true
    }

    try {
      const value = await schema.validateAsync(req.body, validationOption)
      req.body = value
      next()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      const errors: string[] = []

      error.details.forEach( (error:Joi.ValidationErrorItem) =>{
        errors.push(error.message)
      })

      res.status(400).send({errors})
    }
  
  }
}

export default validationSchema