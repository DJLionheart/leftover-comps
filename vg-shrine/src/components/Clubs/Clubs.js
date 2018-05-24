import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';


const genres = [
    {clubname: 'FPS', clubid: 1},
    {clubname: 'RPG', clubid: 2},
    {clubname: 'MMO', clubid: 3},
    {clubname: 'MOBA', clubid: 4},
    {clubname: 'Strategy', clubid: 5},
    {clubname: 'Puzzle', clubid: 6},
    {clubname: 'Sports', clubid: 7}
]


class Clubs extends Component {
    constructor() {
        super();
    }

    subscribe(clubid) {
        axios.post(`/api/clubs/${this.props.user.userid}`, {clubid: clubid}).then(res => {
            console.log('Subscribe results: ', res.data);
            if(!res.data) {
                alert('You have already subscribed to that club');
            } else {
                alert('You will now receive new updates for games in that genre!')
            }
        })

    }


    render() {
        const subscriptions = genres.map( genre => {
            const { clubid, clubname } = genre;
            return <button key={ clubid } onClick={ () => this.subscribe(clubid) }>{ clubname }</button>
        })

        return(
            <div>
                <h1>Clubs</h1>
                <hr/>
                <p>Subscribe to the genres you love and stay up-to-date on gaming news you care about!</p>
                <hr/>
                { subscriptions }

                
            </div>
        )
    }
}
function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(Clubs);