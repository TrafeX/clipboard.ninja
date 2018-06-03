import React from 'react';
import Connect from './Connect';
import { shallow } from 'enzyme';

it('renders without crashing', () => {

  const wrapper = shallow(
    <Connect connectedToRoom={null}/>
  ).find('Connect').shallow();
  expect(wrapper).toMatchSnapshot();
});
