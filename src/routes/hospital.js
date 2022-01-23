const hospital = require('express').Router()
const hospitalControlllers = require('../controllers/hospital')
const {uploadFilterImg}= require('../middleware/upload')

hospital.post('/create', uploadFilterImg, hospitalControlllers.createHospitalData)
hospital.get('/detail-hospital/:id', hospitalControlllers.getDetailHospital)
hospital.put('/edit-hospital/:id', uploadFilterImg, hospitalControlllers.editHospitalData)
hospital.patch('/delete-hospital/:id', hospitalControlllers.DeleteHospital)
hospital.patch('/restore-hospital/', hospitalControlllers.RestoreHospital)

module.exports = hospital