import React from 'react';
import { shallow, mount } from 'enzyme';
import Volumes from '../src/renderer/components/Volumes';

type Props = {
  volumes: any;
  getColor: any;
};

describe('<Volumes/>', () => {
  const props: Props = {
    volumes: ['test1', 'test2'],
    getColor: jest.fn(() => {
      return 'hsl(80%,60%,60%)';
    }),
  };

  const wrapper = shallow(<Volumes {...props} />);

  //test to check if right number of components / elements are rendered

  it('contains # of Volume components based on volumes array length', () => {
    expect(wrapper.find('Volume').length).toEqual(props.volumes.length);
  });

  it('returns a one instance of class, volumes', () => {
    expect(wrapper.find('.volumes')).toHaveLength(1);
  });

  it('should render only one div', () => {
    expect(wrapper.find('div')).toHaveLength(1);
  });

  //test to see if props are passed down

  // it('should pass props to Volume component', () => {
  //   const wrapperMount = mount(<Volumes {...props} />);
  //   expect(wrapperMount.find('Volume').props('volume')).toEqual(props.volume);
  // });

  // it('expect component prop of color to equal a function', () => {
  //   expect(wrapper.find('Volume').props(volume)).toBeTruthy();
  // });

  it('expect child component to have prop of color', () => {
    expect(wrapper.find('Volume').find('color')).toBeTruthy();
  });

  it('expect child component to have prop of volume', () => {
    expect(wrapper.find('Volume').find('volume')).toBeTruthy();
  });
});
