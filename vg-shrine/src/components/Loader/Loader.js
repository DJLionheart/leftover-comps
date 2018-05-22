import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { get_user } from '../../ducks/reducer';


class Loader extends Component {
    constructor() {
        super();
        this.state = {
            userLoaded: false
            
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5050/api/user').then( res => {
            console.log("Results: ", res.data)
            this.props.get_user(res.data);
            this.setState({
                userLoaded: true
            })
            this.props.history.push('/profile')
        }).catch(err => console.log('Error getting user: ', err))
    }

    render() {
        return(
            <div>
        
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default withRouter(connect(mapStateToProps, { get_user })(Loader));