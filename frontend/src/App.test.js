import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

jest.mock('react-ga');

it('renders without crashing', () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toMatchSnapshot();
});
