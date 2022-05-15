var express = require("express");
const { use } = require("./chat");
const connectionToMySql = require("./databaseConnector");
var infoRouter = express.Router();
var uploadProfileImageRouter = express.Router();
var loadProfileRouter = express.Router();
var loadProfileWithUidRouter = express.Router();
var setStatusRouter=express.Router();
var UpdateStatusRouter=express.Router();
const {firebase,admin,firebaseConfig} = require('./firebaseConnector')


module.exports={
    infoProfile:
    infoRouter.get("/info",function(req,res,next){
        res.send({responseMessage:"You have called profile service..! And its working properly!"})
    }),
    uploadProfileImageRouter:
    uploadProfileImageRouter.get("/uploadProfileImage",function(req,res){
        res.send({responseMessage:"You have called profile service and this is an post method please provide json"})
    }),
    uploadProfileImageRouter:
    uploadProfileImageRouter.post("/uploadProfileImage",function(req,res){

    if(req.body.userUid!=null)  
    {
   admin
  .auth()
  .updateUser(req.body.userUid, {
    photoUrl: req.body.photoUrl
   })
  .then(function() {

    var sql = `UPDATE users SET profileImage = '${req.body.photoUrl}' WHERE userUid = '${req.body.userUid}'`;
    connectionToMySql.query(sql, function (error, result) {
      if (error)
      {
          //Here add code which will remove the record from firebase in case there was issue in qur
        var errorCode = error.code;
        var errorMessage = error.message;
        res.status(400).send({
            responseMessage:errorMessage,
            responseCode:1
        })  
      }
      else
      {
        res.status(200).send({responseMessage:"Uploaded Profile Image"})
        console.log(result.affectedRows + " record(s) updated");
      }
    
    });
   
 }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    res.status(400).send({
        responseMessage:errorMessage,
        responseCode:1
    })  
 });

    }  
    else
    {
        res.status(400).send({
            responseMessage:"Invalid input parameters",
            responseCode:5,
            userId:user.uid
        })
    }

    }),
    loadProfileRouter:
    loadProfileRouter.get("/loadProfile",function(req,res){
        res.send({responseMessage:"You have called profile service and this is an post method please provide json"})
    }),
    loadProfileRouter:

    loadProfileRouter.post("/loadProfile",function(req,res){
    if(req.body.email!=null)  
    {
        
    admin
   .auth()
   .getUserByEmail(req.body.email)
   .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
    res.status(200).send(userRecord.toJSON())
   })
   .catch((error) => {
    console.log('Error fetching user data:', error);
    });
    }
      
    }),
    loadProfileWithUidRouter:
    loadProfileWithUidRouter.get("/loadProfileWithUid",function(req,res){
        res.send({responseMessage:"You have called profile service and this is an post method please provide json"})
    })
    ,
    loadProfileWithUidRouter:
    loadProfileWithUidRouter.post("/loadProfileWithUid",function(req,res){
    if(req.body.uid!=null)  
    {
    admin
   .auth()
   .getUser(req.body.uid)
   .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
    res.status(200).send(userRecord.toJSON())
   })
   .catch((error) => {
    console.log('Error fetching user data:', error);
    });
    }
      
    }),
    setStatusRouter:
    setStatusRouter.get("/setStatusRouter",function(req,res){
        res.send({responseMessage:"You have called profile service status and this is an post method please provide json"})
    })
    ,
    setStatusRouter:
    setStatusRouter.post("/setStatusRouter",function(req,res){
        if(req.body.userUid!=null)  
        {
        connectionToMySql.query(`SELECT * FROM users WHERE userUid = '${req.body.userUid}'`, function (err, result) {
           
            if (err)
            { 
                var errorCode = err.code;
                var errorMessage = err.message;
                res.status(400).send({
                    responseMessage:errorMessage,
                    responseCode:3
                })  
            }
            else
            {
                res.status(200).send(result)
            }
        
          });
        }
    })
    ,
    UpdateStatusRouter:
    UpdateStatusRouter.get("/UpdateStatusRouter",function(req,res){
        res.send({responseMessage:"You have called profile service set status and this is an post method please provide json"})
    })
    ,

    UpdateStatusRouter:
    UpdateStatusRouter.post("/UpdateStatusRouter",function(req,res){
     
        var sql =  `UPDATE users SET onlineStatus = '${req.body.requestContent}' WHERE userUid = '${req.body.userUid}'`;
                    connectionToMySql.query(sql, function (err, result) {
                      if (err){
                        var errorCode = err.code;
                        var errorMessage = err.message;
                        res.status(400).send({
                            responseMessage:errorMessage,
                            responseCode:0
                        })  
                      }
                      else
                      {
                        res.status(200).send({
                            responseMessage:"Updated Status",
                            responseCode:1
                        })   
                      }        
                    })
                })
  
}