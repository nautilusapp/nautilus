import React from 'react';
import { shallow } from 'enzyme';

import LeftNav from '../src/renderer/components/LeftNav';

// import { FileUpload } from '../src/renderer/App.d';
// import FileUpload from '../src/renderer/components/FileUpload';

// // type Props = {
// //   service: Service;
// //   selectedContainer: string;
// //   fileUpload: FileUpload;
// //   fileUploaded: boolean;
// // };

const props = {
  service: {},
  selectedContainer: 'candyland',
  fileUpload: jest.fn((): void => {}),
  fileUploaded: true,
};

// Let's check for CSS
describe('classNames need to exist for CSS purposes', () => {
  it('checks to see if left-nav exists', () => {
    const component = shallow(<LeftNav {...props} />);
    expect(component.find('div.left-nav')).toHaveLength(1);
  });
});
