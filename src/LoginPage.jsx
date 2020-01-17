import React, {Component} from 'react'
import Login from './Login.jsx'
import Register from './Register.jsx'

class LoginPage extends Component{
    render = () => {    
        return (<div>
            <Login/>
            <Register/>
        </div>)
    }
}


export default LoginPage