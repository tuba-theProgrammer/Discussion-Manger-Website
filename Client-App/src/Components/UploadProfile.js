import React,{useEffect,useState} from "react";
import { Router,Link } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css'
import profile_image from './ImagePreview_logo.png'
import {Container,Row,Col,Card,Button,Form,FormControl,Image} from 'react-bootstrap'
import styles from './mystyle.module.css'; 
import { Label } from "reactstrap";
import {storage} from './FirebaseInitializer'
import "firebase/storage"
import SetStatus from "./SetStatus";
import connectionUrl from './ConnectionUrl'
export default function UploadProfile(props){

    let imagePreview="Image Preview"
    // const [storage,setStorage]=useState()
    const [imageFile,setImageFile]=useState(null)
    const [uploadingStatus,setUploadingStatus]=useState("")
    const [profileImage,setProfileImage]=useState(<Image src={profile_image} roundedCircle style={{
      marginTop:"5%"
    }} />)

    
    
    function setImage(e)
    {
      setImageFile(e.target.files[0])
      
    }

    function uploadImage(e) {
      if(imageFile)
      {
        const image = imageFile
        setProfileImage(<Image   style={
          {
            marginTop:"5%",
                  width:"200px",
                  height:"200px"
          }
        } src="https://64.media.tumblr.com/695ce9a82c8974ccbbfc7cad40020c62/tumblr_o9c9rnRZNY1qbmm1co1_1280.gifv"/>)
        const uploadTask = storage.ref(`profileImages/${image.name}`).put(image);
        uploadTask.on(
          "state_changed",
          snapshot => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            
          },
          error => {
            console.log(error);
          },
          () => {
            storage
              .ref("profileImages")
              .child(image.name)
              .getDownloadURL()
              .then(url => {

                setProfileImage(<Image src={url} roundedCircle style={{
                  marginTop:"5%",
                  width:"200px",
                  height:"200px"
                }} />)
                
                //Now uploading to API
                let data ={
                  userUid:localStorage.getItem("userUid"),
                  photoUrl:url
              }
              fetch(`${connectionUrl}/profileService/uploadProfileImage`,
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
                props.parent_profileImageReloader(url)
                setUploadingStatus(
                  <div style={
                    {
                      fontSize:"20px",
                      color:"white",
                      marginTop:"20px"
                    }
                  }>
                  {data.responseMessage}
                  </div>)
              })

              });
          }
        ); 
      }
      else
      {
        setUploadingStatus(
          <div style={
            {
              fontSize:"20px",
              color:"white",
              marginTop:"20px"
            }
          }>
            Please choose a file.
          </div>)
      } 
      }
     
    return (
        <div  style={{
            marginTop:"10%",
           
        }}>
            <Row>
                <Col md={8}>
         <input type="file"  style={{
            color:"white",
            marginLeft: "60%",
            
        }}
        onChange={setImage}
        /> 
        </Col>
        </Row>
        <Row>
        <Col md={12}>
            <div>       
        {profileImage}
        </div>
        </Col>
   </Row>
        <Row>
            <Col md={12}>
                <Label style={{
    marginTop: "3%",
   fontSize: "25px",
   color:"White"
}}>
    {imagePreview}
</Label>
                </Col>
            </Row>
            <Row>
            <Col md={4}>
            <Button variant="dark" size="lg" block style={{
                              marginTop: "5%",  
                              marginLeft: "115%"
                            }} 
                            onClick={uploadImage}
                            >
 Upload</Button>
 </Col>
                </Row>
         <div >
         {uploadingStatus}  

         </div>       
             
        </div>
    );
}
