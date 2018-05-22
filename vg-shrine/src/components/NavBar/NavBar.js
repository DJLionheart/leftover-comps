import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { get_user } from '../../ducks/reducer';

class NavBar extends Component {
    constructor() {
        super();
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        axios.get('/api/user').then( res => {
            console.log('Get user deets: ', res.data)
            this.props.get_user(res.data);

        }).catch(err => console.log('Get user error: ', err))
    }

    render() {
        return(
            <div>
                <h1>Nav Bar</h1>
                <Link to="/profile"><button>Profile</button></Link>
                <Link to="/posts"><button>Post List</button></Link>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, { get_user })(NavBar);