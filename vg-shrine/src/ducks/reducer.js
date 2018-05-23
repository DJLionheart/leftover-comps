import axios from 'axios';

const initialState = {
    userRetrieved: false,
    user: {},
    posts: [{postid: 1, title: 'Test', img: 'https://media.giphy.com/media/pa37AAGzKXoek/giphy.gif', body: 'this is a test'}],
    user_posts: 0,
    post_updated: false,
    postToEdit: 0
    
}

const {
    REACT_APP_POSTS
} = process.env;

const FULFILLED = '_FULFILLED'
    , GET_USER = 'GET_USER'
    , POST_MESSAGE = 'POST_MESSAGE'
    , EDIT_POST = 'EDIT_POST'
    , PUT_MESSAGE = 'PUT_MESSAGE'
    , GET_MESSAGES = 'GET_MESSAGES'
    , LOGOUT = 'LOGOUT';


    
export function get_user(user) {

    return {
        type: GET_USER,
        payload: user
    }
}

export function log_out() {
    return {
        type: LOGOUT,
        payload: {}
    }
}

export function post_message(message) {
    let post = axios.post(`${REACT_APP_POSTS}/1`, {
        title: message.title,
        img: message.img,
        body: message.body
    }).then( res => {
        console.log('Post creation results: ', res.data)
        return res.data
    }).catch(err => console.log('Error creating post on server', err))

    return {
        type: POST_MESSAGE,
        payload: post
    }
}

export function edit_post(id) {
    return {
        type: EDIT_POST,
        payload: id
    }
}

export function get_messages() {
    let allPosts = axios.get('/api/posts').then(res => {
        return res.data
    }).catch(err => console.log('Error fetching posts from  DB: ', err))

    return {
        type: GET_MESSAGES,
        payload: allPosts
    }
}

export function update_post(updatedPost) {
    const { postid, title, img, body } = updatedPost
    let putPost = axios.put(`/api/posts/update/${postid}`, {
        title: title,
        img: img,
        body: body
    }).then( res => {
        console.log('Post creation results: ', res.data)
        return res.data
    }).catch(err => console.log('Error creating post on server', err))

    return {
        type: PUT_MESSAGE,
        payload: putPost
    }
}

export default function reducer(state = initialState, action) {
    switch(action.type) {

        case GET_USER:
            return Object.assign({}, state, { user: action.payload });

        case LOGOUT:
            return Object.assign({}, state, action.payload);

        case GET_MESSAGES + FULFILLED:
            return Object.assign({}, state, {posts: action.payload});

        case POST_MESSAGE + FULFILLED:
            let newCount = state.user_posts + 1;
            return Object.assign({}, state, { user_posts: newCount});

        case EDIT_POST:
            return Object.assign({}, state, {postToEdit: action.payload});

        case PUT_MESSAGE + FULFILLED:
            if(action.payload) {
                return Object.assign({}, state, { post_updated: true });
            }
            else {
                return Object.assign({}, state, { post_updated: false});
            }

        default: 
            return state;
    }
}