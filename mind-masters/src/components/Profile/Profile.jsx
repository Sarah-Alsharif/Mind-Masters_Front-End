import React, { useState, useEffect } from 'react'
import {Container , Grid , Image , Button , Form , Header  , Card} from 'semantic-ui-react'
import axios from 'axios'
import '../../css/style.css'
import UploadImg from './UploadImg'
import MyQuizzes from './MyQuizzes'



export default function Profile(props) {

    const userId = props.user._id
    const [myQuizzes , setmyQuizzes] = useState([])
    const [userImg , setUserImg] =  useState(props.user.profileImg)
  
    useEffect(()=>{
      axios.get(`http://localhost:4000/auth/myQuizzes/${userId}`)
      .then(data => {
        setmyQuizzes(data.data)

      })
      .catch(error => console.error(error))
      } , [myQuizzes])

    
       return (
      <Container>
       
     <Grid  centered columns={3} style={{marginTop:"40px"}}>
         {/* user Info */}
         <Grid.Row style={{ backgroundColor:"white" , borderRadius:"10px"}}>
             <Grid.Column className="profileImg-col" mobile={16} tablet={16} computer={6}>
              <Image className="profile-img" src={userImg}/> 
                 
                 <UploadImg setUser={props.setUser} userImg={userImg} setUserImg={setUserImg} loginFunction={props.loginFunction} userId={userId}></UploadImg>
                
             </Grid.Column>


            <Grid.Column className="profileInfo-col" mobile={16} tablet={16} computer={9}>
                
               {/*personal info */}
               <Form className="ui form">
                <Form.Group  className="equal width fields" widths='equal'>
                <Form.Input
                
                 fluid
                 value ={props.user.firstName}
                 name="firstName"
                 label='First name'/>

                <Form.Input
                
                fluid
                value ={props.user.lastName}
                name="lastName"
                label='Last name'/>

              </Form.Group>
              </Form>
              

             {/* password*/ }
            <Grid.Column className="passwordChange-col" mobile={16} tablet={8} computer={4}>

             <Form className="ui form">
             <Form.Group  className="equal width fields "widths='equal'>
             <Form.Input
             fluid
             value ={props.user.password}
             id='form-subcomponent-shorthand-input-first-name'
             label='Password'/>
           
            </Form.Group>
            <Button className="profile-boutton"> Change password </Button>
            </Form>
            </Grid.Column>
         </Grid.Column>
            </Grid.Row>

          {/* user quiz*/}
          <Grid.Row  style={{ backgroundColor:"white" , marginTop:"20px" , borderRadius:"10px"}}>
          <Grid.Column mobile={16} tablet={16} computer={16}>
          <Header id="header-1" className="ui center aligned header" as='h2' textAlign='center'>My Quizzes</Header>
          </Grid.Column>

   
          {
            myQuizzes.map((quiz, i) => <MyQuizzes
            
            key={i} 
            name={quiz.quizeName}
            id = {quiz._id} 
            userId = {userId} 
            setmyQuizzes = {setmyQuizzes}
           

      />)}
      

     

        </Grid.Row>

        </Grid>
        </Container>
    )
}


