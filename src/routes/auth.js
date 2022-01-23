const auth = require('express').Router()
const authControlllers = require('../controllers/auth')
const {checkSchema} = require("express-validator");

const validator = require('../helpers/validationRegister')

auth.post('/register', checkSchema(validator), authControlllers.registerUsers)
auth.post('/login', authControlllers.login)

module.exports = auth