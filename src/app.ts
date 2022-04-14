import express, { Application } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import mongoose from 'mongoose'


import ErrorMiddleware from '@/middlewares/error.middleware'
import Controller from '@/utils/interfaces/controller.interfaces'


class AppServer {

  private app: Application
  private port: number
  private mongoPath:string

  constructor(port: number,controllers: Controller[]) {
    this.app = express()
    this.port = port
    this.mongoPath = process.env.URL_DATABASE || 'mongodb://localhost:27017/calendar'

    // Middleware
    this.initialseConnectionDB()
    this.initialseMiddleware()
    this.initialseController(controllers)
    this.initialseErrorHanling()
  }

  private initialseMiddleware(): void {
    this.app
      .use(helmet())
      .use(cors())
      .use(morgan('dev'))
      .use(express.json())
      .use(express.urlencoded({extended:false}))
  }

  private initialseErrorHanling():void {
    this.app.use(ErrorMiddleware)
  }

  private async initialseConnectionDB():Promise<void> {
    try {
      await mongoose.connect(this.mongoPath)
      console.log('Conectado')
    } catch (error) {
      console.log(error)
    }
  }

  private initialseController(controllers: Controller[]):void {
    controllers.forEach( controller => {
      this.app.use( '/api', controller.router )
    })
  }

  listen(): void {
    this.app.listen( this.port, ()=> {
      console.log('El server se conecta en el puerto ' + this.port)
    })
  }
}

export default AppServer