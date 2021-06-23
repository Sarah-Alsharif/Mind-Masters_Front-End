import React, { useState} from 'react'
import { Button, Modal , Form , Grid} from 'semantic-ui-react'
import '../../css/style.css'
import axios from 'axios'
import swal from 'sweetalert'; 

export default function UploadImg(props) {

    const [open, setOpen] = React.useState(false)
    const [temp , setTemp] = useState("")
    const userId = props.userId
  
    const formChangeHandler = (e) =>{
      console.log("from formChangeHandler")
      setTemp(e.target.value)
  }

 // https://i0.wp.com/newdoorfiji.com/wp-content/uploads/2018/03/profile-img-1.jpg?ssl=1
 // https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500

  // uplaod img
  const uploadImg = (e) =>{
      console.log(props.userImg)
      axios.post(`http://localhost:4000/auth/uploadImg`, {userId: userId , profileImg:temp})
      .then(data => {
           console.log(data)
           console.log("before")
           props.setUserImg(temp) 
           props.setUser({profileImg:temp}) 
         swal({
          icon: "success",
          text: data?.data.message ,
          timer:3000,
          buttons: false
      })

      })
      .catch(error => console.error(error))
  }


    return (
        
        <Modal style={{textAlign:"center"}}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button className="ui animated button btn-style"> upload img</Button>}
      >
        <Modal.Header >Upload Profile Image</Modal.Header>
           
           <Grid style={{margin:"15px"}} centered columns={2}>
              <Grid.Row>
                  <Grid.Column  mobile={16} tablet={8} computer={8}>

                  <Form className="ui form" onSubmit={(e) => { (uploadImg(e)) }} >
                <Form.Group  className="equal width fields" widths='equal'>
                <Form.Input
                 fluid
                 name="imgUrl"
                 onChange={formChangeHandler}
                 label='Img Url'/>
                 </Form.Group>
                 <Form.Button type="Submit" className="profile-boutton">Upload</Form.Button>
                 </Form>
                  </Grid.Column>
              </Grid.Row>
           </Grid>

           <Modal.Actions>
                <Button id="Cancel" onClick={()=> setOpen(false)}>Close</Button>
              </Modal.Actions>

           
      </Modal>
    )
}


