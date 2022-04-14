import { cleanEnv, port, str } from 'envalid'

const validateEnv = () =>{
  // primer parametro el archivo .env
  cleanEnv( process.env, {
    NODE_ENV: str({
      // que debe tenre algunos de estas palabras
      choices:['development','production']
    }),
    PORT: port({
      default:5000
    }),
    JWT:str()
  })
}

export default validateEnv