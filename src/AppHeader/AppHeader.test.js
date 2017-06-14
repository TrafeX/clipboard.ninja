import React from 'react';
import ReactDOM from 'react-dom';
import AppHeader from './AppHeader';

it.skip('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <AppHeader />
    ,div);
});
