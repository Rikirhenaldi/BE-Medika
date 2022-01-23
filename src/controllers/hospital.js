const HospitalModels = require('../models/hospital')
const {Op} = require('sequelize')
const response = require('../helpers/response')
const {APP_UPLOADS_ROUTE, APP_URL} = process.env

exports.createHospitalData = async (req, res) => {
  try{
    const findHospital = await HospitalModels.findAll({
      where : {
        name: req.body.name,
        deletedStatus: 0,
      }
    })
    if(findHospital.length >= 1){
      return response(res, 400, 'Nama rumah sakit ini sudah ada', null)
    }else{
      if(req.file){
        req.body.img = req.file ? `${APP_UPLOADS_ROUTE}/${req.file.filename}` : null
        const results = await HospitalModels.create(req.body)
        const finalData = {
          id: results.id,
          img: results.img, 
          name: results.name,
          email: results.email,
          address: results.address,
          contact: results.contact,
          deletedStatus: results.deletedStatus,
        }
        return response(res, 200, 'data rumah sakit berhasil dibuat', finalData)
      }else{
        const results = await HospitalModels.create(req.body)
        const finalData = {
          id: results.id,
          img: results.img, 
          name: results.name,
          email: results.email,
          address: results.address,
          contact: results.contact,
          deletedStatus: results.deletedStatus,
        }
        return response(res, 200, 'data rumah sakit berhasil dibuat', finalData)
      }
    }
    
  }catch(err){
    return response(res, 400, 'internal server error', err)
  }
}


exports.getDetailHospital = async (req, res) => {
  try{
    const results = await HospitalModels.findOne({
      where :{
        [Op.and]: [
          { id : req.params.id},
          { deletedStatus : 0 }
        ]
      }
    })
    if(results){
      const HospitalData = {
        id: results.id,
        img: results.img, 
        name: results.name,
        email: results.email,
        address: results.address,
        contact: results.contact,
        deletedStatus: results.deletedStatus,
    }
    return response(res, 200, 'Profile lengkap Rumah Sakit', HospitalData)
    }else{
      return response(res, 404, 'Rumah Sakit tidak ditemukan')
    }
  }catch(err){
    return response(res, 400, 'internal server error')
  }
}



exports.editHospitalData = async (req, res) => {
  const {id} = req.params
  try{
    const hospital = await HospitalModels.findOne({
      where : {
        id: {
         [Op.substring] : id
        }
      }
    })
    if(req.file){
      req.body.img = req.file ? `${APP_UPLOADS_ROUTE}/${req.file.filename}` : null
      hospital.set(req.body)
      await hospital.save()
      const finalData = {
        id: hospital.id,
        img: hospital.img, 
        name: hospital.name,
        email: hospital.email,
        address: hospital.address,
        contact: hospital.contact,
        deletedStatus: hospital.deletedStatus,
      }
      return response(res, 200, 'data rumah sakit berhasil diperbarui', finalData)
    }else{
      hospital.set(req.body)
      await hospital.save()
      const finalData = {
        id: hospital.id,
        img: hospital.img, 
        name: hospital.name,
        email: hospital.email,
        address: hospital.address,
        contact: hospital.contact,
        deletedStatus: hospital.deletedStatus,
      }
      return response(res, 200, 'data rumah sakit berhasil diperbarui', finalData)
    }
  }catch(err){
    return response(res, 400, 'internal server error', err)
  }
}


exports.DeleteHospital = async (req, res, err) => {
  try{
    const results = await HospitalModels.findOne({
      where :{
        [Op.and]: [
          { id : req.params.id},
          { deletedStatus : 0 }
        ]
      }
    })
    if(results){
      results.set(req.body)
    await results.save()
    const HospitalData = {
        id: results.id,
        img: results.img, 
        name: results.name,
        email: results.email,
        address: results.address,
        contact: results.contact,
        deletedStatus: results.deletedStatus,
      }
      return response(res, 200, `Data Rumah Sakit dengan id ${results.id} dan nama ${results.name} berhasil dihapus`, HospitalData)
    }else{
      return response(res, 404, `tidak ditemukan data Rumah Sakit dengan id ${req.params.id}`)
    }
  }catch(err){
    return response(res, 400, 'internal server error', err)
  }
}

exports.RestoreHospital = async (req, res) => {
  try{
    const results = await HospitalModels.findOne({
      where : {
        [Op.and]: [
          { name : {
            [Op.substring] : req.query.name
          }},
          { deletedStatus : 1 }
        ]
      }
    })
    if(results){
      results.set(req.body)
      await results.save()
      const HospitalData = {
        id: results.id,
        img: results.img, 
        name: results.name,
        email: results.email,
        address: results.address,
        contact: results.contact,
        deletedStatus: results.deletedStatus,
    }
      return response(res, 200, `data Rumah Sakit dengan nama ${HospitalData.name} berhasil dipulihkan kembali`, HospitalData)
    }else{
      return response(res, 404, `tidak ditemukan data Rumah Sakit terhapus dengan nama ${req.query.name}`)
    }
  }catch(err){
    return response(res, 400, 'internal server error')
  }
}
