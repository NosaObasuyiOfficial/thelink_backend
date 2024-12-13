import Joi from 'joi'

export const subscribeUser = Joi.object({
    email: Joi.string().email().required().trim()
    .messages({
        'any.required': 'Email is required'
    })
})