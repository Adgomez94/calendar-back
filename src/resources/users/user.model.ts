import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

import { User }  from './user.interfaces'

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

UserSchema.methods.toJSON = function (){
  const { __v, _id, password, ...user }:User = this.toObject()
  user.uid = _id
  return user
}



UserSchema.pre<User>('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  const salt = bcrypt.genSaltSync()
  const hash = await bcrypt.hashSync(this.password, salt)

  this.password = hash

  next()
})
UserSchema.methods.comparePassword = function (password:string): Promise<boolean>{
  return bcrypt.compare(password, this.password)

}
export default model<User>('user', UserSchema)