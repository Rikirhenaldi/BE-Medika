const UserModels = require('../models/user')
const response = require('../helpers/response')
const {Op} = require('sequelize')
const {APP_UPLOADS_ROUTE, APP_URL} = process.env

exports.updateUser = async (req, res) => {
  try{
    const user = await UserModels.findByPk(req.authUser.id)
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
        }
        return response(res, 200, 'Data user berhasil di perbarui', finaldata)
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
        }
        return response(res, 200, 'Data user berhasil di perbarui', finaldata)
      }
  }catch(err){
    return response(res, 400, 'terjadi internal errors', err)
  }
}

exports.getDetailUser = async (req, res) => {
  try{
    const profile = await UserModels.findOne({
      where :{
        id : req.authUser.id,
        deletedStatus : 0
      }
    })
    if(profile){
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
    return response(res, 200, 'profile lengkap anda', profileData)
    }else{
      return response(res, 404, 'user tidak ditemukan')
    }
  }catch(err){
    return response(res, 400, 'internal server error')
  }
}

exports.DeleteUser = async (req, res, err) => {
  try{
    const profile = await UserModels.findByPk(req.authUser.id)
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
    return response(res, 200, "akun anda berhasil dihapus", profileData)
  }catch(err){
    return response(res, 400, 'internal server error', err)
  }
}

exports.RestoreUser = async (req, res) => {
  try{
    const profile = await UserModels.findOne({
      where : {
        [Op.and]: [
          { name : {
            [Op.substring] : req.query.name
          }},
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



