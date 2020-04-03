import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import OptionBar from '../src/renderer/components/OptionBar';
import NetworksDropdown from '../src/renderer/components/NetworksDropdown';
import { ViewT } from '../src/renderer/App.d';

configure({ adapter: new Adapter() });

const props = {
  view: 'depends_on' as ViewT,
  options: {
    ports: true,
    volumes: true,
    selectAll: true,
  },
  networks: {
    a: 'test1',
    b: 'test2',
  },
  updateView: jest.fn(() => {}),
  updateOption: jest.fn(() => {}),
  selectNetwork: jest.fn(() => {}),
  selectedNetwork: '',
};

describe('<OptionBar />', () => {
  // optionBar div Testing
  it('renders a div with a className of `option-bar`', () => {
    const wrapper = shallow(<OptionBar {...props} />);
    expect(wrapper.find('div.option-bar')).toHaveLength(1);
  });

  // Views Testing
  it('renders a div with a className of `views`', () => {
    const wrapper = shallow(<OptionBar {...props} />);
    expect(wrapper.find('div.views')).toHaveLength(1);
  });

  it('renders a <NetworksDropdown /> component', () => {
    const wrapper = shallow(<OptionBar {...props} />);
    expect(wrapper.find('div.views').find(NetworksDropdown)).toHaveLength(1);
  });

  it('renders a span with an id of `depends_on` inside of div.views', () => {
    const wrapper = shallow(<OptionBar {...props} />);
    expect(wrapper.find('div.views').find('span#depends_on')).toHaveLength(1);
  });

  it('fires a click event for span#depends_on in div.views', () => {
    const onButtonClick = jest.fn(() => {});
    const wrapper = shallow(
      <OptionBar {...props} updateView={onButtonClick} />,
    );
    wrapper
      .find('div.views')
      .find('span#depends_on')
      .simulate('click');
    expect(onButtonClick.mock.calls.length).toBe(1);
  });

  it('renders a span with an id of `depends_on`', () => {
    const wrapper = shallow(<OptionBar {...props} />);
    expect(wrapper.find('div.views').find('span#depends_on')).toHaveLength(1);
  });

  // Titles Testing
  it('renders a div with a className of `titles`', () => {
    const wrapper = shallow(<OptionBar {...props} />);
    expect(wrapper.find('div.titles')).toHaveLength(1);
  });

  it('renders two h2 elements inside of div.titles`', () => {
    const wrapper = shallow(<OptionBar {...props} />);
    expect(wrapper.find('div.titles').find('h2')).toHaveLength(2);
  });

  it('renders a div with a className of `vl` inside of div.titles', () => {
    const wrapper = shallow(<OptionBar {...props} />);
    expect(wrapper.find('div.titles').find('div.vl')).toHaveLength(1);
  });

  // Options Testing
  it('renders a div with a className of `options`', () => {
    const wrapper = shallow(<OptionBar {...props} />);
    expect(wrapper.find('div.options')).toHaveLength(1);
  });

  it('renders three spans with className of `option` inside of div.options', () => {
    const wrapper = shallow(<OptionBar {...props} />);
    expect(wrapper.find('div.options').find('span.option')).toHaveLength(3);
  });

  it('fires a click event for span#ports inside div.options', () => {
    const onButtonClick = jest.fn(() => {});
    const wrapper = shallow(
      <OptionBar {...props} updateOption={onButtonClick} />,
    );
    wrapper
      .find('div.options')
      .find('span#ports')
      .simulate('click');
    expect(onButtonClick.mock.calls.length).toBe(1);
  });

  it('fires a click event for span#volumes inside div.options', () => {
    const onButtonClick = jest.fn(() => {});
    const wrapper = shallow(
      <OptionBar {...props} updateOption={onButtonClick} />,
    );
    wrapper
      .find('div.options')
      .find('span#volumes')
      .simulate('click');
    expect(onButtonClick.mock.calls.length).toBe(1);
  });

  it('fires a click event for span#selectAll inside div.options', () => {
    const onButtonClick = jest.fn(() => {});
    const wrapper = shallow(
      <OptionBar {...props} updateOption={onButtonClick} />,
    );
    wrapper
      .find('div.options')
      .find('span#selectAll')
      .simulate('click');
    expect(onButtonClick.mock.calls.length).toBe(1);
  });
});
