import React  from 'react'
import {Redirect, Route} from "react-router-dom"
export default function Protect({component: Component , isLogin ,path , ...rest} ) {
    return (
        <>
        <Route exact path={path}
        render = {() => isLogin ? <Component {...rest} />  : <Redirect to="/RegistrationPage" /> }
            />
        </>
    )
}