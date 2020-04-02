import React from 'react';
import { shallow } from 'enzyme';
import Volumes from '../src/renderer/components/Volumes';

describe('<Volumes/>', () => {
  const props = {
    volumes: [],
    getColor: jest.fn(),
  };

  const wrapper = shallow(<Volumes {...props} />);
});
