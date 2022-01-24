const Sequelize = require('sequelize')
const sequelize = require('../config/sequelize')

const Users = sequelize.define('users', {
  img: Sequelize.STRING,
  nik:  Sequelize.STRING,
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  address: Sequelize.STRING,
  hometown: Sequelize.STRING,
  dateOfBirth: Sequelize.DATEONLY,
  bpjs: Sequelize.STRING,
  phone: Sequelize.STRING,
  medicalRecordNum: Sequelize.STRING,
  hospitalSheet: Sequelize.STRING,
  deletedStatus: {
    type: Sequelize.TINYINT,
    defaultValue: 0,
  },
})

module.exports = Users