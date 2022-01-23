const Sequelize = require('sequelize')
const sequelize = require('../config/sequelize')
const HospitalModel= require('./hospital')

const HospitalPolies = sequelize.define('hospitalPolies', {
  poliName: Sequelize.STRING,
  hospitalId: Sequelize.INTEGER,
  deletedStatus: {
    type: Sequelize.TINYINT,
    defaultValue: 0,
  },
})

HospitalPolies.belongsTo(HospitalModel, {foreignKey: 'hospitalId', sourceKey: 'id', as: 'detailHospital'})

module.exports = HospitalPolies