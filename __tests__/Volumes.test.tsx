import React from 'react';
import { shallow } from 'enzyme';
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

  // it('expect child component to have prop of color', () => {
  //   expect(
  //     wrapper
  //       .find('Volume')
  //       .at(0)
  //       .props(),
  //   ).toEqual({ color: 'hsl(80%,60%,60%)', volume: 'test1' });
  // });

  it('expect child component to have prop of color', () => {
    expect(wrapper.find('Volume').get(0).props).toEqual({
      color: 'hsl(80%,60%,60%)',
      volume: 'test1',
    });
  });

  //test to check if colorscheme function is invoked

  it('expect invocation of a function in props.color', () => {
    expect(wrapper.find('Volume')).prop('color')();
  });
});
