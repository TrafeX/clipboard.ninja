// @flow
import React, { Component } from 'react';
import {AppBar, FlatButton} from 'material-ui';
import { withRouter } from 'react-router-dom';
import ninjalogo from './ninja.svg';

class AppHeader extends Component {
  props: {
    history: Object,
    location: Location,
  };

  render() {
    let navButton = <FlatButton label="Help" href="/about.html" onClick={(e: SyntheticEvent) => {
      e.preventDefault();
      this.props.history.push('/about.html');
    }} />;
    if (this.props.location.pathname === '/about.html') {
      navButton = <FlatButton label="Back" href="/" onClick={(e: SyntheticEvent) => {
        e.preventDefault();
        this.props.history.push('/');
      }} />;
    }
    return (
      <div>
        <AppBar
          title="Clipboard.ninja"
          iconElementLeft={<img src={ninjalogo} alt="logo" height="50px" />}
          iconElementRight={navButton}
          onTitleTouchTap={() => this.props.history.push('/')}
        />
      </div>
    );
  }
}

export default withRouter(AppHeader);

