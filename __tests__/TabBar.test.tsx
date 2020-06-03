import React from 'react';
import { shallow, configure } from 'enzyme';
import TabBar from '../src/renderer/components/TabBar';
import Tab from '../src/renderer/components/Tab';
import { SwitchTab } from '../src/renderer/App.d';

describe('TabBar', () => {
  const mockFunction = jest.fn(() => {});
  const props = {
    openFiles: ['file1', 'file2'],
    switchToTab: mockFunction,
  };
  const wrapper = shallow(<TabBar {...props} />);
  beforeAll(() => {
    props.openFiles = ['file1', 'file2'];
  });
  //tabBar div test
  it('renders div with classname of tab-bar', () => {
    expect(wrapper.find('div.tab-bar')).toHaveLength(1);
  });
  //check if clicking tab will invoke function switchToTab
  it('should invoke function switchToTab when tab is clicked', () => {
    let calls = mockFunction.mock.calls.length;
    wrapper.find('div.tab-bar').find('Tab').simulate('click');
    expect(mockFunction.mock.calls.length).toEqual(calls + 1);
  });
  //check if tab has class active when clicked
  //check if tabBar renders a tab for each filepath
  it('should render a tab for each file path in openFiles', () => {
    expect(wrapper.find('div.tab-bar').find('Tab').length).toEqual(
      props.openFiles.length,
    );
  });
  //each tab should render a button
  it('should render a button on each tab', () => {
    expect(wrapper.find('div.tab-bar').find('Tab').find('button')).toHaveLength(1);
  });
  //when button is clicked props.openFiles.length should equal 1
  it('openFiles should have length of 1 after tab button is clicked', () => {
    expect(props.openFiles).toHaveLength(2);
    wrapper.find('div.tab-bar').find('Tab').find('button').simulate('click');
    expect(props.openFiles).toHaveLength(1);
  });
});
