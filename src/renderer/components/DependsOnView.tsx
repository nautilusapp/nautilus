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
//import Services from './Service';
import * as d3 from 'd3';
import { getStatic } from '../scripts/static';
import {
  Services,
  Link,
  SGraph,
  SNode,
  SetSelectedContainer,
  Options,
} from '../App.d';
// import Ports from './Ports';

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
   *
   * Depends On View
   *
   */
  useEffect(() => {
    const container = d3.select('.depends-wrapper');
    const width = parseInt(container.style('width'), 10);
    const height = parseInt(container.style('height'), 10);
    const radius = 60; // Used to determine the size of each container for border enforcement

    //initialize graph
    const forceGraph = d3
      .select('.depends-wrapper')
      .append('svg')
      .attr('class', 'graph');

    //set location when ticked
    const ticked = () => {
      // Enforces borders
      textsAndNodes
        .attr('cx', (d: any) => {
          return (d.x = Math.max(radius, Math.min(width - radius, d.x)));
        })
        .attr('cy', (d: any) => {
          return (d.y = Math.max(radius, Math.min(height - radius, d.y)));
        })
        .attr('transform', (d: any) => {
          return 'translate(' + d.x + ',' + d.y + ')';
        });

      link
        .attr('x1', (d: any) => d.source.x + 30)
        .attr('y1', (d: any) => d.source.y + 30)
        .attr('x2', (d: any) => d.target.x + 30)
        .attr('y2', (d: any) => d.target.y + 30);
    };

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
      .force('center', d3.forceCenter<SNode>(width / 2, height / 2))
      .on('tick', ticked);

    const svg = d3
      .select('.depends-wrapper')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    svg
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

    const dragstarted = (d: any) => {
      // simulation.alphaTarget(0.3).restart();
      // d.fx = d3.event.x;
      // d.fy = d3.event.y;
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    };

    const dragged = (d: any) => {
      //alpha hit 0 it stops. make it run again
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    };

    const dragended = (d: any) => {
      // alpha min is 0, head there
      // simulation.alphaTarget(0);
      // d.fx = null;
      // d.fy = null;
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = d.x;
      d.fy = d.y;
    };

    //sets 'clicked' nodes back to unfixed position
    const dblClick = (d: any) => {
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
      .on('click', (node: any) => {
        setSelectedContainer(node.name);
      })
      .on('dblclick', dblClick)
      .call(drag);

    // create texts
    textsAndNodes.append('text').text((d: any) => d.name);

    //create container images
    textsAndNodes
      .append('svg:image')
      .attr('xlink:href', (d: any) => {
        return getStatic('container.svg');
      })
      .attr('height', 60)
      .attr('width', 60);

    return () => {
      forceGraph.remove();
    };
  }, [services]);

  /**
   *
   * PORTS OPTION TOGGLE
   *
   */
  useEffect(() => {
    // CREATE PORTS
    let nodesWithPorts: d3.Selection<SVGGElement, SNode, any, any>;
    let ports: d3.Selection<SVGCircleElement, SNode, any, any>;
    let portText: d3.Selection<SVGTextElement, SNode, any, any>;
    if (options.ports) {
      nodesWithPorts = d3
        .select('.nodes')
        .selectAll<SVGGElement, SNode>('g')
        .filter((d: SNode) => d.ports.length > 0);

      ports = nodesWithPorts
        .append('circle')
        .attr('class', 'port')
        .attr('cx', 58)
        .attr('cy', 45)
        .attr('r', 5);

      portText = nodesWithPorts
        .append('text')
        .text((d: SNode) => d.ports[0])
        .attr('class', 'ports-text')
        .attr('color', 'white')
        .attr('dx', 63)
        .attr('dy', 50);
    }

    return () => {
      if (options.ports) {
        ports.remove();
        portText.remove();
      }
    };
  }, [options.ports]);

  return (
    <>
      <div className="depends-wrapper" />
    </>
  );
};

export default DependsOnView;
