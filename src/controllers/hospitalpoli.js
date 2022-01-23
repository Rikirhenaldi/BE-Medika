const HospitalPoliModels = require('../models/hospitalPolies')
const HospitalModel = require('../models/hospital')
const {Op} = require('sequelize')
const response = require('../helpers/response')
const {APP_UPLOADS_ROUTE, APP_URL} = process.env

exports.createHospitalPoliData = async (req, res) => {
  try{
    const findHospitalPoli = await HospitalPoliModels.findAll({
      where : {
        poliName: req.body.poliName,
        deletedStatus: 0,
      }
    })
    if(findHospitalPoli.length >= 1){
      return response(res, 400, 'Nama Poli rumah sakit ini sudah ada', null)
    }else{
      const results = await HospitalPoliModels.create(req.body)
      const finalData = {
        id: results.id,
        poliName: results.poliName,
        hospitalId: results.hospitalId,
        deletedStatus: results.deletedStatus,
      }
      return response(res, 200, 'data Poli Rumah Sakit berhasil dibuat', finalData)
    }
  }catch(err){
    return response(res, 400, 'internal server error', err)
  }
}


exports.getListHospitalPoli = async (req, res) => {
  try{
    const results = await HospitalPoliModels.findAll({
      where : { deletedStatus : 0 },
      attributes: ['id','poliName', 'hospitalId', "deletedStatus" ]
    })
    if(results){
    return response(res, 200, 'List lengkap Poli Rumah Sakit', results)
    }else{
      return response(res, 404, ' List Poli Rumah Sakit tidak ditemukan')
    }
  }catch(err){
    return response(res, 400, 'internal server error')
  }
}


exports.getDetailHospitalPoli = async (req, res) => {
  try{
    const results = await HospitalPoliModels.findOne({
      where :{
        [Op.and]: [
          { id : req.params.id},
          { deletedStatus : 0 }
        ]
      },
      attributes: ['id','poliName', 'hospitalId', "deletedStatus" ],
      include: {
				model: HospitalModel,
        as : 'detailHospital',
        attributes: {
					exclude: ["createdAt", "updatedAt"]
				}
			}
    })
    if(results){
    return response(res, 200, 'Detail lengkap Poli Rumah Sakit', results)
    }else{
      return response(res, 404, 'Poli Rumah Sakit tidak ditemukan')
    }
  }catch(err){
    return response(res, 400, 'internal server error')
  }
}


exports.editHospitalPoliData = async (req, res) => {
  const {id} = req.params
  try{
    const hospitalPoli = await HospitalPoliModels.findOne({
      where : {
        id: {
         [Op.substring] : id
        }
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      } 
    })
    hospitalPoli.set(req.body)
    await hospitalPoli.save()
    return response(res, 200, 'data Poli rumah sakit berhasil diperbarui', hospitalPoli)
  }catch(err){
    return response(res, 400, 'internal server error', err)
  }
}


exports.DeleteHospitalPoli = async (req, res, err) => {
  try{
    const results = await HospitalPoliModels.findOne({
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
      return response(res, 200, `Data Poli Rumah Sakit dengan id ${results.id} dan nama ${results.poliName} berhasil dihapus`, results)
    }else{
      return response(res, 404, `tidak ditemukan data Poli Rumah Sakit dengan id ${req.params.id}`)
    }
  }catch(err){
    return response(res, 400, 'internal server error', err)
  }
}



exports.RestoreHospitalPoli = async (req, res) => {
  try{
    const results = await HospitalPoliModels.findOne({
      where : {
        [Op.and]: [
          { poliName : {
            [Op.substring] : req.query.poliName
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
      return response(res, 200, `data Rumah Sakit dengan nama ${results.poliName} berhasil dipulihkan kembali`, results)
    }else{
      return response(res, 404, `tidak ditemukan data Rumah Sakit terhapus dengan nama ${req.query.name}`)
    }
  }catch(err){
    return response(res, 400, 'internal server error')
  }
}
