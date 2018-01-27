// @flow
import React, { Component } from 'react';
import {AppBar, FlatButton} from 'material-ui';
import { withRouter } from 'react-router-dom';
import ninjalogo from './ninja.svg';

type Props = {
  history: Object,
  location: Location,
};
class AppHeader extends Component<Props> {
  render() {
    let navButton = <FlatButton label="Help" href="/about.html" onClick={(e: SyntheticEvent<HTMLButtonElement>) => {
      e.preventDefault();
      this.props.history.push('/about.html');
    }} />;
    if (this.props.location.pathname === '/about.html') {
      navButton = <FlatButton label="Back" href="/" onClick={(e: SyntheticEvent<HTMLButtonElement>) => {
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
          onTitleClick={() => this.props.history.push('/')}
        />
      </div>
    );
  }
}

export default withRouter(AppHeader);

