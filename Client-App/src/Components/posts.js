import React, { useEffect, useState } from "react";
import { Router,Link } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Row,Col,Button,Image} from 'react-bootstrap'
import ReadMoreReact from 'read-more-react'
import CommentsList from './CommnetsList';
import PostCommnet from './PostCommnet'
const Post = props => 
{
    const [postContent,setPostContent]=useState()
    const [isOpenCommentArea,setIsOpenCommentArea]=useState(false)
    console.log("Post id "+props.postId)
    
    useEffect(()=>{
        if(props.postType==="Image")
        {
            setPostContent(
                <div>
                <Image
                src={props.postContent}
                style={
                    {
                        height:"270px",
                        width:"630px"
                    }
                }
                />
                </div>
            )
        }
        else
        {
            
        }
    },[])
    return (
        <div
            style={
                {
                    backgroundColor:"white",
                    height:"540px",
                    
                    marginTop:"10px",
                    marginLeft:"100px"
                }
            }
        >
                    {/*  Heading of post.*/}
             <div
                style={
                    {
                        height:"70px",
                        
                    }
                }
             >
                 <Row>
                     <Col md={1}>
                             {/* Profile image */}
                             <Image src={props.authorProfile}  style={{
                                   
                                   borderWidth: 3,
                                   borderColor: "red",
                                   borderRadius: "60%",
                                   height:"50px",
                                   width:"50px",
                                   marginTop:"10px",
                                   marginLeft:"5px"
                                }} />
                     </Col>

                     <Col md={8}
                        style={
                            {
                                textAlign:"left"
                            }
                        }
                     >
                            {/* Name and time date */}
                            
                            <h3
                            style={
                                {
                                    fontSize:"20px",
                                    marginTop:"10px",
                                    marginLeft:"10px"
                                }
                            }
                            >
                                {props.authorName}
                            </h3>

                            <div
                            style={
                                {
                                    fontSize:"12px",
                                    marginTop:"10px",
                                    marginLeft:"10px"
                                }
                            }
                            >
                                {props.postUploadTime}{props.postUploadDate}
                            </div>
                     </Col>
                 </Row>
             </div> 


                    {/*  Body of post.*/}
             <div
                style={
                    {
                      
                        height:"320px"
                    }
                
                }

             >
                {/* Tittle of post.. */}
                <div
                style={
                    {
                        textAlign:"left",
                        height:"50px",
                        fontSize:"25px",
                        marginLeft:"10px",
                        
                    }
                }
                >
                    {props.postTitle}
                </div>
               
                {/* post desc */}
                <div
                style={
                    {
                        textAlign:"left",
                        overflowY: "auto",
                        height:"70px",
                        width:"850px",
                        paddingLeft:"10px",
                       
                    }
                }
                >
                    <ReadMoreReact text={props.postDesc}
                     min={80}
                     ideal={100}
                     max={200}
                     readMoreText={<b>Read more</b>}
                     
                     />

                  </div>

   
                {/* Post image/video */}
                <div
                 style={
                    {
                        textAlign:"center",
                        height:"290px",
                        width:"850px",
                       
                    }
                }
                >
                    {postContent}
                </div>

               
             </div> 

                    {/*  Footer of post.*/}
            <div
                style={
                    {
                      
                        marginTop:"10%",
                        height:"60px"
                    }
                }
             >
            <Row>
                {/* <Col md={3}>
                    <Button variant="primary">Like</Button>
                    <Button variant="dark ms-4">Hate</Button>
                </Col> */}
                <Col md={12} 
                style={
                    {
                        
                    }
                }  
                >
                    <CommentsList postId={props.postId}/>
                </Col>
            </Row>
            
             </div> 
             
        </div>
        );
  };
  export default Post
