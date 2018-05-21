import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';

import Nav from './components/Nav/Nav';
import routes from './routes';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <Nav/>
        </HashRouter>
      </div>
    );
  }
}

export default App;
