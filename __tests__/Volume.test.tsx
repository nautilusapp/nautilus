import React from 'react';
import { shallow, configure } from 'enzyme';
import Volume from '../src/renderer/components/Volume';

describe('<Volume/>', () => {
  const props = {
    volume: '',
    color: '',
  };
  it('should render three divs', () => {
    const wrapper = shallow(<Volume {...props} />);
    expect(wrapper.find('.volumeLegend')).toHaveLength(1);
    expect(wrapper.find('.volumeColorName')).toHaveLength(1);
    expect(wrapper.find('.volumeSvgBox')).toHaveLength(1);
    expect(wrapper.find('.volumeSquare')).toHaveLength(1);
  });
});
