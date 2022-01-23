const Sequelize = require('sequelize')
const sequelize = require('../config/sequelize')

const Hospitals = sequelize.define('hospitals', {
  img: Sequelize.STRING,
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  address: Sequelize.STRING,
  contact: Sequelize.STRING,
  deletedStatus: {
    type: Sequelize.TINYINT,
    defaultValue: 0,
  },
})

module.exports = Hospitals