import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { get_user } from '../../ducks/reducer';

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

    customLogin() {
        const { username, pass } = this.state
            , { get_user, history } = this.props;

        axios.post('/api/log_in', {username: username, pass: pass}).then( res => {
            console.log('Login results: ', res.data);
            if(res.data === 'Invalid credentials') {
                alert('Invalid credentials')
                this.setState({
                    username: '',
                    pass: ''
                })
            } else {
                get_user(res.data);
                history.push('/altprof')

            }
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
                <a href={REACT_APP_LOGIN}>
                    <button>LOGIN</button>
                </a>
                <hr/>
                <label>Username: </label>
                <input name="username" value={ username } onChange={ e => this.handleInput(e) }/>
                <br/>
                <label>Password</label>
                <input name="pass" type="password" value={ pass } onChange={ e => this.handleInput(e) }/>
                <button onClick={ () => this.customLogin() }>Custom Login</button>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, { get_user })(withRouter(Auth));