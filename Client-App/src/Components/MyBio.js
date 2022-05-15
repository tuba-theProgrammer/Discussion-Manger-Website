import React,{useEffect,useState} from "react";
import { Router,Link } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container,Row,Col,Card,Button,Form,FormControl,Image} from 'react-bootstrap'
import PN_logo from './phone_number_logo.png'
import ONStatuslogo from './onlineStatus_logo.png'
import Emaillogo from './emailLogo.png'
import Addresslogo from './address_logo.png'
import Passlogo from './pass_logo.png'
import UserNamelogo from './profile_name_logo.png'
import { Label } from "reactstrap";

export default function MyBio(props){
    let Email="Email:",UserName="UserName:",pn="Phone-Number:",OnStatus="Online-Status:",add="Last Online Activity:";
   
    return (
       
        <div  style={{
           marginTop:"15%",
           marginLeft:"10%",
           borderStyle: 'solid',
           borderColor:'rgb(201, 164, 164)',
           borderWidth: "5px",
           height:"60%",
           width:"100%"  
        }}>
       <Container>
           <Row>
               <Col md={5} 
               >
                   <Label style={{
                       marginTop: "3%",
                      fontSize: "25px",
                      color:"White"
                   }}>
                       {Email}
                   </Label>
               </Col>
               <Col md={7}
               >
               <div style={
                {    
                    borderStyle: 'solid',
                    borderColor:'rgb(201, 164, 164)',
                    borderWidth: "1px",
                    height:"85%",  
                                  
                }
            }>
                   
                        <div style={{
                             marginTop: "3%",
                             textAlign: 'left',
                             marginLeft: "2%",
                             marginTop:"2%",
                             color: 'white',
                             paddingBottom:"10px"
                            
                        }}>
                            
                            <Image src={Emaillogo}  style={{
                                   
                                   borderWidth: 3,
                                   borderColor: "red",
                                   borderRadius: "60%",
                                   height:"40px",
                                   width:"40px"
                                }} />
                            <span
                            style={{
                                fontSize:"20px"
                            }}
                            >
                                {props.profile_email}</span>
                        </div>
                     
            </div>
               </Col>
               </Row>

               <Row>
               <Col md={5}>
                   <Label style={{
                       marginTop: "3%",
                      fontSize: "25px",
                      color:"White"
                   }}>
                       {UserName}
                   </Label>
               </Col>
               <Col md={7}
               >
               <div style={
                {   
                    borderStyle: 'solid',
                    borderColor:'rgb(201, 164, 164)',
                    borderWidth: "1px",
                    height:"85%",                    
                }
            }>
                   
                        <div style={{
                             marginTop: "3%",
                             textAlign: 'left',
                             marginLeft: "2%",
                             marginTop:"2%",
                             color: 'white',
                             paddingBottom:"10px"
                            
                        }}>
                            
                            <Image src={UserNamelogo}  style={{
                                   
                                   borderWidth: 3,
                                   borderColor: "red",
                                   borderRadius: "60%",
                                   height:"40px",
                                   width:"40px"
                                }} />
                            <span
                            style={{
                                fontSize:"20px"
                            }}
                            >
                                {props.profile_name}</span>
                        </div>
                     
            </div>
               </Col>
               </Row>
                      <Row>
               <Col md={5}>
                   <Label style={{
                       marginTop: "3%",
                      fontSize: "25px",
                      color:"White"
                   }}>
                       {pn}
                   </Label>
               </Col>
               <Col md={7}
               >
               <div style={
                {   
                    borderStyle: 'solid',
                    borderColor:'rgb(201, 164, 164)',
                    borderWidth: "1px",
                    height:"85%",                    
                }
            }>
                   
                        <div style={{
                             marginTop: "3%",
                             textAlign: 'left',
                             marginLeft: "2%",
                             marginTop:"2%",
                             color: 'white',
                             paddingBottom:"10px"
                            
                        }}>
                            
                            <Image src={PN_logo}  style={{
                                   
                                   borderWidth: 3,
                                   borderColor: "red",
                                   borderRadius: "60%",
                                   height:"40px",
                                   width:"40px"
                                }} />
                            <span
                            style={{
                                fontSize:"20px"
                            }}
                            >
                                {props.profile_phone}</span>
                        </div>
                     
            </div>
               </Col>
               </Row>
               <Row>
               <Col md={5}>
                   <Label style={{
                       marginTop: "3%",
                      fontSize: "25px",
                      color:"White"
                   }}>
                       {OnStatus}
                   </Label>
               </Col>
               <Col md={7}
               >
               <div style={
                {   
                    borderStyle: 'solid',
                    borderColor:'rgb(201, 164, 164)',
                    borderWidth: "1px",
                    height:"85%",                    
                }
            }>
                        <div style={{
                             marginTop: "3%",
                             textAlign: 'left',
                             marginLeft: "2%",
                             marginTop:"2%",
                             color: 'white',
                             paddingBottom:"10px"
                            
                        }}>
                            
                            <Image src={ONStatuslogo}  style={{
                                   
                                   borderWidth: 3,
                                   borderColor: "red",
                                   borderRadius: "60%",
                                   height:"40px",
                                   width:"40px"
                                }} />
                            <span
                            style={{
                                fontSize:"20px"
                            }}
                            >
                                {props.profile_onlineStatus}</span>
                        </div>
                     
            </div>
               </Col>
               </Row>
               <Row>
               <Col md={5}>
                   <Label style={{
                       marginTop: "3%",
                      fontSize: "25px",
                      color:"White"
                   }}>
                       {add}
                   </Label>
               </Col>
               <Col md={7}
               >
               <div style={
                {   
                    borderStyle: 'solid',
                    borderColor:'rgb(201, 164, 164)',
                    borderWidth: "1px",
                    height:"85%",                    
                }
            }>
                   
                        <div style={{
                             marginTop: "3%",
                             textAlign: 'left',
                             marginLeft: "2%",
                             marginTop:"2%",
                             color: 'white',
                             paddingBottom:"10px"
                            
                        }}>
                            
                            <Image src={Addresslogo}  style={{
                                   
                                   borderWidth: 3,
                                   borderColor: "red",
                                   borderRadius: "60%",
                                   height:"40px",
                                   width:"40px"
                                }} />
                            <span
                            style={{
                                fontSize:"20px"
                            }}
                            >
                                {props.profile_address}</span>
                        </div>
                     
            </div>
               </Col>
               </Row>

           </Container>
        </div>
    );
}
