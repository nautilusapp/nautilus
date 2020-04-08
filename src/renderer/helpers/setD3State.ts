/**
 * ************************************
 *
 * @module  setGlobalVars.ts
 * @author
 * @date 3/24/20
 * @description algorithm to set global vars for forcegraph simulation
 *
 * ************************************
 */
import {
  Services,
  NodesObject,
  TreeMap,
  Link,
  SNode,
  Volume,
  Port,
  D3State,
  Volumes,
  Ports,
} from '../App.d';
import * as d3 from 'd3';
import { parentPort } from 'worker_threads';

interface SetD3State {
  (services: Services): D3State;
}

/**
 * ********************
 * EXTRACTOR FUNCTIONS
 * ********************
 */

// PORTS: https://docs.docker.com/compose/compose-file/#ports
interface ExtractPorts {
  (portsData: Ports): string[];
}
export const extractPorts: ExtractPorts = (portsData) => {
  const ports: string[] = [];
  // short syntax string
  if (typeof portsData === 'string') {
    ports.push(portsData);
    // short or long syntax
  } else if (Array.isArray(portsData)) {
    portsData.forEach((port: string | Port) => {
      // short syntax
      if (typeof port === 'string') {
        const end = port.indexOf('/') !== -1 ? port.indexOf('/') : port.length;
        ports.push(port.slice(0, end));
        // long syntax
      } else if (typeof port === 'object') {
        ports.push(port.published + ':' + port.target);
      }
    });
  }

  return ports;
};

// VOLUMES: https://docs.docker.com/compose/compose-file/#volumes
interface ExtractVolumes {
  (VolumesData: Volumes): string[];
}
export const extractVolumes: ExtractVolumes = (volumesData) => {
  const volumes: string[] = [];
  // short syntax string
  volumesData!.forEach((vol: string | Volume) => {
    // short syntax
    if (typeof vol === 'string') {
      volumes.push(vol);
      // long syntax
    } else if (typeof vol === 'object') {
      volumes.push(vol.source + ':' + vol.target);
    }
  });
  return volumes;
};

// NETWORKS: https://docs.docker.com/compose/compose-file/#networks
interface ExtractNetworks {
  (networksData: string[] | {}): string[];
}
export const extractNetworks: ExtractNetworks = (networksData) => {
  const networks = Array.isArray(networksData)
    ? networksData
    : Object.keys(networksData);
  return networks;
};

// DEPENDS_ON: https://docs.docker.com/compose/compose-file/#depends_on
interface ExtractDependsOn {
  (services: Services): Link[];
}
export const extractDependsOn: ExtractDependsOn = (services) => {
  const links: Link[] = [];

  Object.keys(services).forEach((sName: string) => {
    if (services[sName].hasOwnProperty('depends_on')) {
      services[sName].depends_on!.forEach((el) => {
        links.push({ source: el, target: sName });
      });
    }
  });

  return links;
};

/**
 * *************
 * DAG CREATOR
 * *************
 * adds dag properties a d3 array of nodes passed in and returns depth of tree
 */
interface DagCreator {
  (nodesObject: SNode[], Links: Link[]): number;
}
export const dagCreator: DagCreator = (nodes, links) => {
  //roots object creation, needs to be a deep copy or else deletion of non-roots will remove from nodesObject
  const nodesObject: NodesObject = {};
  nodes.forEach((node) => {
    nodesObject[node.name] = node;
  });

  const roots = JSON.parse(JSON.stringify(nodesObject));
  //iterate through links and find if the roots object contains any of the link targets
  links.forEach((link: Link) => {
    if (roots[link.target]) {
      //filter the roots
      delete roots[link.target];
    }
  });

  //create Tree
  const createTree = (node: NodesObject) => {
    Object.keys(node).forEach((root: string) => {
      links.forEach((link: Link) => {
        if (link.source === root) {
          node[root].children[link.target] = nodesObject[link.target];
        }
      });
      createTree(node[root].children);
    });
  };
  createTree(roots);

  //traverse tree and create object outlining the rows/columns in each tree
  const treeMap: TreeMap = {};
  const createTreeMap = (node: NodesObject, height: number = 0) => {
    if (!treeMap[height] && Object.keys(node).length > 0) treeMap[height] = [];
    Object.keys(node).forEach((sName: string) => {
      treeMap[height].push(sName);
      createTreeMap(node[sName].children, height + 1);
    });
  };
  createTreeMap(roots);

  // populate nodesObject with column, row, and rowLength
  const storePositionLocation = (treeHierarchy: TreeMap) => {
    Object.keys(treeHierarchy).forEach((row: string) => {
      treeHierarchy[row].forEach((sName: string, column: number) => {
        nodesObject[sName].row = Number(row);
        if (!nodesObject[sName].column) nodesObject[sName].column = column + 1;
        nodesObject[sName].rowLength = treeHierarchy[row].length;
      });
    });
  };
  storePositionLocation(treeMap);

  return Object.keys(treeMap).length;
};

/**
 * ********************
 * @param services
 * @returns an object with serviceGraph, simulation and treeDepth properties
 * ********************
 */
const setD3State: SetD3State = (services) => {
  const links: Link[] = [];
  Object.keys(services).forEach((sName: string) => {
    if (services[sName].hasOwnProperty('depends_on')) {
      services[sName].depends_on!.forEach((el) => {
        links.push({ source: el, target: sName });
      });
    }
  });

  const nodes = Object.keys(services).map((sName: string, i) => {
    // extract ports data if available
    const ports = services[sName].hasOwnProperty('ports')
      ? extractPorts(services[sName].ports as Ports)
      : [];
    // extract volumes data if available
    const volumes: string[] = services[sName].hasOwnProperty('volumes')
      ? extractVolumes(services[sName].volumes as Volumes)
      : [];
    // extract networks data if available
    const networks: string[] = services[sName].hasOwnProperty('networks')
      ? extractNetworks(services[sName].networks as string[])
      : [];
    const node: SNode = {
      id: i,
      name: sName,
      ports,
      volumes,
      networks,
      children: {},
      row: 0,
      rowLength: 0,
      column: 0,
    };
    return node;
  });

  const treeDepth = dagCreator(nodes, links);
  /**
   *********************
   * Variables for d3 visualizer
   *********************
   */
  const d3State: D3State = {
    treeDepth,
    serviceGraph: {
      nodes,
      links,
    },
    simulation: d3.forceSimulation<SNode>(nodes),
  };

  return d3State;
};

export default setD3State;
