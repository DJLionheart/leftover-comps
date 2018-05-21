import React, { Component } from 'react';


class Post extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            author: '',
            img: '',
            body: ''
        }
    }

    render() {
        return(
            <div>
                <h1>Post</h1>
                <button>Log In</button>
            </div>
        )
    }
}

export default Post;