import React, { useState } from 'react';
import * as AiIcons from 'react-icons/ai';
import { Link ,useHistory} from 'react-router-dom';

import {NavBarData} from './NavBarData';
import {Image,FormControl,Button,Form,Dropdown,Alert} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import logo from './logo192.png'
import { IconContext} from 'react-icons';

function WebMainHomePageNavBar()
{
  const [sidebar, setSidebar] = useState(false);
  const [show, setShow] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const history = useHistory();
  function logOut()
  {
    localStorage.removeItem("userUid")
    localStorage.setItem("isLogedIn",false)
    history.push('/');
    window.location.reload();

  }
  
  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Alert.........!!!</Alert.Heading>
        <p>
          These options will be accessble to you after login. Please click manage button to login/create account
        </p>
      </Alert>
    );
  }

  function isLogeIn(e)
  {
    if(localStorage.getItem("isLogedIn")==null || localStorage.getItem("isLogedIn")==="false")
    {
      setShow(true)
      history.push('/');
      // window.location.reload();
    }
    
  }
  
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>

        <div className='navbar sticky-top'>
          {/* <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link> */}
          <Link>
               <img alt="panda" className="logo" src={logo} />
          </Link>

        {NavBarData.map((item, index) => {
              return (
                <Link key={index} className={item.cName} to={item.path} onClick={isLogeIn} style={ index==0 ? {"margin-left":"20px"} : {}}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </Link>
              );
            })}
     
        

       <div style={{
          position: 'absolute',
          right: '10px',
       }}>

    <Dropdown>

    <Dropdown.Toggle variant="outline-dark" >
    <Image src={logo}  style={{
                                     marginRight:"25px",
                                     borderWidth: 3,
                                     borderColor: "red",
                                     borderRadius: "60%",
                                     height:"40px",
                                     width:"40px"
                                  }} 
                                  
        />
    </Dropdown.Toggle>

    <Dropdown.Menu >
      <Dropdown.Item href="#/action-1" onClick={logOut} active>
        Log out
      </Dropdown.Item>
      </Dropdown.Menu>
      </Dropdown>

       </div>
      
    
        </div>
        
        
      </IconContext.Provider>
    </>
  );
}

export default WebMainHomePageNavBar