const express = require('express')

const db = require('../config/db')
const Task = require('../models/Task')

const { addTodo,getAll,getOne,update,getDone,deleteOne,addComment } = require('../controllers/task')


const router = express.Router();

router
.route('/')
.get(getAll)
.post(addTodo)

router.route('/done').get(getDone)

router.route('/:id')
.get(getOne)
.put(update)
.delete(deleteOne)
.post(addComment)



module.exports = router