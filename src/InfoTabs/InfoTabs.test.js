import React from 'react';
import ReactDOM from 'react-dom';
import InfoTabs from './InfoTabs';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <InfoTabs />, div);
});
