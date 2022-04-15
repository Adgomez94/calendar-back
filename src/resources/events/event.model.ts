import { Schema, model } from 'mongoose'
import { Event } from './event.interfaces'

const EventSchema = new Schema({

  title:{
    type: String,
    required: true
  },
  notes:{
    type: String
  },
  start:{
    type: Date,
    required: true
  },
  end:{
    type: Date,
    required: true
  },
  user:{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user'

  },
})

EventSchema.methods.toJSON = function (){
  const { __v, _id, ...event }:Event = this.toObject()
  event.uid = _id
  return event
}

export default model<Event>('event', EventSchema)

