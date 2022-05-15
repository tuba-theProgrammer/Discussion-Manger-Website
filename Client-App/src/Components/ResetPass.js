import React,{useEffect,useState} from "react";
import { Router,Link } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container,Row,Col,Card,Button,Form,FormControl,Image} from 'react-bootstrap'
import styles from './mystyle.module.css'; 
import { Label } from "reactstrap";
import connectionUrl from './ConnectionUrl'
export default function ResetPass(){
  const [resetPassURL,setResetPass]=useState("set pass");
  
  
  
    let data ={
      email:localStorage.getItem("userEmail")
   }

console.log(data)
   fetch(`${connectionUrl}/accountsService/restMyPasswordWithEmailLink`,
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
     
   })

  
    return (
        <div  style={{
            marginTop:"30%",
            marginLeft:"10%",
            color:"white",
            borderStyle: 'solid',
            borderColor:'rgb(201, 164, 164)',
            borderWidth: "5px",
            height:"40%",
            width:"100%"  
         }}>
           <Row>
             <Col>
     <Button variant="dark" size="lg" style={{
                              marginTop: "10%",  
                              
                            }} onClick={resetPassURL}>
                              Send Reset Pass Request
                              </Button>
</Col>
</Row>
<Row>
  <Col>
 <Label style={{
                              marginTop: "2%",  
                              
                            }} >
 check your email please and follow the link to reset you password.
</Label>
</Col>
</Row>

                </div>
    );
}
