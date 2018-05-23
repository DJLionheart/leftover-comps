import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { get_messages, edit_post } from '../../ducks/reducer';


class PostList extends Component {
    constructor() {
        super();
        this.state = {
            posts: []
        }
        this.edit = this.edit.bind(this);
    }

    componentDidMount() {
        this.props.get_messages()
    }

    edit(id) {
        this.props.edit_post(id);
        setTimeout( () => {
            this.props.history.push('/edit_post')
        }, 500)
    }

    render() {
        const { posts, edit_post } = this.props;

        const postList = posts.map( (post, i) => {
            return(
                <div key={ i }>
                    <h3>{post.title}</h3>
                    <br/>
                    <img src={ post.img } alt="game picture"/>
                    <br/>
                    <p>{post.body}</p>
                    <br/>
                    <h3>Post ID: {post.postid}</h3>
                    <br/>
                    <button onClick={ () => this.edit(post.postid)}>Edit</button>
                    <button>Favorite</button>
                </div>
            )
        })

        return(
            <div>
                <h1>Post List</h1>

                <Link to="/compose"><button>New Post</button></Link>
                <hr/>
                { postList }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, { get_messages, edit_post })(PostList);