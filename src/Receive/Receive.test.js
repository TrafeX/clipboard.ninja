import React from 'react';
import Receive from './Receive';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const wrapper = shallow(<Receive receivedMessages={['Hello']} />);
  expect(wrapper).toMatchSnapshot();
});
