// single category card
import React from 'react'
import {Container, Grid , Image , Card , Icon} from 'semantic-ui-react'
import '../../css/category.css'
import {useHistory} from "react-router-dom"

export default function Category(props) {

  const history = useHistory()

    return (
        
<Grid.Column verticalAlign="middle" className="column " mobile={14} tablet={8} computer={4} >
        <div className="card-div" >
      <Card className="ui card category-card"  onClick={()=>history.push(`/Allquizes/${props.id}/${props.user._id}`)}>
          <Image id="category-img" src={props.image} />
          <Card.Content>
            <Card.Header className="header">{props.name}</Card.Header>
        
          </Card.Content>
        </Card>
        </div> 
       </Grid.Column> 
    )
}
