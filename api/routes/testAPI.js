var express = require("express");
var router = express.Router();

router.get("/",function(req,res,next){
    res.send("The APi is working properly!");
})

module.exports = router;