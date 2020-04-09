var express = require("express");
var router = express.Router();

// var DB = require('../db');


// ============================================================
var mysql = require('mysql');

var Connection = mysql.createConnection({
    host: 'jobplacement.chbtuwrsaec5.us-east-1.rds.amazonaws.com',
    // port: '3306',
    user:  'admin',
    database: 'sys',
    password: 'CS411project'

});

Connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    Connection.query('SELECT * FROM Users', function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  });

  router.get('/',function(req,res,next){
    res.send(result);
})

module.exports = router;