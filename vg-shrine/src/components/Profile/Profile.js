import React, { Component } from 'react';


class Profile extends Component {
    constructor() {
        super();
        this.state = {
            username: 'User',
            profilePic: 'Profile Here'
        }
    }

    render() {
        return(
            <div>
                <h1>Profile</h1>
            </div>
        )
    }
}

export default Profile;