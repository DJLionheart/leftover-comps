import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const {
    REACT_APP_LOGIN,
    REACT_APP_REGISTER,
    REACT_APP_PROF
} = process.env;

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            pass: ''
        }
    }

    handleInput(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    login() {
        const { username, pass } = this.state
            , { history } = this.props

        axios.post(REACT_APP_LOGIN, {username, pass}).then( res => {
           if(res.data) {
              history.push(REACT_APP_PROF)  
           } else {
               alert('Those credentials are invalid')
           }  
        })

    }



    render() {
        const { username, pass } = this.state;

        return(
            <div>
                <h1>VG Shrine</h1>
                <h2>Reminisce about the games you love!</h2>
                <p>Username: </p>
                <input name="username" value={ username } onChange={ e => this.handleInput(e)}/>
                <p>Password: </p>
                <input type="password" name="pass" value={ pass } onChange={ e => this.handleInput(e)}/>
                <br/>
                <Link to="/profile"><button>Log In</button></Link>
                <hr/>
                <button>Register</button>
            </div>
        )
    }
}

export default Auth;