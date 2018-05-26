import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { get_user } from '../../ducks/reducer';





class AltProf extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'User',
            profilePic: 'Profile Here',
            email: '',
            count: 0
        }

    }

    componentDidMount() {
        const { get_user } = this.props;
        axios.get('/api/auth/me').then( res => {
            get_user(res.data)
        })
    }

    handleInput(e) {
        this.setState({
            email: e.target.value
        })

    }




    render() {

        const { posts, user } = this.props
            , { username, profile_pic } = user;

        console.log('props: ', this.props)
        return(
            <div>
                <img src={ profile_pic } alt="profile"/>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, { get_user })(AltProf);