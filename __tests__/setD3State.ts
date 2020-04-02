import setD3State, {
  extractPorts,
  extractVolumes,
  extractNetworks,
  dagCreator,
} from '../src/renderer/helpers/setD3State';
import {
  Ports,
  Volumes,
  SNode,
  Link,
  Services,
  D3State,
} from '../src/renderer/App.d';

describe('Set D3 State Functions', () => {
  describe('extractPorts()', () => {
    let portsData: Ports;

    it('should extract ports if using short syntax', () => {
      portsData = '3000:3000';
      expect(extractPorts(portsData)).toEqual(['3000:3000']);
      portsData = ['3000:3000', '80:80'];
      expect(extractPorts(portsData)[1]).toEqual('80:80');
    });

    it('should extract ports if using long syntax', () => {
      portsData = [
        {
          mode: 'test',
          protocol: 'test',
          published: 5050,
          target: 5050,
        },
      ];
      expect(extractPorts(portsData)[0]).toEqual('5050:5050');
    });
  });

  describe('extractVolumes()', () => {
    let volumesData: Volumes;

    it('should extract volumes if using short syntax', () => {
      volumesData = [
        '/opt/data/:/var/lib/mysql',
        'datavolume:/var/lib/datavolume',
      ];
      expect(extractVolumes(volumesData)[0]).toEqual(
        '/opt/data/:/var/lib/mysql',
      );
      expect(extractVolumes(volumesData)[1]).toEqual(
        'datavolume:/var/lib/datavolume',
      );
    });

    it('should extract volumes if using long syntax', () => {
      volumesData = [
        {
          type: 'test',
          source: 'myTestVolume',
          target: '/var/src/myTestVolume',
        },
      ];
      expect(extractVolumes(volumesData)[0]).toEqual(
        'myTestVolume:/var/src/myTestVolume',
      );
    });
  });

  describe('extractNetworks()', () => {
    let networksData: string[] | {};
    it('should handle networks as an array', () => {
      networksData = ['main', 'secondary', 'third'];
      expect(extractNetworks(networksData)).toEqual([
        'main',
        'secondary',
        'third',
      ]);
    });

    it('should handle networks as an object', () => {
      networksData = {
        main: {},
        secondary: {},
        third: {},
      };
      expect(extractNetworks(networksData)).toEqual([
        'main',
        'secondary',
        'third',
      ]);
    });
  });

  describe('dagCreator()', () => {
    let nodes: SNode[];
    let links: Link[];

    beforeEach(() => {
      nodes = [
        {
          id: 0,
          name: 'web',
          ports: [],
          volumes: [],
          networks: [],
          children: {},
          row: 0,
          rowLength: 0,
          column: 0,
        },
        {
          id: 1,
          name: 'user-api',
          ports: [],
          volumes: [],
          networks: [],
          children: {},
          row: 0,
          rowLength: 0,
          column: 0,
        },
        {
          id: 2,
          name: 'feed-api',
          ports: [],
          volumes: [],
          networks: [],
          children: {},
          row: 0,
          rowLength: 0,
          column: 0,
        },
        {
          id: 3,
          name: 'db',
          ports: [],
          volumes: [],
          networks: [],
          children: {},
          row: 0,
          rowLength: 0,
          column: 0,
        },
        {
          id: 4,
          name: 'web2',
          ports: [],
          volumes: [],
          networks: [],
          children: {},
          row: 0,
          rowLength: 0,
          column: 0,
        },
      ];
      links = [
        {
          source: 'db',
          target: 'user-api',
        },
        {
          source: 'db',
          target: 'feed-api',
        },
        {
          source: 'feed-api',
          target: 'web',
        },
        {
          source: 'user-api',
          target: 'web',
        },
      ];
      dagCreator(nodes, links);
    });

    it('should return correct tree depth', () => {
      expect(dagCreator(nodes, links)).toBe(3);
    });

    it('should handle multiple roots', () => {
      expect(nodes[3].row).toBe(0);
      expect(nodes[4].row).toBe(0);
    });

    it('should place nodes at correct row in tree', () => {
      expect(nodes[0].row).toBe(2);
      expect(nodes[1].row).toBe(1);
      expect(nodes[2].row).toBe(1);
    });

    it('should give nodes correct row length', () => {
      /**
       * POSSIBLE ERROR
       * if child has multiple parents, it creates column for each parent
       */
      expect(nodes[0].rowLength).toBe(2);
      expect(nodes[1].rowLength).toBe(2);
      expect(nodes[3].rowLength).toBe(2);
    });

    it('should give nodes in same row different columns', () => {
      expect(nodes[3].column).not.toBe(nodes[4].column);
      expect(nodes[1].column).not.toBe(nodes[2].column);
    });
  });

  describe('Main Func: setD3State()', () => {
    let d3State: D3State;
    let services: Services = {
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
    };

    beforeAll(() => {
      d3State = setD3State(services);
    });

    it('should return an object with the correct properties', () => {
      expect(d3State.hasOwnProperty('treeDepth')).toBe(true);
      expect(d3State.hasOwnProperty('serviceGraph')).toBe(true);
      expect(d3State.hasOwnProperty('simulation')).toBe(true);
    });

    it('should create a node for all services', () => {
      expect(d3State.serviceGraph.nodes.length).toBe(8);
    });

    it('should give nodes the correct name', () => {
      const db = d3State.serviceGraph.nodes.filter(node => node.name === 'db');
      expect(db.length).toBe(1);
      expect(db[0].name).toBe('db');
    });

    it('should create a link for each depends on connection', () => {
      expect(d3State.serviceGraph.links.length).toBe(8);
    });

    it('should give links correct target and source', () => {
      const dbLinks = d3State.serviceGraph.links.filter(
        link => link.source === 'db',
      );
      expect(dbLinks.length).toBe(4);
      const targets = dbLinks.filter(
        link =>
          link.target === 'start_core_dependencies' ||
          link.target === 'consent' ||
          link.target === 'attribution' ||
          link.target === 'aggregation',
      );
      expect(targets.length).toBe(4);
    });

    it('should contain the correct treeDepth', () => {
      expect(d3State.treeDepth).toBe(4);
    });
  });
});
