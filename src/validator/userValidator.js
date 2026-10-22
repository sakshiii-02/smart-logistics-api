const Joi = require("joi");

const userCreation = Joi.object({
    username: Joi.string().trim().min(1).max(50).required(),
    email: Joi.string().email().trim().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid("admin", "user").required()
})

const userLogin = Joi.object({
    email: Joi.string().email().trim().required(),
    password: Joi.string().min(6).required()
})

module.exports = {
    userCreation,
    userLogin
}