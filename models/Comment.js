const Sequelize = require('sequelize')
const db = require('../config/db')
const Task = require('./Task')
const User = require('./User')

const Comment = db.define('comment',{
    description :{
        type : Sequelize.STRING,
        allowNull: false
    }
})

Task.hasMany(Comment, { as: "comments" });
Comment.belongsTo(Task, {
  foreignKey: "taskId",
  as: "Task",
});

module.exports = Comment;