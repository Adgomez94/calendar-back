import { Router, Request, Response, NextFunction } from 'express'
//Services
import EventService from './event.service'

// Interfaces
import Controller from '@/utils/interfaces/controller.interfaces'
import validationJWT from '@/middlewares/authenticated.middleware'
import validationSchema from '@/middlewares/validation.middleware'
import schemaEvent from './event.validate'
import HttpExceptions from '@/utils/exceptions/http.exception'


const eventService = new EventService()
class EventController implements Controller {

  public path = '/events'
  public router = Router()

  constructor() {
    this.initialiseRoutes()
  }

  private initialiseRoutes():void {
    this.router
      // .use(validationJWT)
      .get(`${this.path}/`, this.getEvents)
      .post(`${this.path}/`, validationSchema(schemaEvent.create), validationJWT ,this.createEvent)
      .put(`${this.path}/:id`, validationJWT, this.updateEvent)
      .delete(`${this.path}/:id`, validationJWT ,this.deleteEvent)
  }

  private async getEvents(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const events = await eventService.getEvents()
    res.status(200).json({
      events
    })
  }
  private async createEvent(
    req: Request,
    res: Response,
    next: NextFunction
  ):Promise<void> {
    const { title, start, end, user } = req.body
    try {
      const event = await eventService.createEvent(title, start, end, user.uid)
      res.status(200).json({
        event
      })
    } catch (error) {
      if(error instanceof Error) next(new HttpExceptions(error.message, 500))
    }
  
  }
  private async updateEvent(
    req: Request,
    res: Response,
    next: NextFunction
  ):Promise<void> {

    const { id } = req.params
    
    const { user, ...object } = req.body
    try {
      const event = await eventService.findById(id)

      if(!event) return next(new HttpExceptions('El evento no esta en nuestra base de datos', 404))

      if( req.body.user.uid !== event?.user.toString() ) return next(new HttpExceptions('El evento no esta en nuestra base de datos', 401))

      const eventUpdate = await eventService.updateEvent({...object, user:req.body.user.uid}, id)

      res.status(200).json({
        event: eventUpdate
      })


    } catch (error) {
      if(error instanceof Error) next(new HttpExceptions(error.message, 500))
    }
  }
  private async deleteEvent(
    req: Request,
    res: Response,
    next: NextFunction
  ):Promise<void> {
    const { id } = req.params

    try {
      const event = await eventService.findById(id)

      if(!event) return next(new HttpExceptions('El evento no esta en nuestra base de datos', 404))

      if( req.body.user.uid !== event?.user.toString() ) return next(new HttpExceptions('El evento no esta en nuestra base de datos', 401))

      await eventService.deleteEvent(id)

      res.status(200).json({
        ok: true
      })
    } catch (error) {
      if(error instanceof Error) next(new HttpExceptions(error.message, 500))
    }
  }
}

export default EventController