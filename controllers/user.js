// const db = require("../config/db");
const User = require('../models/User')
const Task = require('../models/Task')
const excel = require('exceljs')


// @desc      GET all users
// @route     GET /api/v1/users
// @access    Private
exports.getAll = (req,res) =>{
    User.findAll({ include: ["comments","tasks"] })
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({  
            message:
              err.message || "Some error occurred while finding the users."
          })
        })
}

// @desc      GET one user
// @route     GET /api/v1/tasks/:id
// @access    Private
exports.getOne = (req, res) => {
    const id = req.params.id;
  
    User.findByPk(id)
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => {
        res.status(500).json({
          message: "Error retrieving user with id=" + id
        });
      });
  };

// @desc      download users data
// @route     GET /api/v1/users/download
// @access    Admin
exports.excel = (req,res) => {
  User.findAll()
    .then(users => {
      let workbook = new excel.Workbook();
      let workSheet = workbook.addWorksheet("Users")

      workSheet.columns = [
        { header : 'Id' , key : 'id', width : 5},
        { header : 'username' , key : 'username', width : 10},
        { header : 'email' , key : 'email', width : 25},
        { header : 'phone' , key : 'phone', width : 15},
        { header : 'role' , key : 'role', width : 15},
      ];

      users.forEach(user => {
        workSheet.addRow(user)
      })
      const result = workbook.xlsx.writeFile('users.xlsx')
      res.status(201).json({message : "Data Sheet created"})
      }).catch(err =>{
      res.status(400).json({message: "server err"})
      })
}

