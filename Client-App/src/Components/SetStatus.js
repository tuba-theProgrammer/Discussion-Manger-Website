import React,{useEffect,useState} from "react";
import { Router,Link } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container,Row,Col,Card,Button,Form,FormControl,Image} from 'react-bootstrap'
import styles from './mystyle.module.css'; 
import {Label } from "reactstrap";
import connectionUrl from './ConnectionUrl'
export default function SetStatus(props){

    const [onlineStatus,setonlinestatus]=useState(props.profile_onlineStatus)
    
    

    function changeToggle()
    {
        if(onlineStatus){
            sendResponseToServer("Offline")
        }
        else{
            sendResponseToServer("Online")
        }
        setonlinestatus(!onlineStatus)
        
    }

    function sendResponseToServer(status)
    {
        let data ={
            userUid:localStorage.getItem("userUid"),
            requestContent:status
        }
        fetch(`${connectionUrl}/profileService/UpdateStatusRouter`,
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
         
        }
    
        ).then(data=>{
          //on sucess.
          try{
            console.log(data.responseMessage)
         }
          catch(e)
          {
    
          }
        })
    
    }
    return (
        <div  style={{
         
            marginTop:"25%",
            marginLeft:"33%",
            color:"white",
            borderStyle: 'solid',
            borderColor:'rgb(201, 164, 164)',
            borderWidth: "5px",
            height:"20%",
            width:"50%"  
         }}>
    <Row>
        <Col md={12}>
        <Form style={{
            marginTop:"8%",
        }}>
  <Form.Check 
    type="switch"
    id="custom-switch"
    label="Show when you're active"
    checked={onlineStatus}
    onChange={

        ()=>{
            changeToggle()
           
        }
        
      
    }
  />
  </Form>
        </Col>
        </Row>
        </div>
    );
}
