import Joi from 'joi'

const schema = {
  create: Joi.object().keys({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  }),
  login: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  })
}

export default schema

