import React, { Component } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { get_user, log_out } from '../../ducks/reducer';

class NavBar extends Component {
    constructor() {
        super();
        this.state = {
            posts: []
        }
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        axios.get('/api/user').then( res => {
            console.log('Get user deets: ', res.data)
            this.props.get_user(res.data);

        }).catch(err => console.log('Get user error: ', err))
    }

    logout() {
        axios.get('/api/auth/logout').then( () => {
            this.props.log_out()
            this.props.history.push('/')
        })
    }

    render() {
        return(
            <div>
                <h1>Nav Bar</h1>
                <h2>Welcome, { this.props.user.username }</h2>
                <Link to="/profile"><button>Profile</button></Link>
                <Link to="/posts"><button>Post List</button></Link>
                <button onClick={ this.logout }>Logout</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default withRouter(connect(mapStateToProps, { get_user, log_out })(NavBar));