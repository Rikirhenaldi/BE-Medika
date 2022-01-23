const users = require('express').Router()
const userControlllers = require('../controllers/user')
const {uploadFilterImg}= require('../middleware/upload')

users.get('/profile', userControlllers.getDetailUser)
users.put('/edit-profile', uploadFilterImg, userControlllers.updateUser)
users.patch('/delete-profile', userControlllers.DeleteUser)
users.patch('/restore-profile/', userControlllers.RestoreUser)

module.exports = users