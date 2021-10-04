const express = require('express')

const db = require('../config/db')


const { update,deleteOne } = require('../controllers/comment')


const router = express.Router();

// router
// .route('/:id')
// // .get(getAll)
// .post(addComment)

// router.route('/done').get(getDone)

router.route('/:id')
// .get(getOne)
.put(update)
.delete(deleteOne)



module.exports = router