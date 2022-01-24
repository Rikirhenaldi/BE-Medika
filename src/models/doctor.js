const Sequelize = require('sequelize')
const sequelize = require('../config/sequelize')
const HospitalPoliesModel = require('./hospitalPolies')

const Doctors = sequelize.define('doctors', {
  img: Sequelize.STRING,
  name: Sequelize.STRING,
  medicalDegree:Sequelize.STRING, 
  email: Sequelize.STRING,
  specialist: Sequelize.STRING,
  hospitalPoliId: Sequelize.INTEGER,
  phone: Sequelize.STRING,
  schedule: Sequelize.STRING,
  deletedStatus: {
    type: Sequelize.TINYINT,
    defaultValue: 0,
  },
})

Doctors.belongsTo(HospitalPoliesModel, {foreignKey: 'hospitalPoliId', sourceKey: 'id', as: 'detailPoli'})

module.exports = Doctors