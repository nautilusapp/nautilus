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
import React, { Component } from 'react';
import Services from './Service';
import * as d3 from 'd3';
import { SimulationNodeDatum, SimulationLinkDatum } from 'd3';
import { Node, Link, Graph } from '../App.d';
// type dProps = {
//   width: number;
//   height: number;
//   data: {
//     nodes: { name: string }[];
//     links: { source: string; target: string }[];
//   };
// };

// type Refs = {
//   mountPoint?: HTMLDivElement;
// };

// type d3Node = {
//   name: string;
// };

// type d3Link = {
//   source: string;
//   target: string;
// };

class DependsOn extends React.Component<Graph, {}> {
  // props: Graph = whatever is passed in
  // const DependsOn: React.FC<Props> = props => {
  //ctrls: Refs = {};

  componentDidMount() {
    const width = 700;
    const height = 700;
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
        { source: 'ab', target: 'ab-api' },
        { source: 'ab', target: 'ab-pathos' },
        { source: 'cats', target: 'cats-api' },
        { source: 'cats', target: 'cat-pathos' },
        { source: 'ab', target: 'dogs' },
      ],
    };

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
    // re add forceData.nodes in line 97
    const simulation = d3
      .forceSimulation(forceData.nodes)
      .force(
        'link',
        d3
          .forceLink(forceData.links)
          .distance(110)
          .id((d: any) => d.name),
      )
      .force('charge', d3.forceManyBody().strength(-40))
      .force('center', d3.forceCenter(width / 2, height / 2))
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
      .drag()
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

    //create textAndNodes
    let textsAndNodes = forceGraph
      .append('g')
      .selectAll('g')
      .data(forceData.nodes)
      .enter()
      .append('g')
      .call(drag);

    // create texts
    let texts = textsAndNodes.append('text').text((d: any) => d.name);

    //create images
    const imgArray = [
      './src/styles/danny.png',
      './src/styles/aris.png',
      './src/styles/josh.png',
      './src/styles/Mike.png',
      './src/styles/tyler.png',
    ];

    //create rectangles
    let rectangles = textsAndNodes
      .append('rect')
      .attr('width', 40)
      .attr('height', 40)
      .attr('rx', 5)
      .attr('ry', 5)
      .classed('myContainers', true)
      .attr('fill', (d: any) => {
        return 'hsl(' + Math.random() * 360 + ',60%,50%)';
      });

    let image = textsAndNodes
      .append('svg:image')
      .attr('xlink:href', (d: any) => {
        return imgArray[Math.floor(Math.random() * imgArray.length)];
      })
      .attr('height', 40)
      .attr('width', 40);
  }
  render() {
    return (
      <div className="depends-wrapper">
        <div className="forceGraph"></div>
      </div>
    );
  }
}

export default DependsOn;
