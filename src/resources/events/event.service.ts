import eventModel from './event.model'
import { Types} from 'mongoose'
import { Event, EventDTO } from './event.interfaces'


class EventService {


  public async getEvents() 
  {
    const events = await eventModel.find().populate('user', 'name')
    
    return events
  }
  public  async createEvent(
    title: string,
    start: Date,
    end: Date,
    user: Types.ObjectId
  ) 
  {
    const newEvent = new eventModel({title,start,end})

    try {
      newEvent.user = user
      await newEvent.save()
      return newEvent
    } catch (error) {
      throw new Error('No se puedo crear el usuario')
    }
  }
  public async updateEvent(
    event: EventDTO,
    id: string
  ) 
  {
    try {
      const updateEvent = await eventModel.findByIdAndUpdate(id, event, { new:true })
      return updateEvent
    } catch (error) {
      throw new Error('No se puedo actualizar el event')
    }
  }
  public async deleteEvent(
    id: string
  ) 
  {
    try {
      await eventModel.findByIdAndDelete(id)
    } catch (error) {
      throw new Error('No se puedo actualizar el event')
    }
  }

  public async findById (id: string): Promise<Event | null> {

    try {
      const event = await eventModel.findById(id)
      return event
    } catch (error) {
      throw new Error('Comuniquese con el administrador')
    }
  }

}

export default EventService