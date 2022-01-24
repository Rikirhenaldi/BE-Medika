const UserModels = require('../models/user')
const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");
const {Op} = require('sequelize')
const response = require('../helpers/response')


exports.registerUsers = async (req, res) => {
  try{
    const errors = validationResult(req);
    const data = req.body;
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array()[0].msg });
    }else{
        const findUser = await UserModels.findAll({
          where : {
            email: {
              [Op.substring] : data.email
            },
            deletedStatus: 0,
          }
        })
        if(findUser.length >= 1){
          return response(res, 402, 'Email ini Sudah Digunakan', null)
        }else{
          data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());
        const user = await UserModels.create(data)
        const finaldata = {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          img: user.img,
        }
        return response(res, 200, 'Registrasi Akun Berhasil', finaldata)
        }
      }
  }catch(err){
    return response(res, 400, 'registrasi Gagal', err)
  }
};


exports.login= async (req, res) => {
  try{
    const {email, password} = req.body
    const result = await UserModels.findAll({
      where: {
        email: {
          [Op.eq]: email
        },
        deletedStatus : 0
      }
    })
    if(result.length >= 1){
      const user = result[0]
      const compare = await bcrypt.compare(password, user.password)
      if(compare){
        const token = jwt.sign({id: user.id, email: user.email}, process.env.APP_KEY)
        return res.status(200).json({
          success: true,
          message: 'Login Success',
          token: token
        })
      }else{
        return response(res, 400, 'Email atau Password salah')
      }
    }else{
      return response(res, 404, 'Email belum terdaftar')
    }
  }catch(err){
    console.log(err);
    return response(res, 400, 'an errors occured', err)
  }
}


exports.loginByMedicalRecordNum= async (req, res) => {
  try{
    const {medicalRecordNum} = req.body
    const result = await UserModels.findAll({
      where: {
        medicalRecordNum: {
          [Op.eq]: medicalRecordNum
        },
        deletedStatus : 0
      }
    })
    if(result){
        const user = result[0]
        const token = jwt.sign({id: user.id, medicalRecordNum: user.medicalRecordNum}, process.env.APP_KEY)
        return res.status(200).json({
          success: true,
          message: 'Login Success',
          token: token
        })
    }else{
      return response(res, 404, 'Nomer rekam medis salah')
    }
  }catch(err){
    console.log(err);
    return response(res, 400, 'an errors occured', err)
  }
}
