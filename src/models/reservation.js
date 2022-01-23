const Sequelize = require('sequelize')
const sequelize = require('../config/sequelize')
const UserModel = require('./user')

const Reservations = sequelize.define('reservations', {
  userId: Sequelize.INTEGER,
  codeReservation: Sequelize.STRING,
  doctorName: Sequelize.STRING,
  polyName: Sequelize.STRING,
  typeReservation: {
    type: Sequelize.STRING,
    defaultValue: "Umum",
  },
  reservationDate: Sequelize.DATEONLY,
  deletedStatus: {
    type: Sequelize.TINYINT,
    defaultValue: 0,
  },
})

Reservations.belongsTo(UserModel, {foreignKey: 'userId', sourceKey: 'id', as: 'userDetail'})

module.exports = Reservations