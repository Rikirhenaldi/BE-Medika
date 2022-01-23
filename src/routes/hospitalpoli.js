const hospitalPoli = require('express').Router()
const hospitalPoliControlllers = require('../controllers/hospitalpoli')

hospitalPoli.post('/create', hospitalPoliControlllers.createHospitalPoliData)
hospitalPoli.get('/list-hospital-poli', hospitalPoliControlllers.getListHospitalPoli)
hospitalPoli.get('/detail-hospital-poli/:id', hospitalPoliControlllers.getDetailHospitalPoli)
hospitalPoli.put('/edit-hospital-poli/:id', hospitalPoliControlllers.editHospitalPoliData)
hospitalPoli.patch('/delete-hospital-poli/:id', hospitalPoliControlllers.DeleteHospitalPoli)
hospitalPoli.patch('/restore-hospital-poli/', hospitalPoliControlllers.RestoreHospitalPoli)

module.exports = hospitalPoli