import React from 'react';
import { shallow } from 'enzyme';
import Volumes from '../src/renderer/components/Volumes';

type Props = {
  volumes: any;
  getColor: any;
};

describe('<Volumes/>', () => {
  const props: Props = {
    volumes: { test1: '1', test2: '2' },
    getColor: jest.fn(() => {
      return 'hsl(80%,60%,60%)';
    }),
  };

  const wrapper = shallow(<Volumes {...props} />);

  //test to check if right number of components / elements are rendered

  it('contains # of Volume components based on volumes length', () => {
    const volumesCount = Object.keys(props.volumes).length;
    expect(wrapper.find('Volume').length).toEqual(volumesCount);
    expect(wrapper.find('Volume').length).not.toBe(1);
  });

  it('returns a one instance of class: volumes', () => {
    expect(wrapper.find('.volumes')).toHaveLength(1);
    expect(wrapper.find('.volumes')).not.toHaveLength(0);
  });

  it('should render only one div', () => {
    expect(wrapper.find('div')).toHaveLength(1);
    expect(wrapper.find('div')).not.toHaveLength(2);
  });

  //test to see if props are passed down

  it('expect child component to have props of color and volume', () => {
    expect(wrapper.find('Volume').get(0).props).toEqual({
      color: 'hsl(80%,60%,60%)',
      volume: 'test1',
    });
  });
});
