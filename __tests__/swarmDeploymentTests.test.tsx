import DeploySwarm from '../src/renderer/components/SwarmDeployment';
import { shallow, mount } from 'enzyme';
import fs from 'fs';
import path from 'path';

describe('Swarm Deployment component', () => {

  const props = {
    currentFile: 'User/project_name/docker-compose.yml'
  }
  const mockFunction = jest.fn(() => {});
  const wrapper = mount(<DeploySwarm {...props} />);
  
  it('should have a button with className `deploy-btn`', () => {
    let calls = mockFunction.mock.calls.length;
    expect(wrapper.find('deploy-btn')).toHaveLength(1);
    wrapper.find('deploy-btn').simulate('click');
    expect(mockFunction.mock.calls.length).toEqual(calls + 1);
  });
});
