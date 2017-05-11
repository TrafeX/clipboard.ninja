import React from 'react';
import ReactDOM from 'react-dom';
import Status from './Status';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Status
      status="test"
    />, div);
});
