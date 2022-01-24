const auth = require('express').Router()
const authControlllers = require('../controllers/auth')
const {checkSchema} = require("express-validator");

const validator = require('../helpers/validationRegister')

auth.post('/register', checkSchema(validator), authControlllers.registerUsers)
auth.post('/login', authControlllers.login)
auth.post('/login-by-medical-number', authControlllers.loginByMedicalRecordNum)

module.exports = auth