import React from 'react';
import axios from 'axios';

const {
    REACT_APP_LOGIN,
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
        // const { username, pass } = this.state;

        return(
            <div>
                <h1>VG Shrine</h1>
                <h2>Reminisce about the games you love!</h2>
                <a href={REACT_APP_LOGIN}>
                    <button>LOGIN</button>
                </a>
            </div>
        )
    }
}

export default Auth;