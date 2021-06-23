import React from 'react'
import { Grid , Card} from 'semantic-ui-react'
import '../../css/style.css'
import axios from 'axios'
import swal from 'sweetalert'; 

export default function MyQuizzes(props) {

    const quizId = props.id
    const userId = props.userId

    const deleteQuiz = (e) =>{
        axios.post(`http://localhost:4000/quiz/deleteQuiz/` , {quizId: quizId})
        .then(data => {
          swal({
            icon: "success",
            text: data?.data.message ,
            timer:3000,
            buttons: false
        })
           
          axios.get(`http://localhost:4000/auth/myQuizzes/${userId}`)
          .then(data => {
            props.setmyQuizzes(data.data)
    
          })
       
        })
        .catch(error => console.error(error))
    }

    return (
        <Grid.Column centered mobile={16} tablet={8} computer={4} style={{marginTop:"20px"}}>
                           
        <div className="card-div">
         <Card className="ui card userQuiz-card" >
         <Card.Content>
         <Card.Header className="header quiz-name">{props.name}</Card.Header>
         <Card.Description className="description">
         <button className="btn-style">Score</button>
         <button className="delete-btn" onClick={(e) =>{ deleteQuiz(e)}} >Delete</button>
         </Card.Description>
        </Card.Content>
        </Card>
        </div> 
        </Grid.Column>
    )
}
