import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { post_message, update_post } from '../../ducks/reducer';


class Post extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            author: '',
            img: '',
            body: ''
        }
        this.createPost = this.createPost.bind(this);
        this.updatePost = this.updatePost.bind(this);
    }

    handleInput(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    createPost() {
        const { title, img, body } = this.state;
        this.props.post_message({
            title: title,
            img: img,
            body: body
        })
        this.setState({
            title: '',
            img: '',
            body: ''
        })
        this.props.history.push('/posts')
    }

    updatePost() {
        const { title, img, body } = this.state;
        this.props.update_post({
            title: title,
            img: img,
            body: body
        })
        this.setState({
            title: '',
            img: '',
            body: ''
        })
        this.props.history.push('/posts')
    }

    render() {
        const { title, img, body } = this.state;
        return(
            <div>
                <h1>New Post</h1>
                <hr/>
                <h2>Title</h2>
                <br/>
                <input name="title" value={ title } onChange={ e => this.handleInput(e) }/>
                <br/>
                <h2>Image</h2>
                <br/>
                <input name="img" value={ img } onChange={ e => this.handleInput(e) }/>
                <br/>
                <h2>Message</h2>
                <input name="body" value={ body } onChange={ e => this.handleInput(e) }/>
                <button onClick={ this.createPost }>Submit</button>
                <hr/>
                <button onClick={ this.updatePost }>Update</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default withRouter(connect(mapStateToProps, { post_message, update_post })(Post));