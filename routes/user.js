const express = require('express')

const db = require('../config/db')
const Task = require('../models/Task')

const { getAll,getOne,excel } = require('../controllers/user')


const router = express.Router();

const { protect,authorize } = require('../middlewares/auth')

router
.route('/')
.get(protect,authorize('admin'),getAll)

router.route('/excel')
.get(protect,authorize('admin'),excel)

router.route('/:id')
.get(protect,getOne)




module.exports = router