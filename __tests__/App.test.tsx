import React from 'react';
import { shallow, configure, ShallowWrapper } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import App from '../src/renderer/App';
import fs from 'fs';
import path from 'path';

// IMPORT COMPONENTS
import LeftNav from '../src/renderer/components/LeftNav';
import OptionBar from '../src/renderer/components/OptionBar';
import D3Wrapper from '../src/renderer/components/D3Wrapper';
import TabBar from '../src/renderer/components/TabBar';
import { State } from '../src/renderer/App.d';

configure({ adapter: new Adapter() });

describe('Testing App Stateful Component', () => {
  let wrapper: ShallowWrapper<{}, State, App>;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('render()', () => {
    it('should render child components', () => {
      expect(wrapper.find(LeftNav)).toHaveLength(1);
      expect(wrapper.find(OptionBar)).toHaveLength(1);
      expect(wrapper.find(D3Wrapper)).toHaveLength(1);
      expect(wrapper.find(TabBar)).toHaveLength(1);
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

  describe('selectNetwork()', () => {
    it('should update view to "networks"', () => {
      wrapper.instance().selectNetwork('dummy-network');
      expect(wrapper.state().view).toBe('networks');
    });
    it('should updated selectedNetwork to passed in string', () => {
      expect(wrapper.state().selectedNetwork).toBe('dummy-network');
    });
  });

  describe('convertAndStoreYamlJSON()', () => {
    let yamlText: string;

    beforeAll(() => {
      yamlText = fs
        .readFileSync(path.resolve(__dirname, '../samples/docker-compose1.yml'))
        .toString();
      wrapper.instance().convertAndStoreYamlJSON(yamlText);
    });

    afterAll(() => {
      delete window.d3State;
      localStorage.removeItem('state');
    });

    it('should update d3State of window', () => {
      expect(window.d3State).toBeTruthy();
      expect(window.d3State.treeDepth).toBe(2);
      expect(window.d3State.simulation).toBeTruthy();
      expect(window.d3State.serviceGraph.nodes).toBeTruthy();
      expect(window.d3State.serviceGraph.links).toBeTruthy();
    });
    it('should set the localstorage with item key "state"', () => {
      expect(localStorage.getItem('state')).toBeTruthy();
    });
    it('should update services in state', () => {
      const serviceNames = Object.keys(wrapper.state().services);
      expect(serviceNames.length).toBe(5);
      const check = serviceNames.filter(
        (n) =>
          n === 'vote' ||
          n === 'result' ||
          n === 'worker' ||
          n === 'redis' ||
          n === 'db',
      );
      expect(check.length).toBe(5);
    });
    it('should update volumes in state', () => {
      const volumes = wrapper.state().volumes;
      expect(volumes.hasOwnProperty('db-data')).toBe(true);
    });
    it('should update bindmounts in state', () => {
      const bindMounts = wrapper.state().bindMounts;
      expect(bindMounts.length).toBe(2);
      const check = bindMounts.filter(
        (n) => n === './vote' || n === './result',
      );
      expect(check.length).toBe(2);
    });
    it('should update networks in state', () => {
      const networks = Object.keys(wrapper.state().networks);
      expect(networks.length).toBe(2);
      const check = networks.filter(
        (n) => n === 'front-tier' || n === 'back-tier',
      );
      expect(check.length).toBe(2);
    });
    it('should set fileOpened to true', () => {
      expect(wrapper.state().fileOpened).toBe(true);
    });
  });

  describe('componentDidMount()', () => {
    let state = {
      fileOpened: true,
      services: {
        db: {
          image: 'postgres',
          environment: [
            'POSTGRES_MULTIPLE_DATABASES=dpc_attribution,dpc_queue,dpc_auth,dpc_consent',
            'POSTGRES_USER=postgres',
            'POSTGRES_PASSWORD=dpc-safe',
          ],
          ports: ['5432:5432'],
          volumes: ['./docker/postgres:/docker-entrypoint-initdb.d'],
        },
        aggregation: {
          image:
            '${ECR_HOST:-755619740999.dkr.ecr.us-east-1.amazonaws.com/dpc-aggregation}:latest',
          ports: ['9901:9900'],
          env_file: ['./ops/config/decrypted/local.env'],
          environment: ['ENV=local', 'JACOCO=${REPORT_COVERAGE}'],
          depends_on: ['db'],
          volumes: [
            'export-volume:/app/data',
            './jacocoReport/dpc-aggregation:/jacoco-report',
          ],
        },
        attribution: {
          image:
            '${ECR_HOST:-755619740999.dkr.ecr.us-east-1.amazonaws.com/dpc-attribution}:latest',
          depends_on: ['db'],
          environment: ['ENV=local', 'JACOCO=${REPORT_COVERAGE}'],
          ports: ['3500:8080', '9902:9900'],
          volumes: ['./jacocoReport/dpc-attribution:/jacoco-report'],
        },
        api: {
          image:
            '${ECR_HOST:-755619740999.dkr.ecr.us-east-1.amazonaws.com/dpc-api}:latest',
          ports: ['3002:3002', '9903:9900'],
          environment: [
            'attributionURL=http://attribution:8080/v1/',
            'ENV=local',
            'JACOCO=${REPORT_COVERAGE}',
            'exportPath=/app/data',
            'JVM_FLAGS=-Ddpc.api.authenticationDisabled=${AUTH_DISABLED:-false}',
          ],
          depends_on: ['attribution'],
          volumes: [
            'export-volume:/app/data',
            './jacocoReport/dpc-api:/jacoco-report',
          ],
        },
        consent: {
          image:
            '${ECR_HOST:-755619740999.dkr.ecr.us-east-1.amazonaws.com/dpc-consent}:latest',
          depends_on: ['db'],
          environment: ['ENV=local', 'JACOCO=${REPORT_COVERAGE}'],
          ports: ['3600:3600', '9004:9900'],
          volumes: ['./jacocoReport/dpc-consent:/jacoco-report'],
        },
        start_core_dependencies: {
          image: 'dadarek/wait-for-dependencies',
          depends_on: ['db'],
          command: 'db:5432',
        },
        start_api_dependencies: {
          image: 'dadarek/wait-for-dependencies',
          depends_on: ['attribution', 'aggregation'],
          command: 'attribution:8080 aggregation:9900',
        },
        start_api: {
          image: 'dadarek/wait-for-dependencies',
          depends_on: ['api'],
          command: 'api:3002',
        },
      },
      volumes: {
        'export-volume': {
          driver: 'local',
          driver_opts: { type: 'none', device: '/tmp', o: 'bind' },
        },
      },
      networks: {},
      bindMounts: [
        './docker/postgres',
        './jacocoReport/dpc-aggregation',
        './jacocoReport/dpc-attribution',
        './jacocoReport/dpc-api',
        './jacocoReport/dpc-consent',
      ],
    };
    beforeAll(() => {
      localStorage.setItem('state', JSON.stringify(state));
      wrapper = shallow(<App />);
    });
    afterAll(() => {
      delete window.d3State;
      localStorage.removeItem('state');
    });

    it('should set state with state from local storage', () => {
      const appState = wrapper.state();
      expect(appState.services).toEqual(state.services);
      expect(appState.volumes).toEqual(state.volumes);
      expect(appState.fileOpened).toBe(true);
      expect(appState.bindMounts).toEqual(state.bindMounts);
    });

    it('should set d3State on the window', () => {
      expect(window.d3State).toBeTruthy();
      expect(window.d3State.treeDepth).toBe(4);
      expect(window.d3State.simulation).toBeTruthy();
      expect(window.d3State.serviceGraph.nodes).toBeTruthy();
      expect(window.d3State.serviceGraph.links).toBeTruthy();
    });
  });
});
