import {
  /* setD3State, */ extractPorts,
  extractVolumes,
  extractNetworks,
  dagCreator,
} from '../src/renderer/helpers/setD3State';
import { Ports, Volumes, SNode, Link } from '../src/renderer/App.d';

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
});
