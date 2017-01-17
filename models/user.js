'use strict'
const bcrypt = require('bcrypt')
module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    bmi: DataTypes.DECIMAL
  }, {
    feezeTable: true,
    hooks: {
      beforeCreate: function (user) {
        user.password = generateHash(user.password)
      }
    },
    instanceMethods: {
      generateHash: function (password) {
        return bcrypt.hashSync(password, 10)
      },
      validatePassword: function (password, user) {
        return bcrypt.compareSync(password, user.password)
      }
    }
  })
  return User
}
