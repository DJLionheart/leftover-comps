import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Auth from './components/Auth/Auth';
import Profile from './components/Profile/Profile';
import PostList from './components/PostList/PostList';


export default(
    <Switch>
        <Route exact path="/" component={ Auth }/>
        <Route path="/profile" component={ Profile }/>
        <Route path="/posts" component={ PostList }/>
    </Switch>
)
