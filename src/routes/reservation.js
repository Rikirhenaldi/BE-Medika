const reservation = require('express').Router()
const reservationControlllers = require('../controllers/reservation')

reservation.post('/create', reservationControlllers.createReservation)
reservation.get('/list-reservation', reservationControlllers.getListReservation)
reservation.get('/detail-reservation/:id', reservationControlllers.getDetailReservation)
reservation.patch('/delete-reservation/:id', reservationControlllers.DeleteReservation)
reservation.patch('/restore-reservation/:id', reservationControlllers.RestoreReservation)

module.exports = reservation