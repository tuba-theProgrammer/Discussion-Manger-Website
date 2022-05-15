import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import "react-loadingmask/dist/react-loadingmask.css";
import LoadingMask from "react-loadingmask";
import {Route,Link,useHistory} from 'react-router-dom'
import connectionUrl from './ConnectionUrl'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,NavLink } from 'reactstrap';
import {Form,Nav,Alert} from 'react-bootstrap'
import styles from './mystyle.module.css'; 

const LoginToAccount = (props) => {
  const {
    buttonLabel,
    className,
    type
  } = props;

  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  const [loadingSpinner, setloadingSpinner] = useState(false);
  
  const [erroMeeage, setErroMeeage] = useState('');
  
  //Form input fileds hooks
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  
  const toggle = () => {
    setErroMeeage('')
    setModal(!modal);
  }
  const toggleNested = () => {
    setErroMeeage('')
    setNestedModal(!nestedModal);
    setCloseAll(false);
  }
  const toggleAll = () => 
  {
    setErroMeeage('')
    setNestedModal(!nestedModal);
    setCloseAll(true);
  }

// Used when we try to login from Body

  const history = useHistory();

  const handleClick = () =>{

     var isLogedIn  = localStorage.getItem("isLogedIn")
      console.log("Is loged in"+isLogedIn)
      if(isLogedIn==="false" || localStorage.getItem("isLogedIn")==null)
      {
        //If not loged in then open login modal
        toggle();
      }
      else
      {
        history.push('/Home');
      }

     }

  //Calling API fro login and sin up services.

  //-----------------L   O  G  I N ---------------------

function login()
{
  setErroMeeage('')
    //Start spinner
    setloadingSpinner(true)
    let data ={
        email:email,
        password:password
    }

    
    fetch(`${connectionUrl}/authenticationService/login`,
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
      setloadingSpinner(false)
      console.log(error)
      setErroMeeage(<span>Server is not responding please try later</span>)
    }

    ).then(data=>{
      //on sucess.
      setloadingSpinner(false)
      try{
      const {responseMessage,responseCode,userId,userName}=data;
      console.log("Login data------------------------"+data)
      console.log(responseMessage)
      if(responseCode===1)
      {
        localStorage.setItem("isLogedIn",true)
        localStorage.setItem("userUid",userId)
        localStorage.setItem("userName",userName)
        history.push('/Home');
        window.location.reload();
      }
     else{
      setErroMeeage(<span>{responseMessage}</span>)
     }
      }catch(e)
      {

      }
    })
}  
  
  //------------S  i        n      u    p-------------------------
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
  


  let btn =<Nav.Item>  <button  className="btn btn-primary btn-outline-light mr-2" onClick={toggle}>{buttonLabel}</button></Nav.Item>

  if(type==="NavBar")
  {
    btn =<Nav.Item>  <button  className="btn btn-primary btn-outline-light mr-2" onClick={toggle}>{buttonLabel}</button></Nav.Item>
  }
  else
  {
    btn = <Nav.Item><button type="button" style={{
      borderRadius: "15px 50px 30px",
      background: "#73AD21",
      padding: "20px",
      width: "250px",
      height: "100px",
      fontSize:"30px"
    }} onClick={handleClick}>Manage</button></Nav.Item>
  }

  return (
    <div>
     
     
     
     {btn}       
      <Modal isOpen={modal} toggle={toggle} className={className} centered>
        <ModalHeader toggle={toggle}>
         <h3>Sin in</h3>
        
        </ModalHeader>
        <ModalBody>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" 
                       onChange={event =>
                         {
                            setEmail(event.target.value)
                            event.preventDefault();   
                         }
                      }/>
                    <Form.Text className="text-muted">
                                   We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                     <Form.Label>Password</Form.Label>
                     <Form.Control type="password" placeholder="Password"  onChange={event =>
                         {
                            setPassword(event.target.value)
                            event.preventDefault();   
                         }
                      } />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <NavLink  onClick={toggleNested}>Dont have account?</NavLink>
                </Form.Group>
                
            </Form>

          
          <Modal isOpen={nestedModal} toggle={toggleNested} onClosed={closeAll ? toggle : undefined} centered>
            <ModalHeader>Create Account</ModalHeader>
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
              <Button color="primary" onClick={toggleNested}>Back</Button>{' '}
              <Button color="secondary" onClick={sinup}>Create Account</Button>
            </ModalFooter>
          </Modal>
        </ModalBody>
        <ModalFooter>
          <LoadingMask loading={loadingSpinner} text={"loading..."}>
             <div style={{ width: 50, height: 40 }}></div>
          </LoadingMask>
          <div>{erroMeeage}</div>
          <Button color="primary" onClick={login}>Login</Button>{' '}
          <Button color="secondary" onClick={toggle}>Back</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
  
}

export default LoginToAccount;