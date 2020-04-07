import React from 'react';
import { shallow } from 'enzyme';
import BindMounts from '../src/renderer/components/BindMounts';

type Props = {
  bindMounts: any;
  getColor: any;
};

describe('<BindMounts/>', () => {
  const props: Props = {
    bindMounts: ['test1', 'test2'],
    getColor: jest.fn(() => {
      return 'hsl(80%,60%,60%)';
    }),
  };

  const wrapper = shallow(<BindMounts {...props} />);

  //test to check if right number of components / elements are rendered

  it('contains # of Volume components based on bindMounts array length', () => {
    const volumesCount = props.bindMounts.length;
    expect(wrapper.find('Volume').length).toEqual(volumesCount);
    expect(wrapper.find('Volume').length).not.toBe(1);
  });

  it('returns a one instance of class: bind-mounts', () => {
    expect(wrapper.find('.bind-mounts')).toHaveLength(1);
    expect(wrapper.find('.bind-mounts')).not.toHaveLength(0);
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
