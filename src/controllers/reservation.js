const reservationModel = require('../models/reservation')
const userModel = require('../models/user')
const response = require('../helpers/response')
const {Op} = require('sequelize')
const {date} = require('../helpers/date')

exports.createReservation = async(req, res) => {
  try {
    const user = await userModel.findByPk(req.authUser.id)
    if(req.body.typeReservation === "Bpjs" || req.body.typeReservation === "BPJS" ){
      if(user.bpjs === null || user.bpjs === 'null' ){
        return response(res, 401, "Reservasi gagal karena Kamu Belum Melengkapi no Bpjs pada data diri anda", null)
      }else{
        const resrvationData = {
          userId: user.id,
          codeReservation: "CR/" + date() + "/" + user.id,
          doctorName: req.body.doctorName,
          poliName: req.body.poliName,
          typeReservation: req.body.typeReservation,
          reservationDate: req.body.reservationDate,
        }
        const reservation = reservationModel.create(resrvationData)
        return response(res, 200, "Reservasi Type BPJS berhasil dibuat", resrvationData)
      }
    }else{
      const resrvationData = {
        userId: user.id,
        codeReservation: "CR/" + date() + "/" + user.id,
        doctorName: req.body.doctorName,
        poliName: req.body.poliName,
        typeReservation: req.body.typeReservation,
        reservationDate: req.body.reservationDate,
      }
      const reservation = reservationModel.create(resrvationData)
      return response(res, 200, "Reservasi Type UMUM berhasil dibuat", resrvationData)
    }
  } catch (err) {
    return response(res, 400, "internal server errors", reservation)
  }
}

exports.getListReservation = async (req, res) => {
  try{
    const user = await userModel.findByPk(req.authUser.id)
    if(user){
      const results = await reservationModel.findAll({
        where : {
          userId: req.authUser.id,
          deletedStatus: 0,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        },   
      })
      if(results.length >= 1){
      return response(res, 200, 'List Reservasi Anda', results)
      }else{
        return response(res, 404, 'anda belum Memiliki Reservasi Rumah sakit')
      }
    }else{
      return response(res, 404, 'anda Harus Login terlebih')
    }
  }catch(err){
    return response(res, 400, 'internal server error')
  }
}


exports.getDetailReservation = async (req, res) => {
  try{
    const user = await userModel.findByPk(req.authUser.id)
    if(user){
      const results = await reservationModel.findOne({
        where : {
          userId: req.authUser.id,
          id: req.params.id,
          deletedStatus: 0,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        }, 
        include: {
          model: userModel,
          as : 'userDetail',
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"]
          },
        }  
      })
      if(results){
      return response(res, 200, 'Detail Reservasi Anda', results)
      }else{
        return response(res, 404, `Data Reservasi Anda dengan id ${req.params.id} tidak ditemukan`)
      }
    }else{
      return response(res, 401, 'anda Harus Login terlebih')
    }
  }catch(err){
    return response(res, 400, 'internal server error')
  }
}


exports.DeleteReservation = async (req, res, err) => {
  try{
    const user = await userModel.findByPk(req.authUser.id)
    if(user){
      const reservation = await reservationModel.findOne({
        where : {
        userId: req.authUser.id,
        id: req.params.id,
        deletedStatus : 0
      }})
      if(reservation){
        reservation.set(req.body)
        await reservation.save()
        const reservationData = {
          id: reservation.id,
          userId: reservation.userId,
          codeReservation: reservation.codeReservation,
          doctorName: reservation.doctorName,
          poliName: reservation.poliName,
          typeReservation: reservation.typeReservation,
          reservationDate: reservation.reservationDate, 
          deletedStatus: reservation.deletedStatus,
      }
        return response(res, 200, "Data Reservasi berhasil dihapus", reservationData)
      }else{
        return response(res, 404, `Data Reservasi anda dengan id ${req.params.id} tidak ditemukan`)
      }
    }else{
      return response(res, 401, "anda harus login terlebih dahulu")
    }
  }catch(err){
    return response(res, 400, 'internal server error', err)
  }
}

exports.RestoreReservation = async (req, res, err) => {
  try{
    const user = await userModel.findByPk(req.authUser.id)
    if(user){
      const reservation = await reservationModel.findOne({
        where : {
        userId: req.authUser.id,
        id: req.params.id,
        deletedStatus : 1
      }})
      if(reservation){
        reservation.set(req.body)
        await reservation.save()
        const reservationData = {
          id: reservation.id,
          userId: reservation.userId,
          codeReservation: reservation.codeReservation,
          doctorName: reservation.doctorName,
          poliName: reservation.poliName,
          typeReservation: reservation.typeReservation,
          reservationDate: reservation.reservationDate, 
          deletedStatus: reservation.deletedStatus,
      }
        return response(res, 200, "Data Reservasi berhasil dipulihkan", reservationData)
      }else{
        return response(res, 404, `Anda tidak Memiliki data Terhapus dengan id ${req.params.id}`)
      }
    }else{
      return response(res, 401, "anda harus login terlebih dahulu")
    }
  }catch(err){
    return response(res, 400, 'internal server error', err)
  }
}
