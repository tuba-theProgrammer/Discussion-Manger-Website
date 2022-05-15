var express = require("express");
const connectionToMySql = require("./databaseConnector");
const {firebase,admin,firebaseConfig} = require('./firebaseConnector')
var infoRouter = express.Router();
var createAccountWithEmailRouter = express.Router()
var restMyPasswordWithEmailLinkRouter = express.Router()
var getTheFireBaseConfugrationRotuer = express.Router()
var deleteAccountRouter=express.Router()

module.exports = {
    
    infoAccounts: 
    infoRouter.get("/info",function(req,res,next){
        res.send({responseMessage:"You have called accounts service..! And its working properly!"})
    })
    ,

    createAccountWithEmailRouter:
    createAccountWithEmailRouter.get("/createAccountWithEmail",function(req,res,next){
        res.send({resposeMessage:"This is an post method please provice the jason object in body."})
    })
    ,
    createAccountWithEmailRouter:
    createAccountWithEmailRouter.post("/createAccountWithEmail",function(req,res,next){
    
    if(req.body.email!=null && req.body.password!=null  && connectionToMySql)    
    {
        let defaultProfile = "https://firebasestorage.googleapis.com/v0/b/discussion-manager.appspot.com/o/profileDeafultImages%2Fdefault_image.png?alt=media&token=432b7002-1168-4678-8339-eca37d06d25a"
        admin
        .auth()
        .createUser({
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          password: req.body.password,
          emailVerified: false,
          displayName: req.body.displayName,
          address:req.body.address,
          onlineStatus:req.body.onlineStatus,
          photoUrl:defaultProfile,
          disabled: false,
        })

        .then((userRecord) => {
          // See the UserRecord reference doc for the contents of userRecord.
          firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
          .then((userCredential) => {
           // Signed in
          var user = userCredential.user;
          var userL = firebase.auth().currentUser;
            userL.sendEmailVerification().then(function() {
               // Email sent.

               //Here we will create account in mysql local datbase aswell.

               var sql = `INSERT INTO users (userUid,userName,userEmail,userMobileNumber,profileImage,statusStatement,onlineStatus) VALUES ('${user.uid}', '${req.body.displayName}','${req.body.email}','${req.body.phoneNumber}','${defaultProfile}','Hello i am a new user','Online')`;
               connectionToMySql.query(sql, function (error, result) {
                    if (error) 
                    {
                        admin
                        .auth()
                        .deleteUser(user.uid)
                        .then(() => {
                            console.log('Successfully deleted user');
                        })
                        .catch((error) => {
                            console.log('Error deleting user:', error);
                        });
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        res.status(400).send({
                            responseMessage:errorMessage,
                            responseCode:6
                        })  
                    }
                    else
                    {
                        console.log("Craeted new user")
                        res.status(200).send({
                            responseMessage:"Verification email has been sent",
                            responseCode:1,
                            userId:user.uid

                            
                        })

                    }
                    
                    
                    });

                 
            }).catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                res.status(400).send({
                    responseMessage:errorMessage,
                    responseCode:2
                })  
            }); 
          }) .catch((error) => {
                      var errorCode = error.code;
                      var errorMessage = error.message;
                      res.status(400).send({
                        responseMessage:errorMessage,
                        responseCode:3
                    })  
          });
          console.log('Successfully created new user:', userRecord.email);
        })
        .catch((error) => {
          console.log('Error creating new user:', error);
          res.status(400).send({
            responseMessage:error,
            responseCode:4
        })
        });
    }
    else
    {
        res.status(400).send({
            responseMessage:"Please provide valid input",
            responseCode:5
        })
    }   

    })
    ,
    restMyPasswordWithEmailLinkRouter:
    restMyPasswordWithEmailLinkRouter.get("/restMyPasswordWithEmailLink",function(req,res){
        res.send({responseMessage:"This is an post method of accounts service, please provide the body in json"})
    })
    ,
    restMyPasswordWithEmailLinkRouter:
    restMyPasswordWithEmailLinkRouter.post("/restMyPasswordWithEmailLink",function(req,res){
    if(req.body.email!=null)
    {
        var auth = firebase.auth();
        auth.sendPasswordResetEmail(req.body.email).then(function() 
        {
            res.status(200).send({
                responseMessage:"Reset password email is sent",
                responseCode:1
            })
        }).catch(function(error) 
        {
            var errorCode = error.code;
            var errorMessage = error.message;
            res.status(404).send({
                responseMessage:errorMessage,
                responseCode:2
               
            })
        });
    }
    else
    {
        res.status(406).send({
            responseMessage:"Please provide valid email",
            responseCode:3
        })
    }

    })
    ,
    getTheFireBaseConfugrationRotuer:
    getTheFireBaseConfugrationRotuer.get("/getTheFireBaseConfugration",function(req,res){
    res.send({
                apiKey: firebaseConfig.apiKey,
               authDomain:firebaseConfig.authDomain,
               databaseURL: firebaseConfig.databaseURL,
                projectId: firebaseConfig.projectId,
               storageBucket: firebaseConfig.storageBucket,
               messagingSenderId: firebaseConfig.messagingSenderId,
              appId: firebaseConfig.appId
        })
    }),

    deleteAccountRouter: 
    deleteAccountRouter.get("/deleteAccountRouter",function(req,res){
        res.send({responseMessage:"This is a delete account method of accounts service, please provide the body in json"})
    })
    ,
    deleteAccountRouter:
    deleteAccountRouter.post("/deleteAccountRouter",function(req,res){
        var sql =  `DELETE FROM users WHERE userUid = '${req.body.userUid}'`;
        connectionToMySql.query(sql, function (err, result) {
          if (err){
            var errorCode = err.code;
            var errorMessage = err.message;
            res.status(400).send({
                responseMessage:errorMessage,
                responseCode:4
            })  
          }  
          else
          {
            admin
             .auth()
             .deleteUser(req.body.userUid)
             .then(() => {
                    console.log('Successfully deleted user');
                    console.log("account deleted"); 
                res.status(200).send({
                responseMessage:"deleted",
                responseCode:7
                })

             })
             .catch((error) => {
             console.log('Error deleting user:', error);
             res.status(400).send({
                responseMessage:"Error deleting user:"+error,
                responseCode:8
                })
             });  
              
          }
          
        });

       
    }),
    

   
};
