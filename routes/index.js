var express = require('express');
var router = express.Router();
//const {connection} = require('../app');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password123',
  database: "mydb"
});

// Get the data from table
router.get('/', function(req, res, next) {
  var sql='SELECT users.firstname,users.lastname,users.email,schedules.day_of_week, schedules.start_time, schedules.end_time FROM schedules LEFT JOIN users ON schedules.username=users.email ORDER BY users.firstname';
  connection.query(sql, function (err, data) {
  if (err) throw err;
  res.render('index', { title: 'Schedule List', data:data});
   
});
});


module.exports = router;
