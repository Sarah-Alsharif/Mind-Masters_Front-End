// all singleQuiz cards
import React ,{useState , useEffect} from 'react'
import axios from 'axios'
import {Grid, Button , Card , Dropdown , Pagination} from 'semantic-ui-react'
import SingleQuiz from './SingleQuiz'
import '../../css/category.css'


export default function Allquizes(props) {

    const categoryId = props.match.params.id
    console.log(categoryId)
    const [allQuizzes , setQuizzes] = useState([])
   
    useEffect( ()=>{
  
      axios.get(`http://localhost:4000/category/allQuizzes/${categoryId}`)
      .then(data => {
      setQuizzes(data.data)
  
      })
      .catch(error => console.error(error))
   
      } , [])

    
    return (
       <>
        <h1 id="page-title">All Quizzes</h1>
        <Grid  centered columns={5} style={{textAlign: "center" , marginTop: "40px",  position: "relative"}}>
        
          { allQuizzes.map((quiz , i) => <SingleQuiz
            
            key={i}
            id={quiz._id}
            name={quiz.quizeName}
            userId = {props.match.params.user}
            difficultyLevel= {quiz.difficultyLevel}
            NumberOfQuestion = {quiz.questions.length}

        />)}




       </Grid>
   
     </>
          
    )
}
