import {useState , useEffect} from 'react'
import 'semantic-ui-css/semantic.min.css'
import {Button} from 'semantic-ui-react'
import {Form,Input} from 'semantic-ui-react-form-validator'
import axios from "axios"
import swal from 'sweetalert'; 
import {useHistory} from "react-router-dom"
import '../../css/category.css'


export default function RegisterForm() {

    const [firstName , setFirstName] = useState("")
    const [lastName , setLastName] = useState("")
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const [confirm , setConfirm] = useState(""); 
    const history= useHistory() 

    
    const userOnsubmitHandler =  (e) => {
   

        e.preventDefault()

        console.log({email: email, firstName: firstName , lastName : lastName , password : password})

        axios.post('http://localhost:4000/auth/register' , 
        {email: email, firstName: firstName , lastName : lastName , password : password})
        .then(response => {

            swal({
                icon: "success",
                text: response?.data.message ,
                buttons: false ,
                time:3000
            })

            history.push('/RegistrationPage')
            
        }).catch(error => {

            swal({
                icon: "error",
                text: error.response?.data.message ,
                buttons: false ,
                time:3000
            })
        
        })
        
    }

    return (

    <div id="contentContainer">
     <Form  useRef="form" onSubmit={(e) => userOnsubmitHandler(e)} >


        <Input 
          type="text"
          label ="E-Mail"
          onChange={(e)=>{setEmail(e.target.value)}} 
          value={email} 
          validators={['required' , 'isEmail']} 
          errorMessages={['You need to provide an email address' , 'The email address is not valid']} 
          width={20} 
        />

        <Input 
          type="text"
          label="First Name"
          onChange={(e)=>{setFirstName(e.target.value)}} 
          value={firstName} 
          validators={['required']} 
          errorMessages={['First name cannot be empty']}
          width={20} 
        /> 

        <Input 
          type="text"
          label="Last name"
          onChange={(e)=>{setLastName(e.target.value)}} 
          value={lastName} 
          validators={['required']} 
          errorMessages={['Last name cannot be empty']}
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
        <Input 
          type="password"
          label="Confirm Password"
          onChange={(e)=>{setConfirm(e.target.value)}} 
          value={confirm} 
          validators={['required']} 
          errorMessages={['First name cannot be empty']}
          width={20} 
        />           
           
     
        <div className="btn-div">
            <Button type='submit' className="ui button btn-style">Sign Up</Button>
        </div>

     </Form>
    </div>

    )
}
