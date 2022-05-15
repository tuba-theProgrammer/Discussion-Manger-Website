import React,{useEffect,useState} from "react";
import { Router,Link } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Row,Col,Form,Nav,Dropdown,Image } from 'react-bootstrap'
import PostsList from './postLists'
import profile_image from './default_image.png'
import "react-loadingmask/dist/react-loadingmask.css";
import LoadingMask from "react-loadingmask";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {storage} from './FirebaseInitializer'
import connectionUrl from './ConnectionUrl'
const Home = props => {
  
    const [modal, setModal] = useState(false);

    const {
        className,
        type
      } = props;
      const [mediaImage,setmediaImage]=useState(profile_image) 
    const [Title, setTitle] = useState('')
    const [Description, setDescription] = useState('')
    const [mediaType,setMediaType]=useState("Image")
    const [erroMeeage, setErroMeeage] = useState('');
    const [loadingSpinner, setloadingSpinner] = useState(false);
    const [serverResponse,setServerResponse]=useState()
    const [postField,setpostField] =useState(
      <div>
         <Form.Label style={{
                    fontSize:"30px",
                    marginTop:"5%",
                    borderStyle: 'solid',
                    borderColor:'rgb(201, 164, 164)',
                    borderWidth: "5px",
                    height:"70%",
                    width:"100%"  
                }}>Attach file here</Form.Label>
        </div>
    )
    
    const toggle = ()=>{
      setServerResponse("")
        setModal(!modal)
        console.log(modal)
      }
      
      const [imageFile,setImageFile]=useState()
      
      function setFile(e)
      {
          
          setImageFile(e.target.files[0])
      }

      function uploadData(e) {
        if(imageFile)
        {
          const image = imageFile
          const uploadTask = storage.ref(`postImages/${image.name}`).put(image);
          uploadTask.on(
            "state_changed",
            snapshot => {
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              
            },
            error => {
              console.log(error);
            },
            () => {
              storage
                .ref("postImages")
                .child(image.name)
                .getDownloadURL()
                .then(url => {
  
                  // here we will call the api
                  let data ={
         
                    authotUserUid:localStorage.getItem("userUid"),
                    postTitle:Title,
                    postContent:url,
                    postDesc:Description,
                    postType: mediaType,
                    postUploadTime:Date().toLocaleString(),
                    postUploadDate:new Date()
                   }
                  fetch(`${connectionUrl}/postsServices/addPost`,
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
                   console.log(error)
                  }
              
                  ).then(data=>{
                      console.log(data)
                      setServerResponse(data.responseMessage)
                  })
  
                });
            }
          ); 
        }
        else
        {
          setServerResponse("Please select file")
        } 
        }
     
     

      
      let btn =    <Nav.Item><button  className="btn btn-outline-light mr-2" onClick={toggle}>Upload New Post</button></Nav.Item>  
      console.log(type)
      if(type==="NavBar")
      {
        btn =  <Nav.Item><button  className="btn btn-outline-light mr-2" onClick={toggle}>Upload New Post</button></Nav.Item>
      }
    
   
    return (
        <div>        
        {/* //    Here we will call the components. */}
        <Row>
            <Col md={2}>
                {/* <h3>For latest news may be</h3> */}
            </Col>
            <Col md={8}>
                <div style={
                    {
                        color:"white",
                        fontSize:"40px",
                        textAlign:"left",
                        marginLeft:"10%",
                        marginTop:"5%"
                    }
                }>
                    News 
                </div>
                <PostsList />
            </Col>
            <Col md={2}>

              {/* ------------------------------------- Upload Post -------------------------------- */}
            <div>
      {btn}
      <Modal isOpen={modal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
        toggle={toggle} className={className}  centered>
        <ModalHeader toggle={toggle}>Add Post</ModalHeader>
        <ModalBody>

          <Form>
             <Form.Group controlId="formBasicEmail">
                 <Form.Label>Title:</Form.Label>
                <Form.Control type="text" placeholder="Enter Title" onChange={event =>
                {
                  setTitle(event.target.value)
                  event.preventDefault();   
                }
                }  />

                <Form.Label>Description:</Form.Label>
                <Form.Control type="text" placeholder="Post description" size="lg"  style={{
                     width:"465px",
                     height:"150px" 
                }}onChange={event =>
                {
                  setDescription(event.target.value)
                  event.preventDefault();   
                }
                }  />
         <Row>
           <Col md={6}>
           {postField}
           </Col>
           <Col md={6}>

        <Row>
        <Dropdown>
  <Dropdown.Toggle variant="dark" id="dropdown-basic" style={{
            marginTop:"10%",
  }}>
    Select Media Type
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="#/action-2" onClick={() => {
          setMediaType("Image");
          setpostField(
            <div>
            <Image 

style={
  {
    height:"180px",
    width:"180px"
  }
}

src={mediaImage} roundedCircle />
</div>
          );
        }}>Images</Dropdown.Item>
    <Dropdown.Item href="#/action-3"  onClick={() => {
          setMediaType("File");
          setpostField(
            <div>
             <Form.Control type="text" placeholder="loaded file" size="lg"  style={{
                     marginTop:"5%",
                     width:"180px",
                     height:"180px" 
                }
                }  />
</div>
          );
        }}>Files</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
        </Row>
        <Row>
           <input type="file"  style={{
            marginTop:"10%",
            color:"black",
     
        }}
        onClick={setFile} /> 
        
        </Row>
           </Col>
           </Row>
              </Form.Group> 
          </Form>

        </ModalBody>
        <ModalFooter>
          <LoadingMask loading={loadingSpinner} text={"loading..."}>
              <div style={{ width: 50, height: 40 }}></div>
          </LoadingMask>
          <div>{erroMeeage}</div>
          <Button color="primary" onClick={toggle}>Back</Button>{' '}
            <Button color="secondary" onClick={uploadData}>Post</Button>
            <br></br>
            {serverResponse}
        </ModalFooter>

      </Modal>
    </div>
           </Col>
           

        </Row>
    
        </div>
        );
  };
  export default Home
