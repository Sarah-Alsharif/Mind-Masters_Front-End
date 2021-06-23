import {Container ,Grid} from 'semantic-ui-react'
import React ,{useState , useEffect} from 'react'
import axios from 'axios'
import swal from 'sweetalert'; 
import {useHistory , Link} from "react-router-dom"
import { useTimer } from 'react-timer-hook';
import CorrectAnswer from '../../sound/CorrectAnswer.mp3'
import WrongAnswer from '../../sound/WrongAnswer.mp3'
import ScoreBoard from '../ScoreBoard/ScoreBoard'


export default function Quiz(props) {


    const quizName = props.match.params.name
    console.log(`this is quiz name ${quizName}`)
    const quizId = props.match.params.id
    const userId = props.match.params.user
    const [allQuestions , setAllQuestions] = useState([])
    const [currantQuestion, setcurrantQuestion] = useState({})
    const [questionIndex, setQuestionIndex] = useState(0)
    const [allAnswers , setAllAnswers] = useState([])
    const [correctAnswer , setCorrectAnswer] = useState("")
    const [score , setScore] = useState(0)
    const [randomNumber , setRandomNumber] = useState([0 , 1 , 2 , 3])
    const history = useHistory()
    const [showScoreboard , setShowScoreboard] = useState()
    let array = randomNumber.slice();


    useEffect( ()=>{
      //Please change rout number
        axios.get(`http://localhost:4000/quiz/allQuestions/${quizId}`)
        .then(response => {
            
        setAllQuestions(response.data)
        setCurrent(response.data[0])
       
        })
        .catch(error => console.error(error))
    
    } , [])

    
    

    // sort Answers in random order
    const sortAnswers = (answersArray) => {
      
      let flag = true
      let elemntsArray = []
      let randomNum = Math.floor(Math.random() * 4)
      let i = 0

      while(flag){

        while((!(array.includes(randomNum))) && array.length != 0){

            randomNum = Math.floor(Math.random() * 4)
        }

        const elementIndex = array.indexOf(randomNum)
        array.splice(elementIndex , 1)

        if(array.length == 0){
            flag = false
            elemntsArray.push(answersArray[randomNum])
        }else{
            elemntsArray.push(answersArray[randomNum])
        }
       
      }
      return elemntsArray;

    } 



    const setCurrent = (Data) => {

        array = randomNumber.slice()
        setcurrantQuestion(Data)
        const answers = sortAnswers(Data.Incoreect.concat(Data.Coreect_Answer))
        setAllAnswers(answers)
        setCorrectAnswer(Data.Coreect_Answer)

    }


    const displayQuestion =(index)=>{
        
        setCurrent(allQuestions[index])
        console.log("display Qustion",index)
        
    }
    // method check score board and update top 10 
    const checkScore = (score) => {

        axios.post('http://localhost:4000/quiz/addScore' , {userId: userId , score: score , quizId: quizId})
        .then(response => {

        })
        .catch(error => {
            console.log(error)

        })

    }

    const NextQustion = async (answer) =>{

        const scoreCalculations = 10


        if(questionIndex + 1 < allQuestions.length){
            await setQuestionIndex(prevState => prevState + 1)
            console.log("next Qustion",questionIndex + 1)
            displayQuestion(questionIndex+1)
            if(answer == correctAnswer){
                console.log('correct')
                setScore(prevState => prevState + scoreCalculations)
            }
        }else{
            
            if(answer == correctAnswer){
                console.log('correct')
                await setScore(prevState => prevState + scoreCalculations)
            }
            
            swal(score +" points" , {
                title: "You Scored",

            }).then(() => {
                checkScore(score)
                setShowScoreboard(<ScoreBoard quizId={quizId} />)
                // history.push("/")

            })
           



        }   
 }


    return (
        
        <div id="background">

        {showScoreboard}
        <Container>
     
            <audio id="correct" src={CorrectAnswer}></audio>
            <audio id="wrong"  src={WrongAnswer}></audio>
            <h1 id="page-title">{quizName}</h1>

            <Grid centered columns={2} style={{margin:"5% auto"}}>

             <Grid.Column mobile={8} tablet={8} computer={8}>
             <div  style={{color:"white", textAlign:"center"}}>
             <h2>Time: </h2>
             </div>
             </Grid.Column>

             <Grid.Column  mobile={8} tablet={8} computer={8}>
             <div  style={{color:"white", textAlign:"center"}}>
             <h2>Score:{score}</h2>
             </div>
             </Grid.Column>

               <Grid className="question-grid">

              <Grid.Column  mobile={16} tablet={16} computer={16} >
                <div className="question-dev">
            <h1>{currantQuestion?.Question}</h1>
                </div>
               </Grid.Column>

               <Grid.Row centered columns={5} className="answer-row">

                {allAnswers.map((answer) => {
                   
                   return <Grid.Column mobile={16} tablet={8} computer={8}>
                    <div className="choices" onClick={(e) => NextQustion(answer,e)}>
                            <h2>{answer}</h2>
                        </div>
                    </Grid.Column>;

                })}

              </Grid.Row>

              </Grid>

            </Grid>


         </Container>

         </div>
    )
    
}


