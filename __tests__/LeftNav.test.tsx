import React from 'react';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LeftNav from '../src/renderer/components/LeftNav';

configure({ adapter: new Adapter() });

const props = {
  fileUpload: jest.fn(() => {}),
  fileUploaded: false,
  selectedContainer: '',
  service: '',
};

describe('Left Nav', () => {
  it('something', () => {
    const wrapper = shallow(<LeftNav {...props} />);
    expect(wrapper.find('div.left-nav')).toHaveLength(1);
  });
});
