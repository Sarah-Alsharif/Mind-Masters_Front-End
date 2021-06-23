import React, { useState, useEffect } from 'react'
import { Container, Grid, Form, Input, Button } from 'semantic-ui-react'
import Question from './Question'
import axios from 'axios'
import '../../css/category.css'
import {useHistory} from "react-router-dom"
import QuizInfo from './QuizInfo'


export default function CreateQuiz(props) {

  const history = useHistory()

  const [newQuestion, setnewQuestion] = useState([])
  const [allCategory, setAllCategory] = useState([])
  const [categoryName, setCategoryName] = useState()
  const [formInfo, setFormInfo] = useState({})
  const [isEmpty , setIsEmpty] = useState(true)
  const [questionInfo, setQuestionInfo] = useState({})
  const [array, setArray] = useState([]);
  const [current, setCurrent] = useState(0)
  const [changeButton , setChangeButton] = useState(true)



  // submit the form 
  const onFormSubmit = (e) => {

    e.preventDefault()
    axios.post("http://localhost:4000/quiz/addQuiz",{quizInfo:formInfo , questions:array , userEmail:props.user.email})
    .then(response => {
         
    })
    .catch(error => console.error())
  }


  const nextQuistion = async (e) => {
     
    e.preventDefault()
    console.log("form info = ",formInfo) 
    console.log('num of q = ' , formInfo.numberOfQuestion) 

    let num = parseInt(formInfo.numberOfQuestion)
    if(current < num){
      console.log(current)
      if (current == array.length) {

        await setArray(array =>  {
          let newArray = [...array , questionInfo] 
          setCurrent(newArray.length)
          setQuestionInfo({})
        return newArray })

      } else {
          setQuestionInfo({})
          let i = current;
          i = i+1;
          setQuestionInfo(array[i - 1])
          setCurrent(prevState => prevState + 1)
        
      }
    }else{
      setChangeButton(false)
    }

  }


  console.log("array" , array)
  console.log("current", current)

  const prevQuistion = (e) => {

    e.preventDefault()

    if (current > 1) {
      let i = current ; 
      i = i-1;
      setQuestionInfo(array[i - 1])
      setCurrent(prevState => prevState - 1)
      setChangeButton(true)

    }

  }


  const categorysName = [...new Set(allCategory.map((ele) => ele.categoryName))]
  const categoryNameArray = []

  for (let i = 0; i < categorysName.length; i++) {

    categoryNameArray.push({ text: categorysName[i], value: categorysName[i] })
  }

  const options = [
    { text: 'Easy', value: 'Easy' },
    { text: 'Medum', value: 'Medum' },
    { text: 'Hard', value: 'Hard' },
  ]


  return (
    <div >

      <h1 id="page-title">Cteate New Quiz</h1>

      {isEmpty?
      <QuizInfo formInfo={formInfo} setFormInfo={setFormInfo} isEmpty={isEmpty} setIsEmpty={setIsEmpty}/>

      :
      <Container>

        <Grid centered columns={2}>
          <Grid.Column mobile={16} tablet={16} computer={8}>

            <Form  onSubmit={(e) => { (onFormSubmit(e)) }}>

          
              <Question formInfo={formInfo} isEmpty={isEmpty} setIsEmpty={setIsEmpty} current={current} 
              setQuestionInfo={setQuestionInfo} questionInfo={questionInfo} ></Question>
           

              <div>
                {/*<Button onClick={(e)=>{addNewQuistion(e)}} floated='left'>Add Question</Button>*/}

                <Button className="btn-style" onClick={(e) => { prevQuistion(e) }} floated='left'>Previous</Button>
                {changeButton?
                <Button className="btn-style" onClick={(e) => { nextQuistion(e) }}  floated='right' >Next</Button>
                :
                <Button className="btn-style"  type="submit" floated='right'>Save</Button>
                }          
              </div>
             
            </Form>
          </Grid.Column>
        </Grid>
     

      </Container>

      }
    </div>


  )
}
