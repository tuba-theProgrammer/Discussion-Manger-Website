import React,{useEffect,useState} from "react";
import home from './home.png'
import { Router,Link } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container,Row,Col,Card,Button,Image} from 'react-bootstrap'
import styles from './mystyle.module.css'; 
import TableScrollbar from 'react-table-scrollbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import connectionUrl from './ConnectionUrl'
const FirendRequests = props => {
  
    //Now here we will make a call to our API for fetching our the contacts information.
    const [peopleProfileCard,setPeopleProfileCard]=useState(<div>Servcer is not responding</div>)

    const [serverResponse,setServerResponse]=useState({})

    const [approvedRequest,setApprovedRequest]=useState('')

    function loadContacts()
    {
        let data ={
            userUid:localStorage.getItem("userUid")
        }
        fetch(`${connectionUrl}/chatService/loadAllNewFrndsList`,
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
          //on sucess.
        
          try{
          console.log(data)
          setServerResponse(data)
          }catch(e)
          {
    
          }
        })
      
    }

   

    function setDataIntoList()
    {
       const approveRequest =  function (e,uid,profile,name)
        {
            let data =
            {
                userUid:localStorage.getItem("userUid"),
                contactUserUid:uid
            }
            
          fetch(`${connectionUrl}/chatService/acceptFrndRequest`,
          {
            method: 'POST',
            headers: {
                    'Content-Type': 'application/json;charset=utf-8'
            },
               body: JSON.stringify(data)
          }).then(
          response => 
          {
            return response.json()
          },
          error=>
          {
            //on error
            console.log("Erro in sending connection request"+error)
          }
          ).then(data=>{
            //On success.
            
            try{
               
              // {
              //   "responseMessage": "Verification email has been sent",
              //   "responseCode": 1,
              //   "userId": "pgAjluAdwrSWoSmrHOMxrx6lwYH2"
              // }
              if(data.responseCode===0)
              {
                  setApprovedRequest("Approved")
              }
            }catch(e){}
          })

        }  


        let list=[]

        console.log(Object.values(serverResponse))
        Object.keys(serverResponse).map((rec)=>{
            var record = serverResponse[rec];
            console.log(record.contactUserName)
        //     "userUid": "qA5RRMCCo5h6KD0s9aP8SuOzriH2",
        // "contactUserUid": "fKctIlTHuqeVQt3XIGXC6Y2jT5X2",
        // "contactUserName": "Tuba",
        // "contactUserProfile": "https://firebasestorage.googleapis.com/v0/b/discussion-manager.appspot.com/o/1620937610218-WhatsApp%20Image%202021-04-07%20at%203.00.32%20AM.jpeg?alt=media&token=49ee247d-98bd-4719-8220-3ddd561b3ada",
        // "status": "Not Approved"
            list.push({
                userUid:record.contactUserUid,
                userName:record.contactUserName,
                profileImage:record.contactUserProfile,
                status:record.status
            })
        })

    setPeopleProfileCard(list.map((record)=>
     {
     let rec =

     <div>  
            <Card className="shadow mt-2">
            {/* <Card.Header>Featured</Card.Header> */}
            <Card.Body>
                <Row>
                    <Col md={4}>
                         <Image src={record.profileImage} style={{height:'auto',width:'60%'}}  roundedCircle  />
                    </Col>
                    <Col md={8}>
                        <div className={styles.peopleCardContent}>
                                <h2>{record.userName}</h2>
                                <Row>
                                    
                                    <Col md={4}>
                                        {/* <span><Button variant="success">Profile</Button></span> */}
                                    </Col>
                                    <Col md={4}>
                                        <span>
                                        <Button variant="primary" onClick={ e => approveRequest(e,record.userUid,record.profileImage,record.userName)}>{record.status}</Button>
                                        </span>
                                    </Col>
                                </Row>      
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>

       </div>    

            return rec
          }) )
    }

    useEffect(loadContacts,[approvedRequest]);
    useEffect(setDataIntoList,[serverResponse])

    return (
            <Container className={styles.peopleList}>
                <Row>
                    <h1>Requests</h1>
                </Row>
                <Row>
                    {/* All contacts cards */}
                    <Row className={styles.peopleCardList}>
                         {peopleProfileCard}     
                    </Row>
                </Row>
            </Container>
        );
    }
 
  export default FirendRequests

