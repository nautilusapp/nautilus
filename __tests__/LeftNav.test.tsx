import React from 'react';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LeftNav from '../src/renderer/components/LeftNav';
import Title from '../src/renderer/components/Title';
import FileSelector from '../src/renderer/components/FileSelector';
import InfoDropdown from '../src/renderer/components/InfoDropdown';

configure({ adapter: new Adapter() });

const props = {
  fileUpload: jest.fn(() => {}),
  fileUploaded: false,
  selectedContainer: '',
  service: {},
};

describe('test the functionality of LeftNav component', () => {
  // Test Outer div
  it('Should render a div with the class of `left-nav`', () => {
    const wrapper = shallow(<LeftNav {...props} />);
    expect(wrapper.find('div.left-nav')).toHaveLength(1);
  });

  // Test top-half div
  it('Should render a div inside of `div.left-nav` with a class of `ltop-half`', () => {
    const wrapper = shallow(<LeftNav {...props} />);
    expect(wrapper.find('div.left-nav').find('div.top-half')).toHaveLength(1);
  });

  // Test Title
  it('Should render a Title component inside of `div.top-half`', () => {
    const wrapper = shallow(<LeftNav {...props} />);
    expect(wrapper.find('div.top-half').find(Title)).toHaveLength(1);
  });

  // Test FileUploaded
  it('`div.top-half` should only have one child if fileUploaded is false', () => {
    const wrapper = shallow(<LeftNav {...props} />);
    expect(wrapper.find('div.top-half').children()).toHaveLength(1);
  });

  it('`div.top-half` should have two children if fileUploaded is true', () => {
    const wrapper = shallow(<LeftNav {...props} fileUploaded={true} />);
    expect(wrapper.find('div.top-half').children()).toHaveLength(2);
  });

  it('Should render a file selector if fileUploaded is true', () => {
    const wrapper = shallow(<LeftNav {...props} fileUploaded={true} />);
    expect(wrapper.find('div.top-half').find(FileSelector)).toHaveLength(1);
  });

  // Test InfoDropdown
  it('Should render an InfoDropdown component inside of `div.left-nav`', () => {
    const wrapper = shallow(<LeftNav {...props} />);
    expect(wrapper.find('div.left-nav').find(InfoDropdown)).toHaveLength(1);
  });
});
