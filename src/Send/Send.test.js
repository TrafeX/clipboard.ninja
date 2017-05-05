import React from 'react';
import ReactDOM from 'react-dom';
import Send from './Send';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Send
      sendMessage={() => {}}
    />, div);
});
