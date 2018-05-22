import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { get_messages } from '../../ducks/reducer';


class PostList extends Component {
    constructor() {
        super();
        this.state = {
            posts: []
        }
    }

    render() {
        const { get_messages, posts } = this.props

        const postList = posts.map( (post, i) => {
            return(
                <div>
                    <h3>{post.title}</h3>
                    <br/>
                    <img src={ post.img } alt="game picture"/>
                    <br/>
                    <p>{post.body}</p>
                    <br/>
                    <h3>Post ID: {post.postid}</h3>
                    <br/>
                    <button>Edit</button>
                </div>
            )
        })

        return(
            <div>
                <h1>Post List</h1>

                <Link to="/compose"><button>New Post</button></Link>
                <hr/>
                <button onClick={ get_messages }>Get Posts</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, { get_messages })(PostList);