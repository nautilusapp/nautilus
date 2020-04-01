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
  NodeChild,
  Link,
  SNode,
  Volume,
  Port,
  D3State,
} from '../App.d';
import * as d3 from 'd3';

interface SetGlobalVars {
  (services: Services): D3State;
}

const setD3State: SetGlobalVars = services => {
  let links: Link[] = [];
  const nodesObject: NodesObject = Object.keys(services).reduce(
    (acc: NodesObject, sName: string, i) => {
      const ports: string[] = [];
      const volumes: string[] = [];
      const networks: string[] = [];
      /**
       * EXTRACT PORT DATA
       * https://docs.docker.com/compose/compose-file/#ports
       * */
      if (services[sName].hasOwnProperty('ports')) {
        const portsVar = services[sName].ports;
        // short syntax string
        if (typeof portsVar === 'string') {
          ports.push(portsVar);
          // short or long syntax
        } else if (Array.isArray(portsVar)) {
          portsVar.forEach((port: string | Port) => {
            // short syntax
            if (typeof port === 'string') {
              ports.push(port as string);
              // long syntax
            } else if (typeof port === 'object') {
              ports.push(port.published + ':' + port.target);
            }
          });
        }
      }
      /**
       * EXTRACT VOLUME DATA
       * https://docs.docker.com/compose/compose-file/#volumes
       * */
      if (services[sName].hasOwnProperty('volumes')) {
        const volumesVar = services[sName].volumes;
        // short syntax string
        volumesVar!.forEach((vol: string | Volume) => {
          // short syntax
          if (typeof vol === 'string') {
            volumes.push(vol);
            // long syntax
          } else if (typeof vol === 'object') {
            volumes.push(vol.source + ':' + vol.target);
          }
        });
      }
      /**
       * EXTRACT DEPENDS ON DATA
       * https://docs.docker.com/compose/compose-file/#depends_on
       * */
      if (services[sName].hasOwnProperty('depends_on')) {
        services[sName].depends_on!.forEach(el => {
          links.push({ source: el, target: sName });
        });
      }
      /**
       * EXTRACT NETWORKS DATA
       * https://docs.docker.com/compose/compose-file/#networks
       * */
      if (services[sName].hasOwnProperty('networks')) {
        services[sName].networks!.forEach(net => {
          networks.push(net);
        });
      }
      const node = {
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
      acc[sName] = node;
      return acc;
    },
    {},
  );

  //roots object creation, needs to be a deep copy or else deletion of non-roots will remove from nodesObject
  const roots = JSON.parse(JSON.stringify(nodesObject));
  //iterate through links and find if the roots object contains any of the link targets
  links.forEach((link: Link) => {
    if (roots[link.target]) {
      //filter the roots
      delete roots[link.target];
    }
  });

  //create Tree
  const createTree = (node: NodeChild) => {
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
  const createTreeMap = (node: NodeChild, height: number = 0) => {
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
  /**
   *********************
   * Variables for d3 visualizer
   *********************
   */
  const nodes = Object.values(nodesObject);
  const d3State: D3State = {
    treeDepth: Object.keys(treeMap).length,
    serviceGraph: {
      nodes,
      links,
    },
    simulation: d3.forceSimulation<SNode>(nodes),
  };

  return d3State;
};

export default setD3State;
