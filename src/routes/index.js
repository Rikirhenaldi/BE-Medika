const router = require('express').Router()
const authRouter = require('./auth')
const userRouter = require('./user')
const hospitalRouter = require('./hospital')
const hospitalPoliRouter = require('./hospitalpoli')
const doctorRouter = require('./doctor')
const patientRouter = require('./patient')
const reservationRouter = require("./reservation")
const auth = require('../middleware/auth')

router.use('/auth', authRouter)
router.use('/user', auth, userRouter)
router.use('/hospital', hospitalRouter)
router.use('/hospitalpoli', hospitalPoliRouter)
router.use('/doctor', doctorRouter)
router.use('/patient', patientRouter)
router.use('/reservation', auth, reservationRouter)

module.exports = router