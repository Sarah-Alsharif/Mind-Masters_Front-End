import React ,{useState , useEffect} from 'react'
import {Container, Grid , Image , Card , Icon} from 'semantic-ui-react'
import Category from './Category'
import '../../css/category.css'
import axios from 'axios'



export default function Categories(props) {

  const [category , setCategory] = useState([])
  
  useEffect(()=>{
   
  axios.get("http://localhost:4000/category/AllCategory")
  .then(data => {
    setCategory(data.data.allCategory)
  })
  .catch(error => console.error(error))
  } , [])

    return (
  
      <div>
      <Container id="category-container">
      <h1 id="page-title">All Categorys</h1>

      <Grid centered columns={5} style={{ marginTop:"40px"}}>
      
     {
      category.map((c , i) => <Category
            
            key={i} 
            name={c.categoryName}
            id = {c._id}
            user={props.user}
            image={c.categoryImage}

      />)}

    </Grid>
    </Container>

</div>
 
    )
}
