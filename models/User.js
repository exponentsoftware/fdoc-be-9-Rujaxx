const Sequelize = require('sequelize')
const db = require('../config/db')
const bcrypt = require('bcryptjs')

const User = db.define('user',{
    username :{
        type : Sequelize.STRING,
        allowNull: false,
        unique: true,
        set(value) {
            this.setDataValue('username', value.trim());
          }
    },
    email :{
        type : Sequelize.STRING,
        allowNull: false,
        unique: true,
        isEmail: true,
    },
    phone :{
        type : Sequelize.STRING,
        allowNull: false,
        // unique: true,
        isNumeric: true,
        max: 10
    },
    password :{
        type : Sequelize.STRING,
        allowNull: false,
        set(value) {
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(value,salt)
            console.log(hash)
            this.setDataValue('password', hash);
          }
    },
    role:{
        type : Sequelize.ENUM("user","admin"),
        defaultValue:"user"
    }
})

module.exports = User;