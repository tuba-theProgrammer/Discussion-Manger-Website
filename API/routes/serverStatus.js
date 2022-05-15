var express = require("express");
var serverStatusRouter = express.Router();

module.exports=
{
    serverStatusRouter:
    serverStatusRouter.get("/serverStatus",function(req,res){
        res.status(200).send({
            serverResponse:"Online",
            responseCode:1
        })
    })
}
