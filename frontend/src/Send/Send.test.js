import React from 'react';
import Send from './Send';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const wrapper = shallow(<Send/>).find('Send').shallow();
  expect(wrapper).toMatchSnapshot();
});
