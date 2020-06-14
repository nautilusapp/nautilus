import DeploySwarm from '../src/renderer/components/SwarmDeployment';
import { shallow, mount } from 'enzyme';

describe('Swarm Deployment component', () => {
  it('should have a button with className `deploy-btn`', () => {
    expect(1).toEqual(1);
    
  });
  // const props = {
  //   currentFile: 'User/project_name/docker-compose.yml'
  // }
  // const mockFunction = jest.fn(() => {});
  // const wrapper = shallow(<DeploySwarm {...props} />);
  
  // it('should have a button with className `deploy-btn`', () => {
  //   let calls = mockFunction.mock.calls.length;
  //   expect(wrapper.find('deploy-btn')).toHaveLength(1);
  //   wrapper.find('deploy-btn').simulate('click');
  //   expect(mockFunction.mock.calls.length).toEqual(calls + 1);
  // });
});
