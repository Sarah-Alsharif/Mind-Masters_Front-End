import React , {useEffect , useState} from 'react'
import { Button, Image, Modal ,Table ,Header, Grid ,Divided} from 'semantic-ui-react'
import '../../css/score.css'
import axios from 'axios'


export default function ScoreBoard(props) {
    const [open, setOpen] = React.useState(false)
    let counter = 1;
    const [scoreboard ,setScoreboard] = useState()
//<button class="ui button">Show Modal</button>

    useEffect(() => {

      axios.get(`http://localhost:4000/quiz/showScoreBoard/${props.quizId}`)
      .then(response => {

          setScoreboard(response.data)
          console.log(response.data)


      }).catch(error => {
          console.log(error)

      })

    }, [])


    return (
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >

   
   <Header id="h1-Score" as='h1'  textAlign='center' >Score Board <i class="trophy icon"></i></Header>
   
   <Grid  divided columns={3}>
      <Grid.Row centered columns={3}>

      <Grid.Column mobile={4} tablet={4} computer={4}>
      <Header as='h1' textAlign='center'>Rank</Header>  
      </Grid.Column>

      <Grid.Column mobile={5} tablet={4} computer={4}>
      <Header as='h1' textAlign='center'>Name</Header>  
      </Grid.Column>

     
      <Grid.Column mobile={4} tablet={4} computer={4}>
      <Header as='h1' textAlign='center'>Score</Header>  
      </Grid.Column>
    </Grid.Row>

    {
    
    scoreboard.map((record) => {

      <Grid.Row centered columns={3}>
      <Grid.Column mobile={5} tablet={8} computer={4}>
      <Header as='h1' textAlign='center'>{counter}</Header>  
      </Grid.Column>
      <Grid.Column mobile={4} tablet={8} computer={4}>
      <Header as='h1' textAlign='center'>{record.name}</Header>  
      </Grid.Column>
      <Grid.Column mobile={4} tablet={8} computer={4}>
      <Header as='h1' textAlign='center'>{record.score}</Header>  
      </Grid.Column>
      </Grid.Row>

      counter = counter + 1

    })

   

    }
    
    
  
   </Grid>


        <Modal.Actions>
          <Button id="Cancel" onClick={() => setOpen(false)}>Cancel</Button>
        
        </Modal.Actions>
      </Modal>
    )

}



 

