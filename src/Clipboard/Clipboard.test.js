import React from 'react';
import Clipboard from './Clipboard';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const wrapper = shallow(<Clipboard />);
  expect(wrapper).toMatchSnapshot();
});
