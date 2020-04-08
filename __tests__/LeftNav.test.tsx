import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LeftNav from '../src/renderer/components/LeftNav';
import Title from '../src/renderer/components/Title';
import FileSelector from '../src/renderer/components/FileSelector';
import ServiceInfo from '../src/renderer/components/ServiceInfo';
import renderer from 'react-test-renderer';

configure({ adapter: new Adapter() });

const props = {
  fileUpload: jest.fn(() => {}),
  fileUploaded: false,
  selectedContainer: '',
  service: {},
};

describe('test the functionality of LeftNav component', () => {
  // Test Snapshot
  it('renders correctly', () => {
    const snapProps = Object.assign({}, props, {
      service: {
        image: 'postgres',
        environment: [
          'POSTGRES_MULTIPLE_DATABASES=dpc_attribution,dpc_queue,dpc_auth,dpc_consent',
          'POSTGRES_USER=postgres',
          'POSTGRES_PASSWORD=dpc-safe',
        ],
        ports: ['5432:5432'],
        volumes: ['./docker/postgres:/docker-entrypoint-initdb.d'],
      },
      selectedContainer: 'db',
      fileUploaded: true,
    });
    const component = renderer.create(<LeftNav {...snapProps} />).toJSON();
    expect(component).toMatchSnapshot();
  });

  // Test Outer div
  it('Should render a div with the class of `left-nav`', () => {
    const wrapper = shallow(<LeftNav {...props} />);
    expect(wrapper.find('div.left-nav')).toHaveLength(1);
  });

  // Test top-half div
  it('Should render a div inside of `div.left-nav` with a class of `top-half`', () => {
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

  // Test ServiceInfo
  it('Should render an ServiceInfo component inside of `div.left-nav`', () => {
    const wrapper = shallow(<LeftNav {...props} />);
    expect(wrapper.find('div.left-nav').find(ServiceInfo)).toHaveLength(1);
  });
});
