// single quiz card
import React from 'react'
import {Grid, Button , Card , Dropdown , Pagination} from 'semantic-ui-react' 
import '../../css/category.css'
import {useHistory} from "react-router-dom"


export default function SingleQuiz(props) {

    const history = useHistory();

    return (

      <Grid.Column verticalAlign="middle" className="column " mobile={14} tablet={8} computer={5} >
      <div className="card-div">
       <Card className="ui card category-card" onClick={()=>history.push(`/quiz/${props.id}/${props.userId}/${props.name}`)}>
        <Card.Content>
          <Card.Header className="header quiz-name">{props.name}</Card.Header>
          <Card.Description className="description">
          <p>{props.difficultyLevel}</p>
          <p>{props.NumberOfQuestion} Qestions</p>
          </Card.Description>
        </Card.Content>
      </Card>
      </div> 
     </Grid.Column> 
      
    )
}
