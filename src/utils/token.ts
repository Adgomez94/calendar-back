import jwt from 'jsonwebtoken'
import Token from './interfaces/token.interfaces'

export const generateToken = ( uid: string, email: string) => {
  return jwt.sign({uid, email}, process.env.JWT as jwt.Secret, {
    expiresIn: '2h'
  })
}

export const verifyToken = async(token:string):Promise<jwt.VerifyErrors | Token> =>{
  return new Promise((resolve,reject)=>{
    jwt.verify(token,process.env.JWT as jwt.Secret,(err,payload)=>{
      if(err) return reject(err)

      resolve(payload as Token)
    })
  })
}
