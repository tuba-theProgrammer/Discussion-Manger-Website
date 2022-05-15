var express = require("express");
const connectionToMySql = require("./databaseConnector");
var postRouterInfo = express.Router();
var addPostRouter = express.Router();
var addCommentRouter = express.Router();
var loadPostsRouter = express.Router();
var loadCommentsRouter = express.Router();




// http:localhost:8000/postsServices/addPost



module.exports=
{
    postRouterInfo:
    postRouterInfo.get("/",function(req,res,next){
        res.send("You have called posts service..! And its working properly!")
    }),
    addPostRouter:
    addPostRouter.get("/addPost",function(req,res){
        res.send("You are trying to get the service for adding new post to database....")
    }),
    addPostRouter:
    addPostRouter.post("/addPost",function(req,res){
        connectionToMySql.query(`SELECT * from users where userUid='${req.body.authotUserUid}'` , function (err, result) {
            if (err)
            { 
                var errorCode = err.code;
                var errorMessage = err.message;
                res.status(400).send({
                    responseMessage:errorMessage,
                    responseCode:5
                })  
            }
            else
            {  
                console.log("Name"+result[0].userName)
                var sql = `INSERT INTO posts (postTitle,postDesc,postType,postContent,authotUserUid,postUploadTime,postUploadDate,authorProfile,authorName) VALUES 
                ('${req.body.postTitle}', '${req.body.postDesc}','${req.body.postType}','${req.body.postContent}','${req.body.authotUserUid}','${req.body.postUploadTime}',
                '${req.body.postUploadDate}','${result[0].profileImage}','${result[0].userName}')`;
                connectionToMySql.query(sql, function (error, result) {
                if (error)
                {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    res.status(404).send({
                      responseMessage:errorMessage,
                      responseCode:6  
                    })
                }
                else{
                    res.status(200).send({
                        responseMessage:"Uploaded the post",
                        responseCode:7
                    });
                }
               
                });
        
            }
        
    })

       
        
    }),
    addCommentRouter:
    addCommentRouter.get("/addComment",function(req,res){
        res.send("Add new commnet")
    }),
    addCommentRouter:
    addCommentRouter.post("/addComment",function(req,res){

        var sql = `INSERT INTO commnets (postId,commentAuthorName,commnetContent,commentDate,commentTime) VALUES 
        ('${req.body.postId}', '${req.body.commentAuthorName}','${req.body.commnetContent}','${req.body.commentDate}','${req.body.commentTime}')`;
        connectionToMySql.query(sql, function (error, result) {
        if (error)
        {
            var errorCode = error.code;
            var errorMessage = error.message;
            res.status(404).send({
              responseMessage:errorMessage,
              responseCode:1  
            })
        }
        else{
            res.status(200).send({
                responseMessage:"Add the comment",
                responseCode:2
            });
        }
       
        });

        
    })
    ,
    loadCommentsRouter:
    loadCommentsRouter.get("/loadComments",function(req,res){
        res.send("load all posts... get method0")
    }),
    loadCommentsRouter:
    loadCommentsRouter.post("/loadComments",function(req,res){

        connectionToMySql.query(`SELECT * from commnets where postId=${req.body.postId} ORDER BY commentId DESC LIMIT ${req.body.numberOfComments} OFFSET ${req.body.offSetOfComments}`, function (err, result) {
            if (err)
            { 
                var errorCode = err.code;
                var errorMessage = err.message;
                res.status(400).send({
                    responseMessage:errorMessage,
                    responseCode:1
                })  
            }
            else
            {
                res.status(200).send(result)
            }
        
    })
        })
    ,
    loadPostsRouter:
    loadPostsRouter.get("/loadPosts",function(req,res){
        res.send("load all posts... get method0")
    }),
    loadPostsRouter:
    loadPostsRouter.post("/loadPosts",function(req,res){

        connectionToMySql.query(`SELECT * from posts ORDER BY postId DESC LIMIT ${req.body.numberOfPosts} OFFSET ${req.body.offSetOfPosts}`, function (err, result) {
            if (err)
            { 
                var errorCode = err.code;
                var errorMessage = err.message;
                res.status(400).send({
                    responseMessage:errorMessage,
                    responseCode:1
                })  
            }
            else
            {
                res.status(200).send(result)
            }
        
    })   
    })
    
}
