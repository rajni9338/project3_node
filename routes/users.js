var express = require('express');
var router = express.Router();
const mysql = require('mysql');
var crypto = require('crypto');
const authTokens = {};
const generateAuthToken = () => {
  return crypto.randomBytes(30).toString('hex');
}

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password123',
  database: "mydb"
});

var getHashedPassword = (password) => {
  const sha256 = crypto.createHash('sha256');
  const hash = sha256.update(password).digest('base64');
  return hash;
}

router.get('/', function(req, res, next) {
  res.render('users');
});

//const authTokens = {};
console.log("starting post statement");
router.post('/', (req, res) => {
  console.log("executed post");
    var { email, password } = req.body;
    var hashedPassword = getHashedPassword(password);
    console.log("If statement starts here");

    if(email && password){

      connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, hashedPassword], (err, data) => {
      if(err) throw err;
      console.log("error login")
      
      if(data.length > 0){ 
        req.session.email = email;
       console.log(email + 'logged in');
       res.redirect('/');
      }else{
        res.render('users', {
          message: 'Incorrect email or paswword.',
          messageClass: 'alert-danger',
          });
      }
    })
    } 
  })
  
module.exports = router;
