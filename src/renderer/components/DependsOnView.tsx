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
const d3dag = require('d3-dag');
import { colorSchemeHash } from '../common';
import { getStatic } from '../scripts/static';
import {
  Services,
  Link,
  SGraph,
  SNode,
  SetSelectedContainer,
  Options,
  Roots,
} from '../App.d';

type Props = {
  services: Services;
  setSelectedContainer: SetSelectedContainer;
  options: Options;
};

const DependsOnView: React.FC<Props> = ({
  services,
  setSelectedContainer,
  options,
}) => {
  let links: Link[] = [];
  const nodes: SNode[] = Object.keys(services).map((sName: string, i) => {
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
    return {
      id: i,
      name: sName,
      ports: ports,
      volumes: volumes,
    };
  });

  //roots object creation
  const roots = Object.keys(services).reduce((acc: Roots, el) => {
    acc[el] = true;
    return acc;
  }, {});
  //iterate through links and find if the roots object contains any of the link targets
  links.forEach((el: Link) => {
    if (roots[el.target]) {
      //filter the roots
      delete roots[el.target];
    }
  });

  //create dagdata in a format to create a tree
  //start by creating an object containing an id key with the service name
  const dagData = nodes.reduce((acc: any, el: SNode) => {
    acc[el.name] = { id: el.name };
    return acc;
  }, {});
  // populate nodes with parentIds key as an array of nodes
  links.forEach((el: Link) => {
    if (!dagData[el.target].parentIds) {
      dagData[el.target].parentIds = [];
    }
    dagData[el.target].parentIds.push(el.source);
  });
  const dagArray = Object.keys(dagData).reduce((acc: any, el: string) => {
    acc.push(dagData[el]);
    return acc;
  }, []);

  //create tree from dagdata
  const tree = d3dag.dagStratify()(dagArray);

  //create a tree map as an object as follows {[row]: [Node,Node,Node]}
  const treeMap: any = {};
  //create an object with all the service names
  const servicePosition = Object.keys(services).reduce((acc: any, el) => {
    acc[el] = {};
    return acc;
  }, {});
  //the tree functions creates trees differently if there are multiple parents so we need two functions for either case

  //create a tree map as an object as follows {[row]: [Node,Node,Node]}
  const createTreeMapSingleRoot = (node: any, height: number = 0, row = []) => {
    if (!treeMap[height]) treeMap[height] = [];
    treeMap[height].push(node);
    if (node.children) {
      node.children.forEach((el: any) => {
        createTreeMapSingleRoot(el, height + 1);
      });
    }
  };
  //create a tree map as an object as follows {[row]: [Node,Node,Node]}
  const createTreeMap = (node: any, height: number = 0) => {
    if (!treeMap[height]) treeMap[height] = [];
    if (node.children) {
      node.children.forEach((el: any) => {
        treeMap[height].push(el);
        createTreeMap(el, height + 1);
      });
    }
  };
  // if only one root, run singleroot function, else run other function
  Object.keys(roots).length === 1
    ? createTreeMapSingleRoot(tree)
    : createTreeMap(tree);

  //remove duplicates from arrays for each row within Treemap
  Object.keys(treeMap).forEach((row: string) => {
    const services: any = {};
    treeMap[row].forEach((node: SNode, i: number) => {
      if (services[node.id]) {
        treeMap[row].splice(i, 1);
      } else {
        services[node.id] = true;
      }
    });
  });
  //evaluate the depth of the tree
  const treeDepth = Object.keys(treeMap).length;

  const storePositionLocation = (service: string) => {
    Object.keys(treeMap).forEach((row: string) => {
      treeMap[row].forEach((node: any, i: number) => {
        if (node.id === service) {
          servicePosition[service] = {
            row: Number(row),
            column: i + 1,
            rowLength: treeMap[row].length,
          };
        }
      });
    });
  };

  Object.keys(servicePosition).forEach((service: string) => {
    storePositionLocation(service);
  });

  const serviceGraph: SGraph = {
    nodes,
    links,
  };

  /**
   *********************
   * Depends On View
   *********************
   */
  useEffect(() => {
    const container = d3.select('.depends-wrapper');
    const width = parseInt(container.style('width'), 10);
    const height = parseInt(container.style('height'), 10);
    const topMargin = 20;
    const sideMargin = 20;
    const radius = 60; // Used to determine the size of each container for border enforcement

    //create roots object that starts with all of the keys of services and values of true (just a placeholder)

    //evaluate number of roots and determine the width of the d3 simulation to
    //determine how many segments it can be split into with the roots in the middle
    const rootNumbers = Object.keys(roots).length;
    const rootDisplacement = width / (rootNumbers + 1);
    let rootLocation = rootDisplacement;
    Object.keys(roots).forEach(el => {
      roots[el] = rootLocation;
      rootLocation += rootDisplacement;
    });

    //set location when ticked
    const ticked = () => {
      const w = parseInt(container.style('width'));
      const h = parseInt(container.style('height'));
      // Enforces borders
      textsAndNodes
        .attr('cx', (d: SNode) => {
          return (d.x = Math.max(
            sideMargin,
            Math.min(w - sideMargin - radius, d.x as number),
          ));
        })
        .attr('cy', (d: SNode) => {
          return (d.y = Math.max(
            15 + topMargin,
            Math.min(h - topMargin - radius, d.y as number),
          ));
        })
        .attr('transform', (d: SNode) => {
          return 'translate(' + d.x + ',' + d.y + ')';
        });

      linkLines
        .attr('x1', (d: any) => d.source.x + 30)
        .attr('y1', (d: any) => d.source.y + 30)
        .attr('x2', (d: any) => d.target.x + 30)
        .attr('y2', (d: any) => d.target.y + 30);

      // simulation.force('center', d3.forceCenter<SNode>(w / 2, h / 2));
    };

    // move force graph with resizing window
    window.addEventListener('resize', ticked);

    //create force simulation
    const simulation = d3
      .forceSimulation<SNode>(serviceGraph.nodes)
      .force(
        'link',
        d3
          .forceLink<SNode, Link>(serviceGraph.links)
          .distance(130)
          .id((node: SNode) => node.name),
      )
      .force('charge', d3.forceManyBody<SNode>().strength(-400))
      // .force('center', d3.forceCenter<SNode>(width / 2, height / 2))
      .on('tick', ticked);

    const dragged = (d: SNode) => {
      //alpha hit 0 it stops. make it run again
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    };

    const dragended = (d: SNode) => {
      // alpha min is 0, head there
      // simulation.alphaTarget(0);
      // d.fx = null;
      // d.fy = null;
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = d.x;
      d.fy = d.y;
    };

    //sets 'clicked' nodes back to unfixed position
    const dblClick = (d: SNode) => {
      simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    };

    let drag = d3
      .drag<SVGGElement, SNode>()
      .on('start', function dragstarted(d: SNode) {
        d3.select(this).raise();
        // simulation.alphaTarget(0.3).restart();
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d3.event.x;
        d3.event.y;
      })
      .on('drag', dragged)
      .on('end', dragended);

    //initialize graph
    const forceGraph = d3
      .select('.depends-wrapper')
      .append('svg')
      .attr('class', 'graph');

    forceGraph
      .append('svg:defs')
      .attr('class', 'arrowsGroup')
      .selectAll('marker')
      .data(['end']) // Different link/path types can be defined here
      .enter()
      .append('svg:marker') // This section adds in the arrows
      .attr('id', String)
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 22.5)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('svg:path')
      .attr('d', 'M0,-5L10,0L0,5');

    const linkLines = forceGraph
      .append('g')
      .attr('class', 'linksGroup')
      .selectAll('line')
      .data(serviceGraph.links)
      .enter()
      .append('line')
      .attr('stroke-width', 3)
      .attr('stroke', 'pink')
      .attr('class', 'link')
      .attr('marker-end', 'url(#end)');

    //create textAndNodes Group
    const textsAndNodes = forceGraph
      .append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data<SNode>(serviceGraph.nodes)
      .enter()
      .append('g')
      .on('click', (node: SNode) => {
        setSelectedContainer(node.name);
      })
      .on('dblclick', dblClick)
      .call(drag)
      .attr('fx', (d: SNode) => {
        //assign the initial x location to the relative displacement from the left
        return (d.fx =
          (width / (servicePosition[d.name].rowLength + 1)) *
          servicePosition[d.name].column);
      })
      .attr('fy', (d: SNode) => {
        return (d.fy = (height / treeDepth) * servicePosition[d.name].row);
      });

    // create texts
    textsAndNodes.append('text').text((d: SNode) => d.name);

    //create container images
    textsAndNodes
      .append('svg:image')
      .attr('xlink:href', (d: SNode) => {
        return getStatic('container.svg');
      })
      .attr('height', 60)
      .attr('width', 60);

    return () => {
      forceGraph.remove();
    };
  }, [services]);

  /**
   *********************
   * PORTS OPTION TOGGLE
   *********************
   */
  useEffect(() => {
    // PORTS LOCATION
    const cx = 58;
    const cy = 18;
    const radius = 5;
    const dx = cx + radius;
    const dy = cy + radius;
    // PORTS VARIABLES
    let nodesWithPorts: d3.Selection<SVGGElement, SNode, any, any>;
    const ports: d3.Selection<SVGCircleElement, SNode, any, any>[] = [];
    const portText: d3.Selection<SVGTextElement, SNode, any, any>[] = [];
    if (options.ports) {
      // select all nodes with ports
      nodesWithPorts = d3
        .select('.nodes')
        .selectAll<SVGGElement, SNode>('g')
        .filter((d: SNode) => d.ports.length > 0);

      // iterate through all nodes with ports
      nodesWithPorts.each(function(d: SNode) {
        const node = this;
        // iterate through all ports of node
        d.ports.forEach((pString, i) => {
          // add svg port
          const port = d3
            .select<SVGElement, SNode>(node)
            .append('circle')
            .attr('class', 'port')
            .attr('cx', cx)
            .attr('cy', cy + i * 12)
            .attr('r', radius);
          // store d3 object in ports array
          ports.push(port);
          // add svg port text
          const pText = d3
            .select<SVGElement, SNode>(node)
            .append('text')
            .text(pString)
            .attr('class', 'ports-text')
            .attr('color', 'white')
            .attr('dx', dx)
            .attr('dy', dy + i * 12);
          // store d3 object in ports text array
          portText.push(pText);
        });
      });
    }

    return () => {
      // before unmoutning, if ports option was on, remove the ports
      if (options.ports) {
        ports.forEach(node => node.remove());
        portText.forEach(node => node.remove());
      }
    };
    // only fire when options.ports changes
  }, [options.ports]);

  /**
   *********************
   * VOLUMES OPTION TOGGLE
   *********************
   */
  useEffect(() => {
    // VOLUMES LOCATION
    const x = 8;
    const y = 20;
    const width = 10;
    const height = 10;
    // VOLUMES VARIABLES
    let nodesWithVolumes: d3.Selection<SVGGElement, SNode, any, any>;
    const volumes: d3.Selection<SVGRectElement, SNode, any, any>[] = [];
    const volumeText: d3.Selection<SVGTextElement, SNode, any, any>[] = [];
    if (options.volumes) {
      // select all nodes with volumes
      nodesWithVolumes = d3
        .select('.nodes')
        .selectAll<SVGGElement, SNode>('g')
        .filter((d: SNode) => d.volumes.length > 0);

      // iterate through all nodes with volumes
      nodesWithVolumes.each(function(d: SNode) {
        const node = this;
        // iterate through all volumes of node
        d.volumes.forEach((vString, i) => {
          // add svg volume
          const volume = d3
            .select<SVGElement, SNode>(node)
            .append('rect')
            .attr('class', 'volumeSVG')
            .attr('fill', () => {
              let slicedVString: string = colorSchemeHash(
                vString.slice(0, vString.indexOf(':')),
              );
              return slicedVString;
            })
            .attr('width', width)
            .attr('height', height)
            .attr('x', x)
            .attr('y', y + i * 12);
          // store d3 object in volumes array
          volumes.push(volume);
          // add svg volume text
          const vText = d3
            .select<SVGElement, SNode>(node)
            .append('text')
            .text(vString)
            .attr('class', 'volume-text')
            .attr('color', 'black')
            .attr('dx', x + 10)
            .attr('dy', y + (i + 1) * 11);
          // store d3 object in volumes text array
          volumeText.push(vText);
        });
      });
    }

    return () => {
      // before unmounting, if volumes option was on, remove the volumes
      if (options.volumes) {
        volumes.forEach(node => node.remove());
        volumeText.forEach(node => node.remove());
      }
    };
    // only fire when options.volumes changes
  }, [options.volumes]);

  /**
   *********************
   * DEPENDS ON OPTION TOGGLE
   *********************
   */
  useEffect(() => {
    if (options.dependsOn) {
      d3.select('.arrowsGroup').classed('hide', false);
      d3.select('.linksGroup').classed('hide', false);
    } else {
      d3.select('.arrowsGroup').classed('hide', true);
      d3.select('.linksGroup').classed('hide', true);
    }
  }, [options.dependsOn]);

  return (
    <>
      <div className="depends-wrapper" />
    </>
  );
};

export default DependsOnView;
