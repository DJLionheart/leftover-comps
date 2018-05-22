import axios from 'axios';

const initialState = {
    userRetrieved: false,
    user: {},
    posts: [],
    user_posts: 0,
    post_updated: false
}

const {
    REACT_APP_POSTS
} = process.env;

const FULFILLED = '_FULFILLED'
    , GET_USER = 'GET_USER'
    , POST_MESSAGE = 'POST_MESSAGE'
    , PUT_MESSAGE = 'PUT_MESSAGE'
    , GET_MESSAGES = 'GET_MESSAGES';


    
export function get_user(user) {

    return {
        type: GET_USER,
        payload: user
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

        case GET_MESSAGES + FULFILLED:
            return Object.assign({}, state, {posts: action.payload});

        case POST_MESSAGE + FULFILLED:
            let newCount = state.user_posts + 1;
            return Object.assign({}, state, { user_posts: newCount});

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