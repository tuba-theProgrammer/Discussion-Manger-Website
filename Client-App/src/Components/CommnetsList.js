import React,{useState,useEffect} from "react";
import { Router,Link } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Modal,Button,Form} from 'react-bootstrap'
import { propTypes } from "react-bootstrap/esm/Image";
import connectionUrl from './ConnectionUrl'
import styles from './mystyle.module.css'; 

function CommentsList(props) {
    const [show, setShow] = useState(false);
    const [listOfCommnets,setListOfCommnets] = useState()
    const [dataOfComments,setDataOfComments] = useState()
    const [message,setMessage] = useState()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function loadCommentsIntoList()
    {
      try{
        setListOfCommnets(
          dataOfComments.map((comment,index)=>{
            return(
              <div>
                  <h4>{comment.commentAuthorName}</h4>
                  <p>{comment.commentDate}{"@"}{comment.commentTime}</p>
                  <h6>{comment.commnetContent}</h6>
              </div>
            )
          })
        )
      }catch(e){}
    }

    useEffect(loadCommentsIntoList,[dataOfComments])

    function loadCommentsFromServer(postId)
    {
      let data ={
        postId:postId,
        numberOfComments:"10",
        offSetOfComments:"0"    
    }

    fetch(`${connectionUrl}/postsServices/loadComments`,
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
      try{
        let temp =[]
          data.forEach(element => {
            temp.push(
              {
                commentAuthorName:element.commentAuthorName,
                commnetContent:element.commnetContent,
                commentDate:element.commentDate,
                commentTime:element.commentTime
              }
            )
          });

          setDataOfComments(temp)
      }
      catch(e)
      {
        console.log(e)
      }
    })

    }

    useEffect(()=>{
      loadCommentsFromServer(props.postId)
      setInterval(()=>{
        loadCommentsFromServer(props.postId)
      },1000)
    },[])

    function addCoomentIntoList(messageToSend)
    {
      let v = dataOfComments
      var today = new Date(),
      date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      var today = new Date(),
      time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
      v.push({
        //tHIS WILL BE TAKE FROM LOACAL STROAGE...
        commentAuthorName:localStorage.getItem("userName"),
        commnetContent:messageToSend,
        commentDate:today,
        commentTime:time
      })
      setDataOfComments(v)

     
        //now saving message to database.
        uploadCommentToServer(messageToSend,date,time)
  
    }

    function uploadCommentToServer(messageToSend,date,time)
    {
      let data ={
        postId:props.postId,
        commentAuthorName:localStorage.getItem("userName"), 
        commnetContent:messageToSend,
        commentDate:date,
        commentTime:time
    }
      try{
        fetch(`${connectionUrl}/postsServices/addComment`,
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
          console.log(data.responseMessage)
        })
      }
      catch(e){
        
      }
    }
    
    console.log(props.postId)
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Comments
        </Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div
          style={
            {
              height:"450px",
              overflowY: "auto"
            }
          }
          >
           {listOfCommnets} 
          </div>
          </Modal.Body>
          <Modal.Footer>
                    <Form.Label><h6>Add comment</h6></Form.Label>
                    <input type="text" onChange={(e)=>{
                      setMessage(e.target.value)
                    }}/>
                    <Button variant="primary"
                    onClick={
                      ()=>{
                        addCoomentIntoList(message)
                      }
                    }
                    >Send</Button> 
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
  export default CommentsList
