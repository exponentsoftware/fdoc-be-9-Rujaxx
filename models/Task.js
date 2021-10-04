const Sequelize = require('sequelize')
const db = require('../config/db')
const Tag = require('../models/Tag')

const Task = db.define('task',{
    title :{
        type : Sequelize.STRING,
        allowNull: false,
        set(value) {
            this.setDataValue('title', value.trim());
          }
    },
    description :{
        type : Sequelize.STRING,
        allowNull: false
    },
    category :{
        type : Sequelize.STRING
    },
    done :{
        type : Sequelize.BOOLEAN,
        defaultValue: true
    },
})

// Task.belongsToMany(Tag, {
//     through: "tag_task",
//     as: "tags",
//     foreignKey: "task_id",
//   });


module.exports = Task;