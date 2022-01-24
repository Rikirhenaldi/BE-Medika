const doctor = require('express').Router()
const doctorControlllers = require('../controllers/doctor')
const {uploadFilterImg}= require('../middleware/upload')

doctor.post('/create', uploadFilterImg, doctorControlllers.CreateDoctorData)
doctor.get('/detail-doctor/:id', doctorControlllers.getDetailDoctorById)
doctor.get('/list-doctor', doctorControlllers.getListDoctor)
doctor.get('/list-doctor-by-poli-id/:id', doctorControlllers.getListDoctorByPoliId)
doctor.get('/find-doctor/', doctorControlllers.SearchDoctorByName)
doctor.put('/edit-doctor/:id', uploadFilterImg, doctorControlllers.editDoctorDataById)
doctor.patch('/delete-doctor/:id', doctorControlllers.deleteDoctor)
doctor.patch('/restore-doctor/', doctorControlllers.restoreDoctor)

module.exports = doctor