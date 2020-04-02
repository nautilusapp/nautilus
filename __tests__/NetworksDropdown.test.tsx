import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NetworksDropDown from '../src/renderer/components/NetworksDropdown';

configure({ adapter: new Adapter() });

const props = {
  networks: {
    hello: 'test1',
    yellow: 'test2',
    mellow: 'test3',
  },
  selectNetwork: jest.fn(() => {}),
  selectedNetwork: '',
};

describe('Test Networks Dropdown Component', () => {
  let wrapper: any;

  beforeAll(() => {
    wrapper = shallow(<NetworksDropDown {...props} />);
  });

  it('should have a disabled networks option', () => {
    expect(wrapper.find('#networkHeader')).toBeDisabled();
  });

  // it('should render as many options as there are networks, except if there are 1 or less networks in networks object', () => {
  //   const networksLength = Object.keys(props.networks).length;
  //   if (networksLength <= 1) {
  //     expect(wrapper.find('.networkOption')).toHaveLength(2);
  //   } else {
  //     expect(wrapper.find('.networkOption')).toHaveLength(networksLength + 2);
  //   }
  // });
});
