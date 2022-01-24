const patient = require('express').Router()
const patientControlllers = require('../controllers/patient')
const {uploadFilterImg}= require('../middleware/upload')

patient.post('/create', uploadFilterImg , patientControlllers.createPatientData)
patient.put('/edit-patient/:id', uploadFilterImg, patientControlllers.updatePatient)
patient.patch('/delete-patient/:id', patientControlllers.DeletePatient)
patient.patch('/restore-patient/:id', patientControlllers.RestorePatient)

module.exports = patient