var express = require('express');
var router = express.Router();
//var {connection} = require('../app');
const mysql = require('mysql');

/* GET new page. */
router.get('/', function(req, res, next) {
  res.render('schedules', { title: 'your schedule'}); 

});

//Insert the form data into  the table
router.post('/create', function(req, res, next) {

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password123',
  database: "mydb"
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');

  //Create database mydb
  //connection.query("CREATE DATABASE mydb", function (err, result) {
   // if (err) throw err;
   console.log("Database created");
  //});

  //Create database table schedules
  //var sql = "CREATE TABLE schedules ( id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), day_of_week INT, start_time time, end_time time  )";

  //connection.query(sql, function (err, result) {
  //if (err) throw err;
   console.log("Table created");
 // });
});
     // store all the user input data

     var scheduleData = req.body;
    
   /* var username = req.body.username;
    var day_of_week = req.body.day_of_week;
    var start_time = req.body.start_time ;
    var end_time = req.body.end_time;*/
    
   var sql = `INSERT INTO schedules SET ?`;

   connection.query(sql,scheduleData,function (err, data) {
      if (err) throw err;
           console.log("record inserted");
       });
   res.redirect('/schedules');
});

//module.exports=connection;
module.exports = router;
 