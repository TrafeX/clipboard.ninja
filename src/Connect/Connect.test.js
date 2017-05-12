import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Connect from './Connect';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MuiThemeProvider>
      <Connect
        ownRoomNumber={100}
        connectedToRoom="room-123"
        connectToRoom={() => {}}
      />
    </MuiThemeProvider>,
    div);
});
