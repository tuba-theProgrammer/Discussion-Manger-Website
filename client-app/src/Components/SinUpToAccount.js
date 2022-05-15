import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

import "react-loadingmask/dist/react-loadingmask.css";
import LoadingMask from "react-loadingmask";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Form,Nav} from 'react-bootstrap'
import connectionUrl from './ConnectionUrl'
const SinUpToAccount = (props) => {
  
  const {
    buttonLabel,
    className,
    type
  } = props;

  const [modal, setModal] = useState(false);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  
  const [erroMeeage, setErroMeeage] = useState('');
  const [loadingSpinner, setloadingSpinner] = useState(false);
  


  const toggle = ()=>{
      setModal(!modal)
      console.log(modal)
    }
    
    
    let btn =    <Nav.Item><button  className="btn btn-outline-light mr-2" onClick={toggle}>{buttonLabel}</button></Nav.Item>  
    console.log(type)
    if(type==="NavBar")
    {
      btn =  <Nav.Item><button  className="btn btn-outline-light mr-2" onClick={toggle}>{buttonLabel}</button></Nav.Item>
    }
  
    
    function sinup()
    {
      setErroMeeage('')
      setloadingSpinner(true)
      let data =
      {
        displayName:name,
        email:email,
        password:password,
        phoneNumber:phoneNumber,
        onlineStatus:"Active",
        address:address
      }
      
    fetch(`${connectionUrl}/accountsService/createAccountWithEmail`,
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
      setloadingSpinner(false)
      console.log(error)
      setErroMeeage(<span>Server is not responding please try later</span>)
    }
    ).then(data=>{
      //On success.
      setloadingSpinner(false)
     
      try{
         
        // {
        //   "responseMessage": "Verification email has been sent",
        //   "responseCode": 1,
        //   "userId": "pgAjluAdwrSWoSmrHOMxrx6lwYH2"
        // }
  
      console.log(data.responseCode)
      if(data.responseCode===4)
      {
        setErroMeeage(<span>{data.responseMessage.message}</span>) 
      }
      else if(data.responseCode===5)
      {
        setErroMeeage(<span>{data.responseMessage}</span>) 
      }
      else if(data.responseCode===1)
      {
        setErroMeeage(<span>{data.responseMessage}</span>) 
      } 
      else
      {
        setErroMeeage(<span>{data.responseMessage}</span>) 
      }
      
      }catch(e){}
    })
  }  
      
  return (
    <div>
      {btn}
      <Modal isOpen={modal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
        toggle={toggle} className={className}  centered>
        <ModalHeader toggle={toggle}>Create Account</ModalHeader>
        <ModalBody>

          <Form>
             <Form.Group controlId="formBasicEmail">
                 <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Name" onChange={event =>
                {
                  setName(event.target.value)
                  event.preventDefault();   
                }
                }  />

                <Form.Label>Phone number</Form.Label>
                <Form.Control type="text" placeholder="+923053206993 Must include country code" onChange={event =>
                {
                  setPhoneNumber(event.target.value)
                  event.preventDefault();   
                }
                }  />
        
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email"  onChange={event =>
              {
                  setEmail(event.target.value)
                  event.preventDefault();   
              }
              } />
              <Form.Text className="text-muted">
                       We'll never share your email with anyone else.
              </Form.Text>

              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={event =>
                {
                  setPassword(event.target.value)
                  event.preventDefault();   
                }
              } />
              <Form.Text className="text-muted">
                  Please do not enter the password of email, enter new password
              </Form.Text>

             <Form.Label>Address</Form.Label>
             <Form.Control type="text" placeholder="Enter your address" onChange={event =>
              {
                  setAddress(event.target.value)
                  event.preventDefault();   
              }
              }  />
        
              </Form.Group> 
          </Form>

        </ModalBody>
        <ModalFooter>
          <LoadingMask loading={loadingSpinner} text={"loading..."}>
              <div style={{ width: 50, height: 40 }}></div>
          </LoadingMask>
          <div>{erroMeeage}</div>
          <Button color="primary" onClick={toggle}>Back</Button>{' '}
            <Button color="secondary" onClick={sinup}>Create Account</Button>
        </ModalFooter>

      </Modal>
    </div>
  );
}

export default SinUpToAccount;