import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';





class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'User',
            profilePic: 'Profile Here'
        }
        this.getUserDeets = this.getUserDeets.bind(this);
    }

    getUserDeets() {
        axios.get('/api/user').then( res => {
            console.log('Get user deets: ', res.data)
            this.props.get_user(res.data);

        }).catch(err => console.log('Get user error: ', err))

    }

    render() {
        console.log('props: ', this.props)
        return(
            <div>
                <h1>Profile</h1>
                <hr/>
                <button onClick={ this.getUserDeets }>Get User Details</button>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(Profile);