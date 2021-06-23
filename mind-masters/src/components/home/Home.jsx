import React from 'react'
import { Grid} from 'semantic-ui-react'
import {useHistory} from "react-router-dom"

export default function Home(props) {
   
  const history = useHistory()

    return (
       

        <Grid centered columns={2} style={{margin:"14%"}} >
        <Grid.Column  mobile={16} tablet={16} computer={10}>
        <div className="home-content">
            <h1 className="home-title">Mind Masters</h1>

          <div class="btn-div">
            <button className="btn-style">Take A Quiz</button>
            {props.user.email ?
            <button className="btn-style"  onClick={()=>history.push(`/CreateQuiz`)}>Create Quiz</button>
            :
            <button className="btn-style"  onClick={()=>history.push(`/RegistrationPage`)}>Create Quiz</button>
            }
          </div>
        </div>
        </Grid.Column>
        </Grid>  
        
    )
}
