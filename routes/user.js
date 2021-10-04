const express = require('express')

const db = require('../config/db')
const Task = require('../models/Task')

const { addUser,getAll,getOne,update,getDone,deleteOne } = require('../controllers/user')


const router = express.Router();

router
.route('/')
.get(getAll)
.post(addUser)

router.route('/done').get(getDone)

router.route('/:id')
.get(getOne)
.put(update)
.delete(deleteOne)



module.exports = router