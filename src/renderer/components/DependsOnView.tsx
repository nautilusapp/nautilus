/**
 * ************************************
 *
 * @module  ServicesWrapper.tsx
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

//import {simulation} from 'd3-simulation';

import { Graph, iNode, Link } from '../App.d';

type Props = {};

const DependsOnView: React.FC<Props> = props => {
  // props: Graph = whatever is passed in
  // const DependsOn: React.FC<Props> = props => {
  console.log('testing');
  useEffect(() => {
    // const width = 700;
    // const height = 700;
    const forceData: Graph = {
      nodes: [
        { name: 'db' },
        { name: 'ag' },
        { name: 'ab' },
        { name: 'ab-api' },
        { name: 'ab-pathos' },
        { name: 'bubble' },
        { name: 'cats' },
        { name: 'cats-api' },
        { name: 'ab-pathos' },
        { name: 'cat-pathos' },
        { name: 'dogs' },
      ],
      links: [
        { source: 'db', target: 'ag' },
        { source: 'db', target: 'ab' },
        { source: 'db', target: 'bubble' },
        { source: 'ab', target: 'ag' },
        { source: 'ab', target: 'ab-api' },
        { source: 'ab', target: 'ab-pathos' },
        { source: 'cats', target: 'cats-api' },
        { source: 'cats', target: 'cat-pathos' },
        { source: 'ab', target: 'dogs' },
      ],
    };

    const container = d3.select('.depends-wrapper');
    const width = parseInt(container.style('width'), 10);
    const height = parseInt(container.style('height'), 10);

    //initialize graph
    const forceGraph = d3
      .select('.forceGraph')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    //set location when ticked
    const ticked = () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);
      textsAndNodes.attr('transform', (d: any) => {
        return 'translate(' + d.x + ',' + d.y + ')';
      });
    };

    //create force simulation
    const simulation = d3
      .forceSimulation<iNode>(forceData.nodes)
      .force(
        'link',
        d3
          .forceLink<iNode, Link>(forceData.links)
          .distance(130)
          .id((node: iNode) => node.name),
      )
      .force('charge', d3.forceManyBody<iNode>().strength(-40))
      .force('center', d3.forceCenter<iNode>(width / 2, height / 2))
      .on('tick', ticked);

    //create Links
    const link = forceGraph
      .append('g')
      .selectAll('line')
      .data(forceData.links)
      .enter()
      .append('line')
      .attr('stroke-width', (d: any) => 3)
      .attr('stroke', 'pink');

    const dragstarted = (d: any) => {
      simulation.alphaTarget(0.3).restart();
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
      simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    };

    let drag = d3
      .drag<SVGGElement, iNode>()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended);

    /* <g>
            <g>
                <text>
                <rectangles>
            </g>
            <g>
                <text>
                <rectangles>
            </g>
        </g>
          */

    //create textAndNodes Group
    let textsAndNodes = forceGraph
      .append('g')
      .selectAll('g')
      .data<iNode>(forceData.nodes)
      .enter()
      .append('g')
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
  });

  return (
    <div className="depends-wrapper">
      <div className="forceGraph"></div>
    </div>
  );
};

export default DependsOnView;
