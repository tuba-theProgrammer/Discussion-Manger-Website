var express = require("express");
var inforAuthentication = express.Router();
var loginRouter = express.Router();

const connectionToMySql = require("./databaseConnector");
const {firebase,admin,firebaseConfig} = require('./firebaseConnector')

module.exports={
    inforAuthentication:
    inforAuthentication.get("/info",function(req,res,next){
        res.send({responseMessage:"You have called authentication service..! And its working properly!"})
    })
    ,
    loginRouter:
    loginRouter.get("/login",function(req,res){
        res.send({responseMessage:"This is an post funtion, please porovide the  jason object"})
      
    })
    ,
    loginRouter:

    loginRouter.post("/login", function(req,res)
    {
    if(req.body.email!=null && req.body.password!=null)  
    {
        try{
        firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
        .then((userCredential) => {
         // Signed in
        var user = userCredential.user;
        if(user.emailVerified)
        {
            res.status(200).send({
                responseMessage:"Login Successfull",
                responseCode:1,
                userId:user.uid,
                userName:user.displayName
            })
        }
        else
        {
            res.status(200).send({
                responseMessage:"Please verify email",
                responseCode:2,
                userId:user.uid
            })
        }

        }) .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    res.status(400).send({
                        responseMessage:errorMessage,
                        responseCode:3
                    })  
        });
        }
        catch(t)
        {
            es.status(400).send({
                responseMessage:t.message,
                responseCode:4,
                userId:user.uid
            })  
        }
    }  
    else
    {
        res.status(400).send({
            responseMessage:"Invalid input parameters",
            responseCode:5,
            userId:user.uid
        })
    }

    })
    
}