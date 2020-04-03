import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NetworksDropDown from '../src/renderer/components/NetworksDropdown';

configure({ adapter: new Adapter() });

const props = {
  networks: {},
  selectNetwork: jest.fn(() => {}),
  selectedNetwork: '',
};

describe('Test Networks Dropdown Component', () => {
  // Test Select Dropdown
  it('Should render select dropdown with id of `networks`', () => {
    const wrapper = shallow(<NetworksDropDown {...props} />);
    expect(wrapper.find('select#networks')).toHaveLength(1);
  });

  // Test Network Header
  it('should have a disabled networks option', () => {
    const wrapper = shallow(<NetworksDropDown {...props} />);
    expect(wrapper.find('option#networkHeader')).toBeDisabled();
  });

  // Test Selected Networks

  it('If select value is `` selectedNetwork should be ``', () => {
    const wrapper = shallow(<NetworksDropDown {...props} />);
    expect(wrapper.find('select').props().value).toBe('');
  });

  it('If select value is a network string selectedNetwork should be a string', () => {
    const wrapper = shallow(
      <NetworksDropDown
        {...props}
        networks={{ a: 'test' }}
        selectedNetwork="a"
      />,
    );
    expect(wrapper.find('select').props().value).toBe('a');
  });

  // Test Options
  it('should render one option with className networkOption if networks is empty', () => {
    const wrapper = shallow(<NetworksDropDown {...props} />);
    expect(wrapper.find('option.networkOption')).toHaveLength(1);
  });

  it('should render one option with className networkOption if there is only 1 item in networks', () => {
    const wrapper = shallow(
      <NetworksDropDown {...props} networks={{ a: 'test' }} />,
    );
    expect(wrapper.find('option.networkOption')).toHaveLength(1);
  });

  it('Should render one more networkOption than the number of networks if networks has more than 1 item', () => {
    const wrapper = shallow(
      <NetworksDropDown
        {...props}
        networks={{ a: 'test1', b: 'test2', c: 'test3' }}
      />,
    );
    expect(wrapper.find('option.networkOption')).toHaveLength(4);
  });

  // Test Title
  it('If there are no networks title should be default', () => {
    const wrapper = shallow(<NetworksDropDown {...props} />);
    expect(wrapper.find('option#groupNetworks')).toHaveText('default');
  });

  it('If there is 1 network title should be the name of that network', () => {
    const wrapper = shallow(
      <NetworksDropDown {...props} networks={{ a: 'test' }} />,
    );
    expect(wrapper.find('option#groupNetworks')).toHaveLength(0);
  });

  it('If there are more than 1 network title should be `group networks`', () => {
    const wrapper = shallow(
      <NetworksDropDown
        {...props}
        networks={{ a: 'test1', b: 'test2', c: 'test3' }}
      />,
    );
    expect(wrapper.find('option#groupNetworks')).toHaveText('group networks');
  });
});
