import React,{useEffect,useState} from "react";
import home from './home.png'
import { Router,Link } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container,Row,Col,Card,Button,Image} from 'react-bootstrap'
import styles from './mystyle.module.css'; 
import TableScrollbar from 'react-table-scrollbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Contacts from './Contacts'
import ChatArea from './ChatArea'
import ChatProfileVeiwer from './ChatProfileViewer'
const Chats = props => {
  
    //Now here we will make a call to our API for fetching our the contacts information.
    const [chatAreaHolder,setChatAreaHolder]=useState("")
    
    function makeCallToChatArea()
    {
        console.log("YES")
    }

    const chatAreaTigger = (uid,name,profile)=>
    {
        
        
        setChatAreaHolder(<ChatArea selectedUserUid={uid} selectedUserName={name} selectedUserProfile={profile} />)
        console.log("UID"+uid)
    }
    
    // useEffect(makeCallToChatArea,[uid])
    return (
            <div className={styles.chatList}>
                <Row>
                   <Col md={4}>
                       <div style={
                           {
                               color:"yellow",
                               fontSize:"30px",
                               paddingBottom:"20px"
                               
                           }
                       }>
                           My Contacts 
                        </div>
                       <Contacts chatAreaTrigger={chatAreaTigger} />
                   </Col>
                   <Col md={8} >
                       {chatAreaHolder}
                    </Col> 
                   
                   
                </Row>
            </div>
        );
  };
  export default Chats

