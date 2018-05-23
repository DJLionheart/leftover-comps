import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { post_message, update_post, get_messages } from '../../ducks/reducer';


class EditPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            author: '',
            img: '',
            body: '',
            postid: 0
        }

        this.updatePost = this.updatePost.bind(this);
    }

    componentDidMount() {
        axios.get(`/api/posts/${this.props.postToEdit}`).then( res => {
            const { title, img, body, postid } = res.data;
            this.setState({
                title: title,
                img: img,
                body: body,
                postid: postid

            })
        })
                
    }

    handleInput(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    updatePost() {
        const { title, img, body, postid } = this.state;
        this.props.update_post({
            title: title,
            img: img,
            body: body,
            postid: postid
        })
        this.setState({
            title: '',
            img: '',
            body: '',
            postid: 0
        })
        setTimeout( () => {
            this.props.get_messages();
            this.props.history.push('/posts')
        }, 1000)
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
                <button onClick={ this.updatePost }>Update</button>
                <hr/>
                <h2>Post ID: {this.state.postid}</h2>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default withRouter(connect(mapStateToProps, { update_post, get_messages })(EditPost));