const Sequelize = require('sequelize')
const sequelize = require('../config/sequelize')

const Users = sequelize.define('users', {
  img: Sequelize.STRING,
  nik:  Sequelize.STRING,
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  bpjs: Sequelize.STRING,
  phone: Sequelize.STRING,
  deletedStatus: {
    type: Sequelize.TINYINT,
    defaultValue: 0,
  },
})

module.exports = Users