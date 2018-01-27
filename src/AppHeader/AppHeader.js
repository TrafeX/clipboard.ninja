// @flow
import React from 'react';
import {AppBar, FlatButton} from 'material-ui';
import { withRouter } from 'react-router-dom';
import ninjalogo from './ninja.svg';

type Props = {
  history: Object,
  location: Location,
};
const AppHeader = (props: Props) => {
  let navButton = <FlatButton label="Help" href="/about.html" onClick={(e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props.history.push('/about.html');
  }}/>;
  if (props.location.pathname === '/about.html') {
    navButton = <FlatButton label="Back" href="/" onClick={(e: SyntheticEvent<HTMLButtonElement>) => {
      e.preventDefault();
      props.history.push('/');
    }}/>;
  }
  return (
    <div>
      <AppBar
        title="Clipboard.ninja"
        iconElementLeft={<img src={ninjalogo} alt="logo" height="50px"/>}
        iconElementRight={navButton}
        onTitleClick={() => props.history.push('/')}
      />
    </div>
  );
};

export default withRouter(AppHeader);

