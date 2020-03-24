/**
 * ************************************
 *
 * @module  DependsOnView.tsx
 * @author
 * @date 3/11/20
 * @description Display area for services containers in Depends_On view : force-graph
 *
 * ************************************
 */
import React, { useEffect } from 'react';
import * as d3 from 'd3';

// IMPORT COMPONENTS
import Nodes from './Nodes';
import Links from './Links';

//IMPORT HELPER FNS
import {
  getHorizontalPosition,
  getVerticalPosition,
} from '../helpers/getSimulationDimensions';

// IMPORT STYLES
import {
  Services,
  Link,
  SGraph,
  SNode,
  SetSelectedContainer,
  Options,
  NodesObject,
  TreeMap,
  NodeChild,
  Networks,
  ViewT,
} from '../App.d';

type Props = {
  services: Services;
  setSelectedContainer: SetSelectedContainer;
  options: Options;
  networks: Networks;
  view: ViewT;
};

const View: React.FC<Props> = ({
  services,
  setSelectedContainer,
  options,
  view,
  networks,
}) => {
  let links: Link[] = [];
  const nodesObject: NodesObject = Object.keys(services).reduce(
    (acc: NodesObject, sName: string, i) => {
      const ports: string[] = [];
      const volumes: string[] = [];
      if (services[sName].hasOwnProperty('ports')) {
        services[sName].ports.forEach(port => {
          ports.push(port);
        });
      }
      if (services[sName].hasOwnProperty('volumes')) {
        services[sName].volumes.forEach(vol => {
          volumes.push(vol);
        });
      }
      if (services[sName].hasOwnProperty('depends_on')) {
        services[sName].depends_on.forEach(el => {
          links.push({ source: el, target: sName });
        });
      }
      const node = {
        id: i,
        name: sName,
        ports,
        volumes,
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
  const treeDepth = Object.keys(treeMap).length;
  const nodes = Object.values(nodesObject);
  const serviceGraph: SGraph = {
    nodes,
    links,
  };

  const simulation = d3.forceSimulation<SNode>(serviceGraph.nodes).force(
    'link',
    d3
      .forceLink<SNode, Link>(serviceGraph.links)
      .distance(130)
      .id((node: SNode) => node.name),
  );

  /**
   *********************
   * Depends On View
   *********************
   */
  useEffect(() => {
    const container = d3.select('.view-wrapper');
    const width = parseInt(container.style('width'));
    const height = parseInt(container.style('height'));
    const topMargin = 20;
    const sideMargin = 20;
    const radius = 60; // Used to determine the size of each container for border enforcement

    const d3Nodes = d3.select('.nodes').selectAll('g');
    const linkLines = d3.select('.links').selectAll('line');

    //set location when ticked
    function ticked() {
      const w = parseInt(container.style('width'));
      const h = parseInt(container.style('height'));
      // Enforces borders

      d3Nodes
        .attr('cx', (d: any) => {
          return (d.x = Math.max(
            sideMargin,
            Math.min(w - sideMargin - radius, d.x as number),
          ));
        })
        .attr('cy', (d: any) => {
          return (d.y = Math.max(
            15 + topMargin,
            Math.min(h - topMargin - radius, d.y as number),
          ));
        })
        .attr('transform', (d: any) => {
          return 'translate(' + d.x + ',' + d.y + ')';
        });

      linkLines
        .attr('x1', (d: any) => d.source.x + 30)
        .attr('y1', (d: any) => d.source.y + 30)
        .attr('x2', (d: any) => d.target.x + 30)
        .attr('y2', (d: any) => d.target.y + 30);

      // simulation.force('center', d3.forceCenter<SNode>(w / 2, h / 2));
    }

    if (view === 'depends_on') {
      simulation.force('charge', d3.forceManyBody<SNode>().strength(-400));
      d3Nodes
        .attr('fx', (d: any) => {
          //assign the initial x location to the relative displacement from the left
          return (d.fx = getHorizontalPosition(d, width));
        })
        .attr('fy', (d: any) => {
          return (d.fy = getVerticalPosition(d, treeDepth, height));
        });
      simulation.on('tick', ticked);
    } else {
      d3Nodes
        .attr('fx', (d: any) => {
          return (d.fx = null);
        })
        .attr('fy', (d: any) => {
          return (d.fy = null);
        });

      const networkHolder: { [networkString: string]: boolean } = {};
      const getSpacing = (): number => {
        nodes.forEach((d: SNode): void => {
          if (d.networks) {
            let networkString = '';
            d.networks.sort();
            d.networks.forEach(network => {
              networkString += network;
            });
            networkHolder[networkString] = true;
          }
        });
        return width / (Object.keys(networkHolder).length + 1);
      };
      const spacing = getSpacing();
      const forceX = d3
        .forceX((d: SNode): any => {
          if (d.networks) {
            if (d.networks.length === 0) return width / 2;
            let networkString = '';
            d.networks.sort();
            d.networks.forEach(network => {
              networkString += network;
            });
            const place = Object.keys(networkHolder).indexOf(networkString);
            networkString = '';
            return (place + 1) * spacing;
          }
          return width / 2;
        })
        .strength(0.5);

      const forceY = d3.forceY(height / 2).strength(0.5);
      //create force simulation
      simulation
        .force('x', forceX)
        .force('y', forceY)
        .force('charge', d3.forceManyBody<SNode>().strength(-radius * 3))
        .force('collide', d3.forceCollide(radius / 2))
        .on('tick', ticked);
    }

    // move force graph with resizing window
    window.addEventListener('resize', ticked);
  }, [view]);

  /**
   *********************
   * DEPENDS ON OPTION TOGGLE
   *********************
   */
  useEffect(() => {
    if (options.dependsOn) {
      d3.select('.arrowsGroup').classed('hide', false);
      d3.select('.links').classed('hide', false);
    } else {
      d3.select('.arrowsGroup').classed('hide', true);
      d3.select('.links').classed('hide', true);
    }
  }, [options.dependsOn]);

  return (
    <>
      <div className="view-wrapper">
        <svg className="graph">
          <Nodes
            simulation={simulation}
            treeDepth={treeDepth}
            nodes={serviceGraph.nodes}
            setSelectedContainer={setSelectedContainer}
            services={services}
            options={options}
          />
          <Links
            links={serviceGraph.links}
            services={services}
            options={options}
          />
        </svg>
      </div>
    </>
  );
};

export default View;
