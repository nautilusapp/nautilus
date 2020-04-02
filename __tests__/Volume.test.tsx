import React from 'react';
import { shallow } from 'enzyme';
import Volume from '../src/renderer/components/Volume';

describe('<Volume/>', () => {
  const props = {
    volume: 'volume',
    color: 'blue',
  };

  const wrapper = shallow(<Volume {...props} />);

  //test number of elements
  it('should render four specific classNames', () => {
    expect(wrapper.find('.volumeLegend')).toHaveLength(1);
    expect(wrapper.find('.volumeColorName')).toHaveLength(1);
    expect(wrapper.find('.volumeSvgBox')).toHaveLength(1);
    expect(wrapper.find('.volumeSquare')).toHaveLength(1);
  });

  it('should render one svg element', () => {
    expect(wrapper.find('svg')).toHaveLength(1);
  });

  it('should render one rect element', () => {
    expect(wrapper.find('rect')).toHaveLength(1);
  });

  //test if rendering props
  it('make sure fill prop set to color, is passed into rect element', () => {
    expect(wrapper.find('.volumeSquare').props().fill).toEqual(props.color);
  });

  it('make sure p tag prop set to volume', () => {
    expect(wrapper.find('p').html()).toEqual(`<p>${props.volume}</p>`);
  });

  //test if parent nodes are correct
  it('is svg element the parent of rect element', () => {
    expect(
      wrapper
        .find('rect')
        .parent()
        .is('svg'),
    ).toEqual(true);
  });
});
