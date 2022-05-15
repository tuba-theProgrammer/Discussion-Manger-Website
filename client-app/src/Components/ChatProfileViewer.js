import React,{useEffect,useState} from "react";
import home from './home.png'
import { Router,Link } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container,Row,Col,Image,Button,Form,FormControl} from 'react-bootstrap'
import styles from './mystyle.module.css'; 
import TableScrollbar from 'react-table-scrollbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const ChatProfileVeiwer = props => {
  
    //Now here we will make a call to our API for fetching our the contacts information.


    return (
    <Container >
        <Row className={styles.chatProfileViewHeader}>
        <h5 className={styles.chatProfileViewTitle}>Profile</h5>   
        </Row>
        <Row >
            <div className={styles.chatProfileContentArea}>
                <div className={styles.profileImage}>
                    <Image  style={{height:'auto',width:'90%'}}  roundedCircle  src="https://firebasestorage.googleapis.com/v0/b/discussion-manager.appspot.com/o/1620937610218-WhatsApp%20Image%202021-04-07%20at%203.00.32%20AM.jpeg?alt=media&token=49ee247d-98bd-4719-8220-3ddd561b3ada" rounded />
                </div>
                <div className={styles.profileViewrDetails}>
                    <h6>Name : Zeeshan</h6>
                    <h6>Email : Zeeshan@gamil.com</h6>
                    <h6>Number: 03053206339</h6>
                </div>
            </div>
        </Row>

            </Container>
        );
  };
  export default ChatProfileVeiwer

