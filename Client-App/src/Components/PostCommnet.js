import React,{useState} from "react";
import { Router,Link } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Modal,Button,Form} from 'react-bootstrap'

function PostCommnet(props) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    console.log(props.postId)

    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Post a Commnet 
        </Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Post a comment for this post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
                    
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                    
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary">Post it</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
  export default  PostCommnet
