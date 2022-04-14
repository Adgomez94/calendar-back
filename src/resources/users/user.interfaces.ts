import { Document } from 'mongoose'

export interface User extends Document {
  name: string
  email: string
  password: string
  uid: string

  comparePassword(password: string): Promise<boolean>
}

export interface UserDTO {
  name: string
  email: string
  password: string
  uid: string
}
