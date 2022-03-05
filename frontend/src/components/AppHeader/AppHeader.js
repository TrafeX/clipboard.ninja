// @flow
import React from 'react';
import {AppBar, FlatButton} from 'material-ui';
import { withRouter } from 'react-router-dom';
import ninjalogo from './ninja.svg';

type Props = {
  history: Object,
  location: Location,
};
const AppHeader = ({history, location}: Props) => {
  let navButton = <FlatButton label="Help" href="/about.html" onClick={(e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    history.push('/about.html');
  }}/>;
  if (location.pathname === '/about.html') {
    navButton = <FlatButton label="Back" href="/" onClick={(e: SyntheticEvent<HTMLButtonElement>) => {
      e.preventDefault();
      history.push('/');
    }}/>;
  }
  return (
    <div>
      <AppBar
        title="Clipboard.ninja"
        iconElementLeft={<img src={ninjalogo} alt="logo" height="50px"/>}
        iconElementRight={navButton}
        onTitleClick={() => history.push('/')}
      />
    </div>
  );
};

export default withRouter(AppHeader);

