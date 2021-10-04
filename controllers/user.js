// const db = require("../config/db");
const User = require('../models/User')
const Task = require('../models/Task')



// @desc      POST all tasks
// @route     POST /api/v1/tasks
// @access    Private
exports.addUser = (req, res) => {
    // Validate request
    if (!req.body.username) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a user
    const user = {
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password
    };
  
    // Save user in the database
    User.create(user)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the task."
        });
      });
  };

// @desc      GET all tasks
// @route     GET /api/v1/tasks
// @access    Private
exports.getAll = (req,res) =>{
    Task.findAll()
    .then(tasks => {
        res.status(200).json(tasks)
    })
    .catch(err => {
        res.status(500).json({
            message:
              err.message || "Some error occurred while creating the task."
          })
        })
}

// @desc      GET one tasks
// @route     GET /api/v1/tasks/:id
// @access    Private
exports.getOne = (req, res) => {
    const id = req.params.id;
  
    Task.findByPk(id)
      .then(task => {
        res.status(200).json(task);
      })
      .catch(err => {
        res.status(500).json({
          message: "Error retrieving task with id=" + id
        });
      });
  };

// @desc      PUT one tasks
// @route     PUT /api/v1/tasks/:id
// @access    Private
exports.update = (req, res) => {
    const id = req.params.id;
  
    Task.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.status(200).json({
            message: "Task was updated successfully."
          });
        } else {
          res.status(500).json({
            message: `Cannot update Task with id=${id}. Maybe Task was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          message: "Error updating Task with id=" + id
        });
      });
  };



// @desc      PUT one tasks
// @route     PUT /api/v1/tasks/:id
// @access    Private
exports.deleteOne = (req, res) => {
    const id = req.params.id;
  
    Task.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
            res.status(200).json({
            message: "Task was deleted successfully!"
          });
        } else {
            res.status(400).json({
            message: `Cannot delete Task with id=${id}. Maybe Task was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Task with id=" + id
        });
      });
  };

// @desc      Get done tasks
// @route     PUT /api/v1/tasks/done
// @access    Private 
exports.getDone = (req, res) => {
    Task.findAll({ where: { done: true } })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Tasks."
        });
      });
  }; 
