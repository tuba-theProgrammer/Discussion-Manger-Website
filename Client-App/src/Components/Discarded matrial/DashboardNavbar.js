import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import LoginToAccount from '../LoginToAccount'
import SinUpToAccount from '../SinUpToAccount'
import {Route,Link} from 'react-router-dom'
import {Navbar,Nav,NavDropdown,button} from 'react-bootstrap'
import Avatar from 'react-avatar';
import styles from './mystyle.module.css'; 
function DashboardNavbar()
{
    return(

    <Navbar collapseOnSelect expand="lg" className="bg-dark " variant="dark">
        <Navbar.Brand href="#home"><div className={styles.navBrandDashBoard}>Discussion Manager</div></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            
          </Nav>
          <Nav>
            
            
            <Nav.Item><button type="button" class="btn btn-outline-light mr-2" to="/webMainHomePage">About</button></Nav.Item>  
            <Nav.Item><button type="button" class="btn btn-outline-light mr-2" to="/webMainHomePage">Get App</button></Nav.Item>  
            <Nav.Item><button type="button" class="btn btn-outline-light mr-2" to="/webMainHomePage"> Forum</button></Nav.Item>  
            <Nav.Item><Avatar name="Zeeshan" size="40" /></Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
}

export default DashboardNavbar