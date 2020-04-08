/**
 * ************************************
 *
 * @module  Nodes.tsx
 * @author
 * @date 3/23/20
 * @description Rendering of the nodes in d3 simulation
 *
 * ************************************
 */
import React, { useEffect } from 'react';
import * as d3 from 'd3';
// IMPORT HELPER FUNCTIONSf
import {
  getHorizontalPosition,
  getVerticalPosition,
} from '../helpers/getSimulationDimensions';
import { getStatic } from '../helpers/static';
// IMPORT TYPES
import { SNode, SetSelectedContainer, Services, Options } from '../App.d';
// IMPORT COMPONENTS
import NodePorts from './NodePorts';
import NodeVolumes from './NodeVolumes';

type Props = {
  services: Services;
  setSelectedContainer: SetSelectedContainer;
  options: Options;
  getColor: any;
};

function wrap(
  text: d3.Selection<SVGTextElement, SNode, d3.BaseType, unknown>,
  width: number,
) {
  text.each(function () {
    const text = d3.select(this);
    const words = text.text();

    let line = 0;
    const lineLength = 8;
    const maxLine = 3;
    const totalLinesNeeded = Math.ceil(words.length / lineLength);
    console.log(words, totalLinesNeeded);
    if (totalLinesNeeded === 2) {
      text.attr('y', 67);
    }
    const x = text.attr('x');
    const y = text.attr('y');
    if (words.length > 8) {
      text.text('');
      while (line < maxLine) {
        const currentIndex = line * lineLength;
        const lineText = text
          .append('tspan')
          .attr('x', x)
          .attr('y', y)
          .attr('dx', 0)
          .attr('dy', currentIndex * 1.5 - 10)
          .attr('class', 'nodeLabel');
        if (line <= 2) {
          lineText.text(words.slice(currentIndex, currentIndex + 8));
        } else {
          lineText.text(words.slice(currentIndex, currentIndex + 5) + '...');
        }
        line++;
      }
    }
  });
}

const Nodes: React.FC<Props> = ({
  setSelectedContainer,
  services,
  options,
  getColor,
}) => {
  const { simulation, serviceGraph, treeDepth } = window.d3State;
  /**
   *********************
   * RENDER NODES
   *********************
   */
  useEffect(() => {
    const container = d3.select('.view-wrapper');
    const width = parseInt(container.style('width'), 10);
    const height = parseInt(container.style('height'), 10);

    //sets 'clicked' nodes back to unfixed position
    const dblClick = (d: SNode) => {
      simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    };

    let drag = d3
      .drag<SVGGElement, SNode>()
      .on('start', function dragstarted(d: SNode) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d3.event.x;
        d3.event.y;
      })
      .on('drag', function dragged(d: SNode) {
        d3.select(this).raise();
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      })
      .on('end', function dragended(d: SNode) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = d.x;
        d.fy = d.y;
      });

    // create container svgs
    const nodeContainers = d3
      .select('.nodes')
      .selectAll('g')
      .data<SNode>(serviceGraph.nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .on('click', (node: SNode) => {
        setSelectedContainer(node.name);
      })
      .on('dblclick', dblClick)
      .call(drag)
      .attr('x', (d: SNode) => {
        //assign the initial x location to the relative displacement from the left
        return (d.x = getHorizontalPosition(d, width));
      })
      .attr('y', (d: SNode) => {
        return (d.y = getVerticalPosition(d, treeDepth, height));
      });

    //add container images
    nodeContainers
      .append('svg:image')
      .attr('xlink:href', (d: SNode) => {
        return getStatic('container3.svg');
      })
      .attr('height', 75)
      .attr('width', 132);

    // add names of services

    nodeContainers
      .append('text')
      .text((d: SNode) => d.name)
      .attr('class', 'nodeLabel')
      .attr('x', 80)
      .attr('y', 60)
      .attr('text-anchor', 'middle')
      .call(wrap, 1);

    return () => {
      nodeContainers.remove();
    };
  }, [services]);

  return (
    <g className="nodes">
      <NodePorts portsOn={options.ports} />
      <NodeVolumes volumesOn={options.volumes} getColor={getColor} />
    </g>
  );
};

export default Nodes;
