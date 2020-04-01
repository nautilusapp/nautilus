import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NetworksDropDown from '../src/renderer/components/NetworksDropdown';

configure({ adapter: new Adapter() });

describe('Test Networks Dropdown Component', () => {
  let wrapper: any;
  const props = {
    services: {
      dbd: {
        image: 'postgres',
        ports: ['5432:5432'],
        volumes: ['./docker/postgres:/docker-entrypoint-initdb.d'],
        networks: ['hello'],
        depends_on: ['aggregation'],
      },
      aggregation: {
        image:
          '${ECR_HOST:-755619740999.dkr.ecr.us-east-1.amazonaws.com/dpc-aggregation}:latest',
        ports: ['9901:9900'],
        env_file: ['./ops/config/decrypted/local.env'],
        depends_on: ['db'],
        volumes: [
          'export-volume:/app/data',
          './jacocoReport/dpc-aggregation:/jacoco-report',
        ],
        networks: ['hello'],
      },
      attribution: {
        image:
          '${ECR_HOST:-755619740999.dkr.ecr.us-east-1.amazonaws.com/dpc-attribution}:latest',
        depends_on: ['db'],
        ports: ['3500:8080', '9902:9900'],
        volumes: ['./jacocoReport/dpc-attribution:/jacoco-report'],
        networks: ['hello'],
      },
      api: {
        image:
          '${ECR_HOST:-755619740999.dkr.ecr.us-east-1.amazonaws.com/dpc-api}:latest',
        ports: ['3002:3002', '9903:9900'],
        depends_on: ['attribution'],
        volumes: [
          'export-volume:/app/data',
          './jacocoReport/dpc-api:/jacoco-report',
        ],
        networks: ['hello'],
      },
      consent: {
        image:
          '${ECR_HOST:-755619740999.dkr.ecr.us-east-1.amazonaws.com/dpc-consent}:latest',
        depends_on: ['db'],
        ports: ['3600:3600', '9004:9900'],
        volumes: ['./jacocoReport/dpc-consent:/jacoco-report'],
        networks: ['hello'],
      },
      start_core_dependencies: {
        image: 'dadarek/wait-for-dependencies',
        depends_on: ['db'],
        command: 'db:5432',
        networks: ['hello'],
        ports: ['8000'],
      },
      start_api_dependencies: {
        image: 'dadarek/wait-for-dependencies',
        depends_on: ['attribution', 'aggregation'],
        command: 'attribution:8080 aggregation:9900',
        networks: ['hello'],
      },
      start_api: {
        image: 'dadarek/wait-for-dependencies',
        depends_on: ['api'],
        command: 'api:3002',
        networks: ['hello'],
      },
    },
    networks: { hello: null },
    selectNetwork: jest.fn(() => {}),
    selectedNetwork: '',
  };

  beforeAll(() => {
    wrapper = shallow(<NetworksDropDown {...props} />);
  });

  test('should have a disabled networks option', () => {
    expect(wrapper.find('#networkHeader')).toBeDisabled();
  });
});
