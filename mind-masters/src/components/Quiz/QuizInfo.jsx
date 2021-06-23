import React, { useState, useEffect } from 'react'
import { Container, Grid, Form, Input, Button } from 'semantic-ui-react'
import axios from 'axios'
import '../../css/category.css'
import {useHistory} from "react-router-dom"


export default function QuizInfo(props) {

    const history = useHistory()

    const [allCategory, setAllCategory] = useState([])
   
    const formChangeHandler = (e, data) => {
        console.log("from target")
        props.setFormInfo({ ...props.formInfo, [data.name]: data.value })
      } 


    useEffect(() => {
      axios.get("http://localhost:4000/category/AllCategory")
        .then(response => {
          setAllCategory(response.data.allCategory)
        })
        .catch(error => console.error(error))
    }, [])

  
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

    
  // submit the form 
  const onFormSubmit = (e) => {
  
     props.setIsEmpty(false)

  }


    return(

        <Form onSubmit={(e) => { (onFormSubmit(e)) }}>

       
               <Grid  centered columns={1}>
                   
               <Grid.Row>
               <Grid.Column mobile={10} tablet={6} computer={6} >
                <Form.Input 
                  fluid label='Quiz name'
                  name='quizName'
                  onChange={formChangeHandler}/>
                </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                <Grid.Column mobile={10} tablet={6} computer={6}  >
                 <Form.Select fluid
                  label='Difficulty level'
                  name='difficultyLevel'
                  options={options}
                  placeholder='level'
                  onChange={formChangeHandler} />
                 </Grid.Column>
                 </Grid.Row>
                 
                 <Grid.Row>
                 <Grid.Column mobile={10} tablet={6} computer={6} >
                 <Form.Select fluid
                  label='Category Name'
                  options={categoryNameArray}
                  placeholder='level'
                  name='categoryName'
                  onChange={formChangeHandler} />
                  </Grid.Column>
                  </Grid.Row>
            
                  <Grid.Row>
                <Grid.Column mobile={10} tablet={6} computer={6} >
                 <Form.Input 
                  fluid label='Number of question'
                  name='numberOfQuestion'
                  onChange={formChangeHandler} />
                  </Grid.Column>
                  </Grid.Row>
             
                <Grid.Row >
                 <div className="btn-div">
                <Grid.Column mobile={10} tablet={6} computer={6}>
                <Button className="ui button btn-style" type="submit" >Next</Button>
                </Grid.Column>
                </div>
                </Grid.Row>
        
            
               </Grid>

        </Form>
     

    )

}
