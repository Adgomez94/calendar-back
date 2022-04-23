import Joi from 'joi'

const schemaEvent = {
  create: Joi.object().keys({
    title: Joi.string().required().min(3).trim(),
    notes: Joi.string(),
    start: Joi.date().required(),
    end: Joi.date().required()
  })
}

export default schemaEvent