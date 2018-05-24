import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Auth from './components/Auth/Auth';
import Loader from './components/Loader/Loader';
import Profile from './components/Profile/Profile';
import PostList from './components/PostList/PostList';
import Post from './components/Post/Post';
import Clubs from './components/Clubs/Clubs';
import EditPost from './components/Post/EditPost';


export default(
    <Switch>
        <Route exact path="/" component={ Auth }/>
        <Route path="/loader" component={ Loader }/>
        <Route path="/profile" component={ Profile }/>
        <Route path="/posts" component={ PostList }/>
        <Route path="/compose" component={ Post }/>
        <Route path="/edit_post" component={ EditPost }/>
        <Route path="/clubs" component={ Clubs }/>
    </Switch>
)
