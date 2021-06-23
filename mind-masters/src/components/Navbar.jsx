import React , {useState , useEffect} from 'react'
import '../css/nav.css'
import { Dropdown, Icon , Sidebar , Menu, Segment } from 'semantic-ui-react'
import {BrowserRouter, Link} from "react-router-dom";
import {useHistory} from 'react-router-dom'


export default function Navbar(props) {

    const history = useHistory()
    const [homeClass , setHomeClass] = useState("active")
    const [categorysClass , setCategorysClass] = useState("")
    const [quizesClass , setQuizesClass] = useState("")
    // const [

    

    const trigger = (
          <span style={{color:"#a77cf2"}}>
            <Icon  name='user' /> Hello, {props.user.firstName}
          </span>
        )
        
    const options = [
          {
            key: 'user',
            text: (
              <span style={{color:"#a77cf2"}}>
                Signed in as <strong>{props.user.firstName} {props.user.lastName}</strong>
              </span>
            ),
            disabled: true,
          },
          { text:  <Link  to="/profile"><Icon name='user' />Profile</Link>},
          { text: <Link onClick={(e) => signOut()}><Icon name='log out' />Sign Out</Link>},
        ]  
  

    const signOut = () => {

      localStorage.removeItem('token')

      history.push('/')
    

    }    
     
    
    const handleItemClick = (className) => {

      if(className == 'home'){

        setHomeClass("active")
        setCategorysClass("")
        setQuizesClass("")

      }else if(className == 'categorys'){

        setHomeClass("")
        setCategorysClass("active")
        setQuizesClass("")

      }else{

        setHomeClass("")
        setCategorysClass("")
        setQuizesClass("active")

      }

    }


    return (
      
        
      <div className="ui menu nav-div">

        <div className={`${homeClass} item nav-item`} onClick={(e) => handleItemClick('home')}>
        <Link className="nav-link" to="/">Home</Link>
        </div>

        <div className={`${categorysClass} item nav-item`} onClick={(e) => handleItemClick('categorys')}>
        <Link className="nav-link" to="/Categorys">Categories</Link>
        </div>

        <div className={`${quizesClass} item nav-item`} onClick={(e) => handleItemClick('quizes')}>
        <Link className="nav-link" to="/contact">Quizes</Link>
        </div>

        <div className="right menu">

        <div className="ui item nav-item">
        {props.user.email ?
         <Dropdown style={{color:"#a77cf2"}} inline trigger={trigger} options={options}/>
        :
        <div ><Link to="/RegistrationPage">Sign in</Link></div>
        }

          </div>

        </div>
     
       
           
        

      

      </div> 

      

 
    )
}
