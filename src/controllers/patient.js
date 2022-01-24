const UserModels = require('../models/user')
const response = require('../helpers/response')
const {Op} = require('sequelize')
const {APP_UPLOADS_ROUTE, APP_URL} = process.env

exports.createPatientData = async (req, res) => {
  try{
    const findUser = await UserModels.findAll({
      where : {
        medicalRecordNum: req.body.medicalRecordNum,
        deletedStatus: 0,
      }
    })
    if(findUser.length >= 1){
      return response(res, 400, 'No rekam Medis ini sudah ada', null)
    }else{
      if(req.file){
        req.body.img = req.file ? `${APP_UPLOADS_ROUTE}/${req.file.filename}` : null
        const user = await UserModels.create(req.body)
        const finalData = {
          id: user.id,
          img: user.img,
          nik: user.nik,
          name: user.name,
          email: user.email,
          phone: user.phone,
          bpjs: user.bpjs,
          noRekamMedis: user.medicalRecordNum,
          riwayatPenyakit: user.hospitalSheet, 
        }
        return response(res, 200, 'data User/ pasien berhasil dibuat', finalData)
      }else{
        const user = await UserModels.create(req.body)
        const finalData = {
          id: user.id,
          img: user.img,
          nik: user.nik,
          name: user.name,
          email: user.email,
          phone: user.phone,
          bpjs: user.bpjs,
          noRekamMedis: user.medicalRecordNum,
          riwayatPenyakit: user.hospitalSheet, 
        }
        return response(res, 200, 'data User/ pasien berhasil dibuat', finalData)
      }
    }
  }catch(err){
    return response(res, 400, 'internal server error', err)
  }
}


exports.updatePatient = async (req, res) => {
  try{
    const user = await UserModels.findOne({
      where : {
      id: {
       [Op.substring] : req.params.id
      },
      deletedStatus : 0
    }})
      if(req.file){
        req.body.img = req.file ? `${APP_UPLOADS_ROUTE}/${req.file.filename}` : null
        user.set(req.body)
        await user.save()
        const finaldata = {
          id: user.id,
          img: user.img,
          nik: user.nik,
          name: user.name,
          email: user.email,
          phone: user.phone,
          bpjs: user.bpjs,
          noRekamMedis: user.medicalRecordNum,
          riwayatPenyakit: user.hospitalSheet, 
        }
        return response(res, 200, 'Data patient/ user berhasil di perbarui', finaldata)
      }else{
        user.set(req.body)
        await user.save()
        console.log(req.body);
        const finaldata = {
          id: user.id,
          img: user.img,
          nik: user.nik,
          name: user.name,
          email: user.email,
          phone: user.phone,
          bpjs: user.bpjs,
          noRekamMedis: user.medicalRecordNum,
          riwayatPenyakit: user.hospitalSheet, 
        }
        return response(res, 200, 'Data patient/ user berhasil di perbarui', finaldata)
      }
  }catch(err){
    return response(res, 400, 'terjadi internal errors', err)
  }
}


exports.DeletePatient = async (req, res, err) => {
  try{
    const profile = await UserModels.findOne({
      where : {
      id: {
       [Op.substring] : req.params.id
      },
      deletedStatus : 0
    }})
    profile.set(req.body)
    await profile.save()
    const profileData = {
      id: profile.id,
      img: profile.img,
      nik: profile.nik,
      name: profile.name,
      email: profile.email,
      bpjs: profile.bpjs,
      phone: profile.phone,
      noRekamMedis: profile.medicalRecordNum,
      riwayatPenyakit: profile.hospitalSheet, 
      deletedStatus: profile.deletedStatus,
  }
    return response(res, 200, "data patient berhasil dihapus", profileData)
  }catch(err){
    return response(res, 400, 'internal server error', err)
  }
}

exports.RestorePatient = async (req, res) => {
  try{
    const profile = await UserModels.findOne({
      where : {
        [Op.and]: [
          { id: req.params.id},
          { deletedStatus : 1 }
        ]
      }
    })
    if(profile){
      profile.set(req.body)
      await profile.save()
      const profileData = {
        id: profile.id,
        img: profile.img,
        nik: profile.nik,
        name: profile.name,
        email: profile.email,
        bpjs: profile.bpjs,
        phone: profile.phone,
        deletedStatus: profile.deletedStatus,
      }
      return response(res, 200, "akun anda berhasil dipulihkan kembali", profileData)
    }else{
      return response(res, 404, `tidak ditemukan akun terhapus dengan nama ${req.query.name}`)
    }
  }catch(err){
    return response(res, 400, 'internal server error')
  }
}



