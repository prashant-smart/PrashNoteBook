import React from 'react'
import Login from './Login'
import Signup from './Signup'

const Login_SignUp = (props) => {
    return (
        <div className="container d-flex flex-wrap">
            <Login showAlert={props.showAlert}/>
            <Signup showAlert={props.showAlert}/>
        </div>
    )
}

export default Login_SignUp
