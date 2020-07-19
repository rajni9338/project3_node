var express = require('express');
var router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'password123',
    database: "mydb"
  });

  /* GET protected listing. */
router.get('/', function(req, res, next) {
    res.render('protected');
  });


module.exports = router;