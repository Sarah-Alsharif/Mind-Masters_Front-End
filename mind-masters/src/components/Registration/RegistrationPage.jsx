import React from 'react'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'
import {useState} from 'react'
import { Grid, Menu } from 'semantic-ui-react'
import {BrowserRouter  , Link} from 'react-router-dom'
import '../../css/register.css'

export default function RegistrationPage(props) {

    const [content , setContent] = useState(<LoginForm loginFunction={props.loginFunction}/>)
    const [activeItem , setActiveItem] = useState('Signin')
   

    const handleLoginClick = (event) => {

        setContent(<LoginForm loginFunction={props.loginFunction}/>)
        setActiveItem('Signin')
    }

    const handleSignupClick = (event) => {

        setContent(<RegisterForm/>)
        setActiveItem('Signup')
        
    }

    return (
        <div>

        
        <Grid  centered columns={1} style={{ height: '100vh'}} verticalAlign='middle'>

            
            <Grid.Column id="RegistrationGridCoulmn" centered columns={2} style={{maxWidth: 450 , background: 'white'}}>
                <Menu id="menu" tabular widths={2} >
                   
                    <Menu.Item
                    name='Sign in'
                    active={activeItem === 'Signin'}
                    onClick={(event) => handleLoginClick(event)}
                    >
                    </Menu.Item>

                    <Menu.Item
                    name='Sign up'
                    active={activeItem === 'Signup'}
                    onClick={(event) => handleSignupClick(event)}
                    >
                    </Menu.Item>

                </Menu>    

                <div id="contentContainer">{content}</div>  
            
            </Grid.Column>

        </Grid>
          

        </div>
    )
}
