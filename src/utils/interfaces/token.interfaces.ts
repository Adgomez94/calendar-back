import { Schema } from 'mongoose'

interface Token extends Object {
  uid: Schema.Types.ObjectId,
  expiresIn:number,
  email:string,
  name: string
}
export default Token