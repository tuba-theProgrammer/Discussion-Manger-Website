import React, { useState } from 'react';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import {NavBarData} from './NavBarData';
import {Image,FormControl,Button,Form,Dropdown,ButtonGroup} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import logo from './logo192.png'
import { IconContext} from 'react-icons';



function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>

        <div className='navbar'>
          {/* <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link> */}
          <Link>
               <img alt="panda" className="logo" src={logo} />
          </Link>

        {NavBarData.map((item, index) => {
              return (
                <Link key={index} className={item.cName} to={item.path} style={ index==0 ? {"margin-left":"20px"} : {}}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </Link>
              );
            })}
      <div style={{
          position: 'absolute',
          right: '10%',
       }}>
      <Form className="d-flex ms-4">
            <FormControl
            type="search"
            placeholder="Search"
            className="mr-2"
            aria-label="Search"
           />
        <Button variant="outline-success">Search</Button>

        </Form>
      </div>
        

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
      <Dropdown.Item href="#/action-1" active>
        Action
      </Dropdown.Item>
      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item href="#/action-4">Separated link</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>

       </div>
      
    
        </div>
        
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}

          </ul>
        </nav>

      </IconContext.Provider>
    </>
  );
}

export default Navbar;
