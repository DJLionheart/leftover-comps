import React, { Component } from 'react';


class PostList extends Component {
    constructor() {
        super();
        this.state = {
            posts: []
        }
    }

    render() {
        return(
            <div>
                <h1>Post List</h1>
            </div>
        )
    }
}

export default PostList;