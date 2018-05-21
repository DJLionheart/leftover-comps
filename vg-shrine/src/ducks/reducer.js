import Redux from 'redux';

const initialState = {
    user: 'User',
    profile: '',
}

const GET_USER = 'GET_USER';

export function get_user(user) {
    const { username, profile } = user;

    return {
        type: GET_USER
    }

}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        default: 
            return state;
    }
}