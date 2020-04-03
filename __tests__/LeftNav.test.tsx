import React from 'react';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LeftNav from '../src/renderer/components/LeftNav';

configure({ adapter: new Adapter() });

// import InfoDropdown from '../src/renderer/components/InfoDropdown';
// import FileSelector from '../src/renderer/components/FileUpload';
// import Title from '../src/renderer/components/Title';
import FileUpload from '../src/renderer/App.d';

describe('Left Nav', () => {
  it('something', () => {
    const wrapper = shallow(<LeftNav />);
    expect(wrapper.find('div.left-nav')).toHaveLength(1);
  });
});
