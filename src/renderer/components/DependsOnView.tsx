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

  const serviceGraph: SGraph = {
    nodes,
    links,
  };

  let textsAndNodes: d3.Selection<SVGGElement, SNode, any, any>;

  /**
   *********************
   * Depends On View
   *********************
   */
  useEffect(() => {
    const container = d3.select('.depends-wrapper');
    const width = parseInt(container.style('width'), 10);
    // const height = parseInt(container.style('height'), 10);
    const topMargin = 20;
    const sideMargin = 20;
    const radius = 60; // Used to determine the size of each container for border enforcement

    //create roots object that starts with all of the keys of services and values of true (just a placeholder)

    const roots = Object.keys(services).reduce((acc: Roots, el) => {
      acc[el] = true;
      return acc;
    }, {});
    //iterate through links and find if the roots object contains any of the link targets
    links.forEach(el => {
      if (roots[el.target]) {
        //filter the roots
        delete roots[el.target];
      }
    });
    //evaluate number of roots and determine the width of the d3 simulation to
    //determine how many segments it can be split into with the roots in the middle
    const rootNumbers = Object.keys(roots).length;
    const rootDisplacement = width / (rootNumbers + 1);
    let rootLocation = rootDisplacement;
    // store the x location of the root within the roots object
    Object.keys(roots).forEach(el => {
      roots[el] = rootLocation;
      rootLocation += rootDisplacement;
    });

    //initialize graph
    const forceGraph = d3
      .select('.depends-wrapper')
      .append('svg')
      .attr('class', 'graph');

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

      link
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

    forceGraph
      .append('svg:defs')
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

    //create Links with arrowheads
    const link = forceGraph
      .append('g')
      .selectAll('line')
      .data(serviceGraph.links)
      .enter()
      .append('line')
      .attr('stroke-width', 3)
      .attr('stroke', 'pink')
      .attr('class', 'link')
      .attr('marker-end', 'url(#end)');

    const dragstarted = (d: SNode) => {
      // simulation.alphaTarget(0.3).restart();
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d3.event.x;
      d3.event.y;
    };

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
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended);

    //create textAndNodes Group
    textsAndNodes = forceGraph
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
        if (roots[d.name]) {
          return (d.fx = roots[d.name] as number);
        } else {
          return (d.fx = null);
        }
      })
      .attr('fy', (d: SNode) => {
        if (roots[d.name]) {
          return (d.fy = 30); // fixed y position
        } else {
          return (d.fy = null);
        }
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

  return (
    <>
      <div className="depends-wrapper" />
    </>
  );
};

export default DependsOnView;
