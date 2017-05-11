import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Send from './Send';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MuiThemeProvider>
      <Send
        connectedToRoom="room-123"
        sendMessage={() => {}}
      />
    </MuiThemeProvider>,
    div);
});
