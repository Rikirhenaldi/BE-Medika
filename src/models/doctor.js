const Sequelize = require('sequelize')
const sequelize = require('../config/sequelize')
const HospitalPoliesModel = require('./hospitalPolies')

const Doctors = sequelize.define('doctors', {
  img: Sequelize.STRING,
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  Specialist: Sequelize.STRING,
  hospitalPoliesId: Sequelize.INTEGER,
  phone: Sequelize.STRING,
  Schedule: Sequelize.STRING,
  deletedStatus: {
    type: Sequelize.TINYINT,
    defaultValue: 0,
  },
})

Doctors.belongsTo(HospitalPoliesModel, {foreignKey: 'hospitalPoliesId', sourceKey: 'id', as: 'detailPoly'})

module.exports = Doctors