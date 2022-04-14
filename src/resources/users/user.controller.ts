import { Router, Request, Response, NextFunction } from 'express'

// Services
import UserService from './user.service'

// Interfaces
import Controller from '@/utils/interfaces/controller.interfaces'
import validationSchema from '@/middlewares/validation.middleware'
import schema from '@/resources/users/user.validate'
import HttpExceptions from '@/utils/exceptions/http.exception'
import validationUser from './user.middleware'
import validationJWT from '@/middlewares/authenticated.middleware'
import { generateToken } from '../../utils/token'

const userService = new UserService()

class UserController implements Controller {
  public path = '/users'
  public router = Router()

  constructor() {  
    this.initialiseRoutes()
  }

  private initialiseRoutes(): void {
    this.router
      .post( `${this.path}/new`, validationSchema(schema.create), validationUser ,this.register)
      .post( `${this.path}/`, validationSchema(schema.login) ,this.login)
      .get( `${this.path}/renew`, validationJWT ,this.refreshToken)
  }

  private async register(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const newUser = await userService.create(req.body)
      res.status(200).json(newUser)
    } catch (error) {
      if(error instanceof Error) next(new HttpExceptions(error.message, 500))
    }
  }

  private async login(
    req: Request,
    res: Response,
    next: NextFunction
  ) {

    const { email, password } = req.body
    try {
      const newUser = await userService.findByEmail(email)

      //*Validate Password
      const validPassword = await newUser.comparePassword(password)
      if(!validPassword) return next(new HttpExceptions('Usuario o Contraseña no son correctos', 400))

      const { uid } = newUser

      //* JWT
      const token = generateToken(uid, email)
      res.status(200).json({
        token
      })
    } catch (error) {
      if(error instanceof Error) next(new HttpExceptions(error.message, 500))
    }
  }

  private refreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { email, uid } = req.body.user

    const token = generateToken(uid, email)
    res.status(200).json({
      token
    })
  }
}

export default UserController