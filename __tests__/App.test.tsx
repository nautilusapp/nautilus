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

  describe('updateView()', () => {
    it('should update view in state', () => {
      wrapper.instance().updateView('depends_on');
      expect(wrapper.state().view).toBe('depends_on');
    });
    it('should clear selectedNetwork in state', () => {
      wrapper.state().selectedNetwork = 'dummy-network';
      wrapper.instance().updateView('depends_on');
      expect(wrapper.state().selectedNetwork).toBe('');
    });
  });

  describe('updateOption()', () => {
    beforeEach(() => {
      wrapper.state().options = {
        ports: false,
        volumes: false,
        selectAll: false,
      };
    });
    it('should toggle ports option', () => {
      wrapper.instance().updateOption('ports');
      expect(wrapper.state().options.ports).toBe(true);
      wrapper.instance().updateOption('ports');
      expect(wrapper.state().options.ports).toBe(false);
    });
    it('should toggle volumes option', () => {
      wrapper.instance().updateOption('volumes');
      expect(wrapper.state().options.volumes).toBe(true);
      wrapper.instance().updateOption('volumes');
      expect(wrapper.state().options.volumes).toBe(false);
    });
    it('should toggle selectAll option', () => {
      wrapper.instance().updateOption('selectAll');
      expect(wrapper.state().options.selectAll).toBe(true);
      wrapper.instance().updateOption('selectAll');
      expect(wrapper.state().options.selectAll).toBe(false);
    });
    it('selectAll should toggle ports and options', () => {
      wrapper.instance().updateOption('selectAll');
      expect(wrapper.state().options.ports).toBe(true);
      expect(wrapper.state().options.volumes).toBe(true);
      wrapper.instance().updateOption('selectAll');
      expect(wrapper.state().options.ports).toBe(false);
      expect(wrapper.state().options.volumes).toBe(false);
    });
    it('selectAll should should reflect all being selected or not', () => {
      wrapper.instance().updateOption('ports');
      wrapper.instance().updateOption('volumes');
      expect(wrapper.state().options.selectAll).toBe(true);
      wrapper.instance().updateOption('ports');
      expect(wrapper.state().options.selectAll).toBe(false);
    });
  });

  describe('selectNetwork()', () => {});
});
