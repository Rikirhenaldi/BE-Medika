const doctorModel = require('../models/doctor')
const hostpitalPoliModel = require("../models/hospitalPolies")
const response = require('../helpers/response')
const {Op} = require('sequelize')
const {APP_UPLOADS_ROUTE, APP_URL} = process.env

exports.CreateDoctorData = async (req, res) => {
  try {
    const findDoctor = await doctorModel.findAll({
      where : {
        name: req.body.name,
        deletedStatus: 0,
      }
    })
    if(findDoctor.length >= 1){
      return response(res, 400, 'Nama dokter ini sudah ada', null)
    }else{
    if(req.file){
      req.body.img = req.file ? `${APP_UPLOADS_ROUTE}/${req.file.filename}` : null
      const results = await doctorModel.create(req.body)
      const finalData = {
        id: results.id,
        img: results.img, 
        name: results.name,
        medicalDegree: results.medicalDegree,
        specialist: results.specialist,
        hospitalPoliId: results.hospitalPoliId,
        schedule: results.schedule,
        email: results.email,
        phone: results.contact,
        deletedStatus: results.deletedStatus,
      }
      return response(res, 200, 'data Doctor berhasil dibuat', finalData)
    }else{
      const results = await doctorModel.create(req.body)
      const finalData = {
        id: results.id,
        img: results.img, 
        name: results.name,
        medicalDegree: results.medicalDegree,
        specialist: results.specialist,
        hospitalPoliId: results.hospitalPoliId,
        schedule: results.schedule,
        email: results.email,
        phone: results.contact,
        deletedStatus: results.deletedStatus,
      }
      return response(res, 200, 'data Doctor berhasil dibuat', finalData)
    }
  }
  } catch (error) {
    return response(res, 400, 'internal server error', finalData)
  }
}

exports.getListDoctor = async (req, res) => {
  try{
    const results = await doctorModel.findAll({
      where : { deletedStatus : 0 },
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    })
    if(results){
    return response(res, 200, 'List lengkap Doctor Rumah Sakit', results)
    }else{
      return response(res, 404, ' List Doctor Rumah Sakit tidak ditemukan')
    }
  }catch(err){
    return response(res, 400, 'internal server error')
  }
}


exports.getDetailDoctorById= async (req, res) => {
  try{
    const results = await doctorModel.findOne({
      where :{
        [Op.and]: [
          { id : req.params.id},
          { deletedStatus : 0 }
        ]
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      },
      include: {
				model: hostpitalPoliModel,
        as : 'detailPoli',
        attributes: {
					exclude: ["createdAt", "updatedAt"]
				},
			}
    })
    if(results){
    return response(res, 200, 'Detail lengkap Doctor Rumah Sakit', results)
    }else{
      return response(res, 404, 'Data Lengkap Doctor tidak ditemukan')
    }
  }catch(err){
    return response(res, 400, 'internal server error')
  }
}


exports.SearchDoctorByName= async (req, res) => {
  try{
    const results = await doctorModel.findAll({
      where :{
        [Op.and]: [
          { name: {
            [Op.substring] : req.query.search
           }
          },
          { deletedStatus : 0 }
        ]
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      },
      include: {
				model: hostpitalPoliModel,
        as : 'detailPoli',
        attributes: {
					exclude: ["createdAt", "updatedAt"]
				},
			}
    })
    if(results){
    return response(res, 200, `list Docter dengan Key pencarian ${req.query.search}`, results)
    }else{
      return response(res, 404, 'Doctor tidak ditemukan')
    }
  }catch(err){
    return response(res, 400, 'internal server error')
  }
}


exports.getListDoctorByPoliId= async (req, res) => {
  try{
    const results = await doctorModel.findAll({
      where :{
        [Op.and]: [
          { hospitalPoliId : req.params.id},
          { deletedStatus : 0 }
        ]
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      },
      include: {
				model: hostpitalPoliModel,
        as : 'detailPoli',
        attributes: {
					exclude: ["createdAt", "updatedAt"]
				},
			}
    })
    if(results){
    return response(res, 200, `list Dokter dengan poli id ${req.params.id}`, results)
    }else{
      return response(res, 404, 'list Dokter tidak ditemukan')
    }
  }catch(err){
    return response(res, 400, 'internal server error')
  }
}


exports.editDoctorDataById = async (req, res) => {
  try{
    const doctor = await doctorModel.findOne({
      where : {
        id: req.params.id
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      } 
    })
    doctor.set(req.body)
    await doctor.save()
    return response(res, 200, 'data dokter rumah sakit berhasil diperbarui', doctor)
  }catch(err){
    return response(res, 400, 'internal server error', err)
  }
}


exports.deleteDoctor = async (req, res, err) => {
  try{
    const results = await doctorModel.findOne({
      where :{
        [Op.and]: [
          { id : req.params.id},
          { deletedStatus : 0 }
        ]
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      } 
    })
    if(results){
      results.set(req.body)
      await results.save()
      return response(res, 200, `Data Dokter Rumah Sakit dengan id ${results.id} berhasil dihapus`, results)
    }else{
      return response(res, 404, `tidak ditemukan data Dokter Rumah Sakit dengan id ${req.params.id}`)
    }
  }catch(err){
    return response(res, 400, 'internal server error', err)
  }
}



exports.restoreDoctor = async (req, res) => {
  try{
    const results = await doctorModel.findOne({
      where : {
        [Op.and]: [
          { name : {
            [Op.substring] : req.query.name
          }},
          { deletedStatus : 1 }
        ]
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      } 
    })
    if(results){
      results.set(req.body)
      await results.save()
      return response(res, 200, `data Dokter Rumah Sakit dengan Key Nama ${req.query.name} berhasil dipulihkan kembali`, results)
    }else{
      return response(res, 404, `tidak ditemukan data Dokter Rumah Sakit terhapus dengan Key Nama ${req.query.name}`)
    }
  }catch(err){
    return response(res, 400, 'internal server error')
  }
}
