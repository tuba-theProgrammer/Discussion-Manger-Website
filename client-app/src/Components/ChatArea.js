import React,{useEffect,useState} from "react";
import logo from './logo192.png'
import { Router,Link } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container,Row,Col,Card,Button,Image,Form} from 'react-bootstrap'
import styles from './mystyle.module.css'; 
import TableScrollbar from 'react-table-scrollbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { version } from "react-dom";
import connectionUrl from './ConnectionUrl'
const ChatArea = props => {
  
    //Now here we will make a call to our API for fetching our the contacts information.
    const [flag,setFalg]=useState(0);
    const [shouldLoadMessages,setShouldLoadMessages] = useState(props.selectedUserUid)
    const [message,setMessage]=useState()
    const [listOfMessages,setListOfMessages]=useState([]);

    //Follwiing list will be loaded from server
    const [messages,setMessages]=useState([])
    const [selectedUserUid,setUserUid]=useState(props.selectedUserUid)
    useEffect(()=>{
        // setMessages([])
        //here we will load initial chat
        console.log("Contact uid "+props.selectedUserUid+" User uid "+localStorage.getItem("userUid"))
        loadMessagesFromServer(localStorage.getItem("userUid"),props.selectedUserUid,30,0)

    },[props.selectedUserUid])

    useEffect(()=>{
        console.log("Loading in list")
        loadMessagesIntoList()
    },[messages])

    useEffect(()=>{

        //Now checking contineosly about new messages..
      let  id = setInterval(()=>{
            loadMessagesFromServer(localStorage.getItem("userUid"),props.selectedUserUid,30,0)
        },2000)
      return ()=>{
          clearInterval(id)
      }  
    },[props.selectedUserUid])

    function loadMessagesFromServer(userUid,recieverUid,numberOfMessages,messageOffset){
        let data ={
            
                 userUid:userUid,
                 recieverUid:recieverUid,
                 numberOfMessages:numberOfMessages,
                 messageOffset:messageOffset

        }
        fetch(`${connectionUrl}/chatService/loadChat`,
        {
          method: 'POST',
          headers: {
                  'Content-Type': 'application/json;charset=utf-8'
          },
             body: JSON.stringify(data)
        }).then(
        response => 
        {
        //   console.log(response.json())  
          return response.json();
        },
        error=>
        {
          //on error
          console.error(error)
        }
        ).then(data=>{
          //on sucess.
          
          try{
                //Now we will set it in messages ..
                let tempMessages = [];
                

                data.forEach((itm,index)=>{
                    console.log(itm.messageContent)
                    tempMessages.push({
                        messageType: itm.messageType,
                        userUid: itm.userUid,
                        messageContent: itm.messageContent,
                        messageStatus: itm.messageStatus,
                        messageSendTime: itm.messageSendTime
                    })
                })

                console.log("Loading messages")
                setMessages(tempMessages)
                //loadMessagesIntoList()
          }
          catch(e)
          {
            console.log("Error"+e);
          }
        })

    }

    function loadMessagesIntoList()
    {
        setListOfMessages(
            messages.map((itm,index)=>{
                if(itm.userUid===localStorage.getItem("userUid"))
                {
                return(
                     <div key={index} className={styles.sentMessage} fluid>
                        {/* Sent  meesage */}
                        <h7
                        
                        style={
                            {
                                fontFamily:"Gill Sans, sans-serif",
                                fontSize:"15px"
                            }
                        }

                        >{itm.messageContent}</h7><span className={styles.spaceSentMessage}>''''''</span>
                         <div></div>
                        <h7 
                        style={
                            {
                                fontSize:"10px"
                                
                            }
                        }
                        >{itm.messageSendTime}</h7><span className={styles.spaceSentMessage}>''''''</span>
                        
                     </div>
                    )
                }
                else
                {
                    return(
                        <div className={styles.recievedMessage} fluid>
                            {/* Reciede meesage */}
                            <h7
                            
                            style={
                                {
                                    fontFamily:"Gill Sans, sans-serif",
                                    fontSize:"15px"
                                
                                }
                            }
                            >{itm.messageContent}</h7>
                            <div></div>
                        <h7 
                        style={
                            {
                                fontSize:"10px"
                            }
                        }
                        >{itm.messageSendTime}</h7>
                         </div>
                    )
                }
            })
        )
    }

    function sendMessage(messageToSend)
    {
        var currentdate = new Date(); 
        var datetime = "Sent: " + currentdate.getDate() + "/"
                        + (currentdate.getMonth()+1)  + "/" 
                        + currentdate.getFullYear() + " @ "  
                        + currentdate.getHours() + ":"  
                        + currentdate.getMinutes() + ":" 
                        + currentdate.getSeconds();

        let v = messages;
        v.push({
            messageType: "Text",
            userUid:localStorage.getItem("userUid"),
            messageContent: messageToSend,
            messageStatus: "New",
            messageSendTime: datetime
        })

        setMessages(v)
        loadMessagesIntoList()
        
        //Sneding message

        sendingMessageToAPI(localStorage.getItem("userUid"),props.selectedUserUid,"Text",messageToSend,"New",datetime)  
    }

//Now sending message to server ... I mean calling API to send message.

    function sendingMessageToAPI(userUid,recieverUid,messageType,messageContent,messageStatus,messageSendTime)
    {
        let data ={
            userUid:userUid,
            recieverUid:recieverUid,
            messageType:messageType,
            messageContent:messageContent,
            messageStatus:"New",
            messageSendTime:messageSendTime	
        }
        fetch(`${connectionUrl}/chatService/sendMessage`,
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
          console.log(data);
          }catch(e)
          {
    
          }
        })
    }  


    console.log("Rendering")
    return (
        <div>
            {/* Header Aread */}
            <div style={
                {
                    borderStyle: 'solid',
                    borderColor:'rgb(201, 164, 164)',
                    borderWidth: "1px",
                    height:"15%"                   
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

                        <Row>
                            <Col md={1}>
                            <Image src={props.selectedUserProfile}  style={{
                                   borderWidth: 3,
                                   borderColor: "red",
                                   borderRadius: "60%",
                                   height:"50px",
                                   width:"50px"
                                }} />
                            </Col>
                            <Col md={8}>
                             <span
                             style={{
                                fontSize:"25px",
                                textAlign:"left",
                                color:"yellow"
                             }}
                                >
                                {props.selectedUserName}</span>
                            </Col>
                        </Row>    
                            

                            
                        </div>
                     
            </div>
            
            {/* Messages areas */}

            <div
            style={
                {
                    height:"100%",
                }
            }

            >
            <div className={styles.listOfMessages}>
                        {/* **************************************************************** MEssages ***************** */}
{
     listOfMessages
}
                          
                        </div>

            </div>
        
            <Row className={styles.messageSendArea}>
               <Col md={1}
               style={
                  {
                      textAlign:"left",
                      marginTop:"1%",
                    
                  }
               }
               >
                <FontAwesomeIcon icon="upload" size="2x"/>
               </Col> 
               <Col md={9}
               style={
                  {
                      textAlign:"left",
                      marginTop:"1%",
                     
                  }
               }

               >
                <Form.Control  type="text" placeholder="Small text" 
                onChange={
                    (e)=>{
                        setMessage(e.target.value)
                    }
                   
                }
                /> 
               </Col> 
               <Col md={2}
               style={
                  {
                      textAlign:"right",
                      marginTop:"1%"
                  }
               }
               >
                <Button variant="primary" onClick={
                    ()=>{
                        
                        sendMessage(message)
                       
                    }
                } >Send</Button>
               </Col> 
            </Row>   
            
            </div>
        );
  };
  export default ChatArea

