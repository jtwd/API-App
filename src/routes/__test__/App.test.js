import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import App from '../App';
import { NavigationBar } from '../../components';

describe('App', () => {

  it('contains the NavigationBar', () => {
    const component = shallow(<App><span>test</span></App>);
    expect(component).toContain(<NavigationBar />);

  });

});