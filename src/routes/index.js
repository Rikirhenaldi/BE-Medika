const router = require('express').Router()
const authRouter = require('./auth')
const userRouter = require('./user')
const hospitalRouter = require('./hospital')
const hospitalPoliRouter = require('./hospitalpoli')
const auth = require('../middleware/auth')

router.use('/auth', authRouter)
router.use('/user', auth, userRouter)
router.use('/hospital', hospitalRouter)
router.use('/hospitalpoli', hospitalPoliRouter)

module.exports = router