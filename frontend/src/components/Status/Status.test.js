import React from 'react';
import Status from './Status';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const wrapper = shallow(<Status status={'Testing'}/>)
  expect(wrapper).toMatchSnapshot();
});
