import React from 'react';
import AppHeader from './AppHeader';
import { shallow } from 'enzyme';

it('renders with a link to Help', () => {
  const mockHistoryPush = jest.fn();
  const wrapper = shallow(<AppHeader.WrappedComponent location={{pathname: '/'}} history={{push: mockHistoryPush}}/>);
  expect(wrapper).toMatchSnapshot();

});

it('renders with a link to Home', () => {
  const wrapper = shallow(<AppHeader.WrappedComponent location={{pathname: '/about.html'}}/>);
  expect(wrapper).toMatchSnapshot();
});
