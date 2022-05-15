import 'bootstrap/dist/css/bootstrap.min.css'
import {Route,Link,useHistory} from 'react-router-dom'
import {Alert} from 'react-bootstrap'
import LoginToAccount from './LoginToAccount'
import styles from './mystyle.module.css'; 
function NewUserMainPage()
{
   return(
       <div fluid style={
           {
               marginTop:"18%",
              
           }
       }>
           <LoginToAccount  buttonLabel="Login" type="BodyLogin"/>
       </div>
    );

}

export default NewUserMainPage;