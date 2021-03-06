import 'dotenv/config'
import 'module-alias/register'

import validateEnv from '@/utils/validateEnv'
import AppServer from './app'

import UserController from '@/resources/users/user.controller'
import EventController from '@/resources/events/event.controller'

validateEnv()

const app = new AppServer( 
  Number(process.env.PORT),
  [ new UserController(), new EventController() ] )

app.listen()