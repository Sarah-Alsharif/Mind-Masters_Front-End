import axios from 'axios'
import React , {useState} from 'react'
import 'semantic-ui-css/semantic.min.css'
import {Button} from 'semantic-ui-react'
import {Redirect} from "react-router-dom"
import {Form,Input} from 'semantic-ui-react-form-validator'
import swal from 'sweetalert'; 
import {useHistory} from "react-router-dom"
import '../../css/category.css'




export default function LoginForm(props) {

    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const history= useHistory() 

    
    const userLoginHandler =  (e) => {

        e.preventDefault()

        axios.post('http://localhost:4000/auth/login' , 
        {email: email , password: password})
        .then(response => {

            localStorage.setItem("token" , response.data.token)
            console.log(response.data.token)

            swal({
                icon: "success",
                text: response?.data.message ,
                timer:3000,
                buttons: false
            }).then(() => {
                props.loginFunction()
                history.push("/")
            })
        
            
        })
        .catch(error => {
            swal({
                icon: "error",
                text: error.response?.data.message,
                timer:3000,
                buttons: false
            })
        })
        
    }

    
    return ( 

    <div id="contentContainer">
     <Form useRef="form" onSubmit={(e) => userLoginHandler(e)}>
        
        <Input 
          type="text"
          label="E-Mail"
          onChange={(e)=>{setEmail(e.target.value)}} 
          value={email} 
          validators={['required' , 'isEmail']} 
          errorMessages={['You need to provide an email address' , 'The email address is not valid']} 
          width={20} 
        />

        <Input 
          type="password"
          label="Password"
          onChange={(e)=>{setPassword(e.target.value)}} 
          value={password} 
          validators={['required']} 
          errorMessages={['password cannot be empty']}
          width={20} 
        />

        <div className="btn-div">
            <Button  type='submit' className="ui button btn-style">Sign In</Button>
        </div>
        
     </Form>
    </div>

    )
}
