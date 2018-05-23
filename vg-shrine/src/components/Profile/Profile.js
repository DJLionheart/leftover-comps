import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';





class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'User',
            profilePic: 'Profile Here',
            email: '',
            count: 0
        }
        this.getUserDeets = this.getUserDeets.bind(this);
        this.saveEmail = this.saveEmail.bind(this);
        this.getCount = this.getCount.bind(this);
    }

    handleInput(e) {
        this.setState({
            email: e.target.value
        })

    }

    getCount() {
        axios.get(`/api/posts/users/${this.props.user.userid}`).then( res => {
            console.log(res.data)
            this.setState({
                count: +res.data.count
            })
        })

    }

    getUserDeets() {
        axios.get('/api/user').then( res => {
            console.log('Get user deets: ', res.data)
            this.props.get_user(res.data);

        }).catch(err => console.log('Get user error: ', err))

    }

    saveEmail() {
        axios.post(`/api/contact/${this.props.user.userid}`, {email: this.state.email}).then( () => {
            alert('You have subscribed. You will not regret it!')
        })
        this.setState({
            email: "You've been subscribed!"
        })
    }

    render() {

        const { posts } = this.props;

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

        const { email } = this.state;
        console.log('props: ', this.props)
        return(
            <div>
                <h1>Profile</h1>
                <hr/>
                <p>Enter your email address to subscribe to our uber-awesome Video Game newsletter!</p>
                <input value={ email } onChange={ e => this.handleInput(e)}/>
                <button onClick={this.saveEmail}>Save Contact Info</button>
                <hr/>
                <h3>{this.state.count}</h3>
                <button onClick={this.getCount}>See My Posts</button>
                
            </div>
        )
    }
}
function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(Profile);