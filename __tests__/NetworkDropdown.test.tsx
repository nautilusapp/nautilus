import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NetworksDropDown from '../src/renderer/components/NetworksDropdown';

configure({ adapter: new Adapter() });

describe('Test Networks Dropdown Component', () => {
  let wrapper: any;
  const props = {
    networks: { hello: 'test' },
    selectNetwork: jest.fn(() => {}),
    selectedNetwork: '',
  };

  beforeAll(() => {
    wrapper = shallow(<NetworksDropDown {...props} />);
  });

  test('should have a disabled networks option', () => {
    expect(wrapper.find('#networkHeader')).toBeDisabled();
  });
});
