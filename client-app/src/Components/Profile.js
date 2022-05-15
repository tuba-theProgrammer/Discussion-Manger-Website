import React,{useEffect,useState} from "react";
import profile_image from './default_image.png'
import plogo from './profile_name_logo.png'
import MyBio from './MyBio'
import PassReset from './ResetPass'
import DeleteAccount from './DeleteAccount'
import SetStatus from './SetStatus'
import UploadProfile from './UploadProfile'
import { Router,Link } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container,Row,Col,Card,Button,Form,FormControl,Image} from 'react-bootstrap'
import styles from './mystyle.module.css'; 
import connectionUrl from './ConnectionUrl'
const Profile = props => {
   const [variableScreen,setVariableScreen]= useState(<Image   style={
    {
      marginTop:"5%",
            width:"200px",
            height:"200px"
    }
  } src="https://64.media.tumblr.com/695ce9a82c8974ccbbfc7cad40020c62/tumblr_o9c9rnRZNY1qbmm1co1_1280.gifv"/>)
   const [profileImage,setProfileImage]=useState("https://64.media.tumblr.com/695ce9a82c8974ccbbfc7cad40020c62/tumblr_o9c9rnRZNY1qbmm1co1_1280.gifv")
  
     const [email,SetEmail]= useState("email")
    const [usename,SetUserName]= useState("username")
    const [PN,SetPn]= useState("Phone-number")
    const [ON_status,Set_On_status]= useState("status")
    const [address,SetAddress]= useState("last online activity")

   function sendProfileData(){
    
      
  
    setVariableScreen(

                  <MyBio 
                      profile_email={email} profile_phone={PN}
                      profile_name={usename} profile_address={address}
                      profile_onlineStatus={ON_status}
                  />

      )
             
     

   }
   

   function loadProfile(){
    let data ={
       uid:localStorage.getItem("userUid")
       
    }

console.log("loadProfile "+data)
    fetch(`${connectionUrl}/profileService/loadProfilewithUid`,
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
     console.log(error)
    }

    ).then(data=>{
        console.log(data)
        
        setProfileImage(data.photoURL)
        console.log("Phto url"+data.photoURL)
        SetEmail(data.email)
        SetUserName(data.displayName)
        localStorage.setItem("userEmail",data.email)
       SetPn(data.phoneNumber)
       SetAddress(data.metadata["lastSignInTime"])
       setVariableScreen("")
       
    })




  
    }

    
    
    
    function loadStatus(){
      let data ={
          userUid:localStorage.getItem("userUid")
          
       }
      fetch(`${connectionUrl}/profileService/setStatusRouter`,
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
       console.log(error)
      }
  
      ).then(data=>{
          console.log(data)
          Set_On_status(data[0].onlineStatus)
       
      })
  

  }
  useEffect(loadProfile,[]);
  useEffect(loadStatus,[]);
 
 
   function profileImageReloader(newProfileImage)
   {
      console.log("Called the parent"+newProfileImage)
      setProfileImage(newProfileImage)
   }

   

   function resetPass(){
    setVariableScreen(<PassReset />)
   }
   function DeleteAcc(){
    setVariableScreen(<DeleteAccount />)
   }
   function setStatus(){
     if(ON_status==="Online"){
      setVariableScreen(<SetStatus profile_onlineStatus={true}/>)
     }else if(ON_status==="Offline"){
      setVariableScreen(<SetStatus profile_onlineStatus={false}/>)
     }
   
   }
   function uploadProfile(){
    setVariableScreen(<UploadProfile parent_profileImageReloader={profileImageReloader}  />)
   }

    return (
        <div>
         
            <Row>
            <Col xs={4} md={3}  style={
                  {
                     
                      marginTop:"1%",
                    
                  }
               }>
                      
<Image 

style={
  {
    height:"180px",
    width:"180px"
  }
}

src={profileImage} roundedCircle />
    <div>
    <Button variant="dark" size="lg" block style={{
                              marginTop: "3%",  
                              
                            }} onClick={sendProfileData}>

  My Bio </Button>
      </div>  
      <div>
    <Button variant="dark" size="lg" block style={{
                              marginTop: "5%",  
                              
                            }} onClick={uploadProfile}>

 Upload New Profile Pic </Button>
      </div>  
      <div>
    <Button variant="dark" size="lg" block style={{
                              marginTop: "5%",  
                              
                            }} onClick={resetPass}>

  Reset Password </Button>
      </div>        
      <div>
    <Button variant="dark" size="lg" block style={{
                              marginTop: "5%",  
                              
                            }} onClick={setStatus}>

  Set Status </Button>
      </div>        
      <div>
    <Button variant="dark" size="lg" block style={{
                              marginTop: "5%",  
                              
                            }} onClick={DeleteAcc}>

  Delete Account </Button>
      </div>        
  
                                
{/* <input type="file" style={{
                              marginTop: "3%",  
                              
                            }} /> */}

            </Col>
            <Col xs={8} md={8}>
             
           {variableScreen}
            
            </Col>
            
            </Row>
             
            
            </div>
       
        
        );
  };
  export default Profile

