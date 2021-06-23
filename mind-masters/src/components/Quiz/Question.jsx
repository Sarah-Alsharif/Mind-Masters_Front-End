import React , {useState , useEffect} from 'react'
import {Form, Input , Icon , Button} from 'semantic-ui-react' 



export default function Question(props) {

    const[question , setQuestionInfo] = useState()
    const[inizilize , setInizilize] = useState({question: "" , firstAnswer: "" , secoundAnswer: "" , thirdAnswer: "" , correct: ""})
    const questionInfoFunc = (e) =>{
        let name = e.target.name
        let value = e.target.value
        setInizilize({... inizilize , [name] : value})
        console.log("from questionInfoFunc")
        props.setQuestionInfo({...props.questionInfo , [name] :value })         
      }


      const prevPage = () => {

        props.setIsEmpty(true)

      }
      const {questionInfo} = props
      console.log(questionInfo)
      for(let key in questionInfo){
        questionInfo[key] = questionInfo[key]?  questionInfo[key] : ""

      }


      useEffect(() => {

        if(Object.keys(questionInfo).length == 0)
          setInizilize({question: "" , firstAnswer: "" , secoundAnswer: "" , thirdAnswer: "" , corecct: ""})
  

      },[props.questionInfo])

      const current = props.current + 1;
    return (
         
        <div className="CreateQuestion-div">

            
            <Icon  labelPosition='left' onClick={() => prevPage()}  name='left arrow' />
            
            <h2 style={{textAlign: "center"}}>Question {current}of {props.formInfo.numberOfQuestion} question </h2>
        
            <Form.Field  inline width={15}>
            <label>Question{current}</label>
            <Input name="question"
            onChange={questionInfoFunc} 
            value = {inizilize.question}
            />
            </Form.Field>
            
            <Form.Field inline width={10} >
            <label>Answer 1</label>
            <Input name="firstAnswer"
            onChange={questionInfoFunc}
            value = {inizilize.firstAnswer}
            />
            </Form.Field>
            
            <Form.Field inline width={10}>
            <label>Answer 2</label>
            <Input name="secoundAnswer"
            onChange={questionInfoFunc}
            value = {inizilize.secoundAnswer}
            />
            </Form.Field>


            <Form.Field inline width={10}>
            <label>Answer 3</label>
            <Input name="thirdAnswer"
            onChange={questionInfoFunc} 
            value = {inizilize.thirdAnswer}
            />
            </Form.Field>
        

            <Form.Field inline width={10} >
            <label>Correct Answer</label>
            <Input name="corecct"
            onChange={questionInfoFunc}
            value = {inizilize.corecct}
            />
            </Form.Field>

        
        </div>
       
    )
}
