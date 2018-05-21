import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
    constructor() {
        super();
        this.state = {
            posts: []
        }
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

export default NavBar;