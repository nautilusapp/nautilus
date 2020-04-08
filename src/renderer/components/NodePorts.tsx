/**
 * ************************************
 *
 * @module  Ports.tsx
 * @author
 * @date 3/23/20
 * @description Appending ports to nodes in d3
 * @note Doesn't add a react elemnt to dom
 *
 * ************************************
 */
import React, { useEffect } from 'react';
import * as d3 from 'd3';
// IMPORT TYPES
import { SNode } from '../App.d';

type Props = {
  portsOn: boolean;
};

const NodePorts: React.FC<Props> = ({ portsOn }) => {
  useEffect(() => {
    // PORTS SVG VARIABLE
    // border radius
    const rx = 3;
    // size of rectangle
    const width = 43;
    const height = 10;
    // ports location
    const x = 7;
    const y = 24;
    // text location
    const dx = x + 21; // center of text element because of text-anchor
    const dy = y + 8;
    // PORTS VARIABLES
    let nodesWithPorts: d3.Selection<SVGGElement, SNode, any, any>;
    const ports: d3.Selection<SVGRectElement, SNode, any, any>[] = [];
    const portText: d3.Selection<SVGTextElement, SNode, any, any>[] = [];
    if (portsOn) {
      // select all nodes with ports
      nodesWithPorts = d3
        .select('.nodes')
        .selectAll<SVGGElement, SNode>('.node')
        .filter((d: SNode) => d.ports.length > 0);

      // iterate through all nodes with ports
      nodesWithPorts.each(function (d: SNode) {
        const node = this;
        // iterate through all ports of node
        d.ports.forEach((pString, i) => {
          // set font size based on length of ports text
          const textSize = pString.length <= 9 ? '8px' : '7px';
          // add svg port
          const port = d3
            .select<SVGElement, SNode>(node)
            .append('rect')
            .attr('class', 'port')
            .attr('rx', rx)
            .attr('x', x + i * 1.1)
            .attr('y', y + i * (height + 1))
            .attr('width', width)
            .attr('height', height);
          // store d3 object in ports array
          ports.push(port);
          // add svg port text
          const pText = d3
            .select<SVGElement, SNode>(node)
            .append('text')
            .attr('class', 'ports-text')
            .attr('color', 'white')
            .attr('dx', dx + i * 1.1)
            .attr('dy', dy + i * (height + 1))
            .attr('font-size', textSize)
            // center the text in the rectangle
            .append('tspan')
            .text(pString)
            .attr('text-anchor', 'middle');

          // store d3 object in ports text array
          portText.push(pText);
        });
      });
    }

    return () => {
      // before unmounting, if ports option was on, remove the ports
      if (portsOn) {
        ports.forEach((node) => node.remove());
        portText.forEach((node) => node.remove());
      }
    };
    // only fire when options.ports changes
  }, [portsOn]);

  return <></>;
};

export default NodePorts;
