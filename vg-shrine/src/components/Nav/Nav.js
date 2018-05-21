import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import routes from '../../routes';

class Nav extends Component {
  render() {
      console.log(this.props.match);
    return (
      <div className="Nav">
          {
              !this.props.match.isExact 
                ? <NavBar/>
                : null
          }
          { routes }
      </div>
    );
  }
}

export default withRouter(Nav);