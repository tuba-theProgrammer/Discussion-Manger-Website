import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Route,Link} from 'react-router-dom'
import {Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import Dashboard from './Components/Dashboard'

function UserMainDashBoard(){
    return(
        <Dashboard />
    )
}

export default UserMainDashBoard;