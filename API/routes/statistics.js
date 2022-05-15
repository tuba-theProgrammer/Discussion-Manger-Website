var express = require("express");
var router = express.Router();

router.get("/",function(req,res,next){
    res.send("You have called statistics service..! And its working properly!")
});
module.exports=router;