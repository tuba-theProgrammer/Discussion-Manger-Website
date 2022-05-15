import React,{useState,useEffect} from "react";
import { Router,Link } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Row,Col} from 'react-bootstrap'
import Post from './posts'
import connectionUrl from './ConnectionUrl'
const PostsList = props => {
    const [listOfPosts,setListOfPosts] = useState(null)
    const [dataOfPosts,setDataOfPosts] = useState()

    function loadPostsIntoList(){
        try{
        setListOfPosts(
            dataOfPosts.map((post,index)=>{
                console.log("Loading"+post.postId)
                return(
                    <Post 
                        postTitle={post.postTitle} postDesc={post.postDesc} postType={post.postType} 
                        postContent={post.postContent} authotUserUid={post.authotUserUid} postUploadTime={post.postUploadTime}
                        postUploadDate={post.postUploadDate} authorProfile={post.authorProfile} authorName = {post.authorName}
                        postId={post.postId}
                    />
                )
               
            })
        )}
        catch(e)
        {

        }
    }

    function loadPostFromServer()
    {
        let data ={
            numberOfPosts:"10",
            offSetOfPosts:"0"
    }
    fetch(`${connectionUrl}/postsServices/loadPosts`,
    {
      method: 'POST',
      headers: {
              'Content-Type': 'application/json;charset=utf-8'
      },
         body: JSON.stringify(data)
    }).then(
    response => 
    {
      return response.json();
    },

    error=>
    {
      //on error
      console.log(error)
    }

    ).then(data=>{
      //get data here
      try
      {
          let tempPots=[]
            data.forEach(element => {
                tempPots.push(
                   {
                    postId:element.postId,
                    postTitle:element.postTitle,
                    postDesc:element.postDesc,
                    postType:element.postType,
                    postContent:element.postContent,
                    authotUserUid:element.authotUserUid,
                    postUploadTime:element.postUploadTime,
                    postUploadDate:element.postUploadTime,
                    authorProfile:element.authorProfile,
                    authorName:element.authorName
                   }
               )
              
            });

            setDataOfPosts(tempPots)
      }
      catch(e)
      {
          console.log(e)
      }
    })

    }

    useEffect(loadPostsIntoList,[dataOfPosts])

    //consuming API.
    useEffect(()=>{
        loadPostFromServer()
        setInterval(()=>{
            loadPostFromServer()
        },10000)

    },[])

    return(
        <div>
            {listOfPosts}
        </div>
        );
  };
  export default PostsList

