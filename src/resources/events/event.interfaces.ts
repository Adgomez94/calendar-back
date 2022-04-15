import { Document, Types } from 'mongoose'

export interface EventDTO {
  title: string,
  notes?: string,
  start: number,
  end: number,
  user: Types.ObjectId,
  uid?: Types.ObjectId
}

export interface Event extends EventDTO, Document {}