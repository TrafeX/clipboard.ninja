import React from 'react';
import ReactDOM from 'react-dom';
import Receive from './Receive';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Receive
      receivedMessage='Hello world!'
    />, div);
});
