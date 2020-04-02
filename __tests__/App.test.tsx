import React from 'react';
import { shallow, configure, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../src/renderer/App';

// IMPORT COMPONENTS
import LeftNav from '../src/renderer/components/LeftNav';
import OptionBar from '../src/renderer/components/OptionBar';
import D3Wrapper from '../src/renderer/components/D3Wrapper';
import { State } from '../src/renderer/App.d';

configure({ adapter: new Adapter() });

describe('Testing App Stateful Component', () => {
  let wrapper: ShallowWrapper<{}, State, App>;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  describe('render()', () => {
    it('should render child components', () => {
      expect(wrapper.find(LeftNav)).toHaveLength(1);
      expect(wrapper.find(OptionBar)).toHaveLength(1);
      expect(wrapper.find(D3Wrapper)).toHaveLength(1);
    });
  });

  describe('setSelectedContainer()', () => {
    it('should updated selectedContainer in state', () => {
      wrapper.instance().setSelectedContainer('tester-service');
      expect(wrapper.state().selectedContainer).toBe('tester-service');
      wrapper.instance().setSelectedContainer('api-service');
      expect(wrapper.state().selectedContainer).toBe('api-service');
    });
  });
});
