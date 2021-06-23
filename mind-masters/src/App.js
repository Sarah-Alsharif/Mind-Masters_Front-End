import './App.css';
import { Route , Switch} from 'react-router-dom'
import {useEffect, useState} from "react"
import { isExpired, decodeToken } from "react-jwt";
import RegistrationPage from './components/Registration/RegistrationPage'
import Categories from './components/Categories/Categories'
import Quiz from './components/Quiz/Quiz' 
import CreateQuiz from './components/Quiz/CreateQuiz'
import Allquizes from './components/Quiz/Allquizes'
import Home from './components/home/Home'
import Footer from './components/Footer';
import Navbar from './components/Navbar'
import Protect from './components/Protect'
import './css/style.css'
import Profile from './components/Profile/Profile'
import ScoreBoard from './components/ScoreBoard/ScoreBoard';
import MyQuizzes from './components/Profile/MyQuizzes'





function App() {

  const [user , setUser] = useState({})
  const [isLogin , setIsLogin] = useState(false)
  const [isLoading , setIsLoading] = useState(false)


  useEffect(()=> {
    loginFunction()
  } , [])

 
  const loginFunction = () =>{
    let token = localStorage.getItem("token")
    let decodeuser = decodeToken(token)
    if (decodeuser?.user && !isExpired(token) ){
      setUser(decodeuser.user)
      setIsLogin(true)
      setIsLoading(true)
    } else {
      setUser({})
      setIsLogin(false)
      setIsLoading(true)
    }
  }

  const logoutFunction = () => {

    localStorage.removeItem('token')
    setIsLogin(false)
    setIsLoading(false)

  }

 

return (
  <>

    <div>
       

      <Navbar user={user} logoutFunction={logoutFunction}/>
    <Switch>

        <Route exact path={"/"} render={() => <Home user={user}/>}/>
        <Route exact path='/RegistrationPage' render={() => <RegistrationPage loginFunction={loginFunction} />}/>
        <Route exact path='/Categorys' render={() => <Categories user={user}/>} />
        <Route exact path='/quiz/:id/:user/:name' component={Quiz}/>
        <Route exact path='/Allquizes/:id/:user' component={Allquizes}/>
        <Route exact path='/CreateQuiz' render={() => <CreateQuiz user={user}/>}/>
        <Route exact path='/Profile' render={() => <Profile setUser={setUser} user={user} loginFunction={loginFunction} />}/>
        <Route exact path='/scoreboard' component={ScoreBoard}/>
        <Route exact path='/MyQuizzes' component={MyQuizzes}/>
        {isLoading && <Protect component={Profile} path={"/profile"} isLogin ={isLogin} user ={user} loginFunction={loginFunction} />}

        </Switch>

    </div>
 
   </>

  )
}

export default App;
