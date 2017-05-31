// @flow
import React, { Component } from 'react';
import {AppBar, FlatButton} from 'material-ui';
import { withRouter } from 'react-router-dom';
import ninjalogo from './ninja.svg';

class AppHeader extends Component {
  props: {
    history: Object,
    location: Object,
  };

  render() {
    let navButton = <FlatButton label="Help" onTouchTap={() => this.props.history.push('/about')} />;
    if (this.props.location.pathname === '/about') {
      navButton = <FlatButton label="Back" onTouchTap={() => this.props.history.push('/')} />;
    }
    return (
      <div>
        <AppBar
          title="Clipboard.ninja"
          iconElementLeft={<img src={ninjalogo} alt="logo" height="50px" />}
          iconElementRight={navButton}
        />
      </div>
    );
  }
}

export default withRouter(AppHeader);

