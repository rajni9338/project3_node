var express = require('express');
var router = express.Router();
const mysql = require('mysql');
var crypto = require('crypto');


router.get('/', function(req, res, next) {
    res.render('register');
  });

var getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}

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
    console.log('Database Connected!');
    //Create database table users
  //var sql = "CREATE TABLE users ( userId INT AUTO_INCREMENT PRIMARY KEY,  firstname VARCHAR(255), lastname VARCHAR(255), email VARCHAR(32), password VARCHAR(32), confirmPassword VARCHAR(32) )";
  //connection.query(sql, function (err, result) {
 //if (err) throw err;
 // console.log("Table created");
  });



 // Register new user into users database
 var { firstname, lastname, email, password, confirmPassword } = req.body;
 var hashedPassword = getHashedPassword(password);
var sql = `INSERT INTO users  SET ?`;
var checkEmail = req.body.email;


// Check if the password and confirm password fields match
if (password === confirmPassword) {
  console.log("password match");
  
  connection.query("SELECT COUNT(*) AS cnt FROM users WHERE email = ? " , checkEmail , function(err , data){
    console.log('checking email')
    if(data[0].cnt > 0){  
        // Already exist 
    res.render('register', {
    message: 'User already registered.',
    messageClass: 'alert-danger'
    }) 
    } else{
      console.log("Email is unique");
    connection.query(sql, { firstname, lastname, email, password : hashedPassword}, function (err, data) {
      if (err) throw err;
           console.log("record inserted");

   
       });
    res.render('users',{
      message: 'Registeration complete . Please login to continue', 
      messageClass: 'alert-success'
    })
    }
  });
} else {
  console.log("password should match");
     
  res.render('register', { 
    message: 'Password does not match.', 
    messageClass: 'alert-danger'
  });
}

//const {firstname, lastname, email, password, confirmPassword} = req.body;

});



 //});



module.exports = router;