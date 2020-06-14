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

// IMPORT HELPER FUNCTIONS
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

function wrap(text: d3.Selection<SVGTextElement, SNode, d3.BaseType, unknown>) {
  text.each(function () {
    const text = d3.select(this);
    const className = text.attr('class');
    const words = text.text();
    let line = 0;
    const lineLength = 15;
    const maxLine = 3;
    const totalLinesNeeded = Math.ceil(words.length / lineLength);
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
          .attr('dy', currentIndex * 1.7 - 10)
          .attr('class', className);
        if (line < 2 || words.length <= 24) {
          lineText.text(words.slice(currentIndex, currentIndex + lineLength));
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
    console.log('use effect');
    const container = d3.select('.view-wrapper');
    const width = parseInt(container.style('width'), 10);
    const height = parseInt(container.style('height'), 10);

    //sets 'clicked' nodes back to unfixed position
    const dblClick = (d: SNode) => {
      simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    };

    // set up drag feature for nodes
    let drag = d3
      .drag<SVGGElement, SNode>()
      .on('start', function dragstarted(d: SNode) {
        // if simulation has stopped, restart it
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        // set the x and y positions to fixed
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      })
      .on('drag', function dragged(d: SNode) {
        // raise the current selected node to the highest layer
        d3.select(this).raise();
        // change the fx and fy to dragged position
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      })
      .on('end', function dragended(d: SNode) {
        // stop simulation when node is done being dragged
        if (!d3.event.active) simulation.alphaTarget(0);
        // fix the node to the place where the dragging stopped
        d.fx = d.x;
        d.fy = d.y;
      });

    // create node container svgs
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
      // initialize nodes in depends on view
      .attr('x', (d: SNode) => {
        //assign the initial x location to the relative displacement from the left
        return (d.x = getHorizontalPosition(d, width));
      })
      .attr('y', (d: SNode) => {
        return (d.y = getVerticalPosition(d, treeDepth, height));
      });

    //add container image to each node
    nodeContainers
      .append('svg:image')
      .attr('xlink:href', (d: SNode) => {
        return getStatic('box.svg');
      })
      .attr('height', 133)
      .attr('width', 133)
      .attr('class', 'containerImage');

    // add node service name
    nodeContainers
      .append('text')
      .text((d: SNode) => d.name)
      .attr('class', 'nodeLabel')
      .attr('x', 133 / 2)
      .attr('y', 133 / 2)
      .attr('text-anchor', 'middle')
      .call(wrap);
    //add stroke
    /*
    nodeContainers
      .insert('text', '.nodeLabel')
      .text((d: SNode) => d.name)
      .attr('class', 'nodeLabelStroke')
      .attr('x', 133 / 2)
      .attr('y', 133 / 2)
      .attr('text-anchor', 'middle')
      .call(wrap);*/
    return () => {
      // remove containers when services change
      nodeContainers.remove();
    };
  }, [services]);

  console.log('nodes options', options);
  return (
    <g className="nodes">
      <NodePorts portsOn={options.ports} />
      <NodeVolumes volumesOn={options.volumes} getColor={getColor} />
    </g>
  );
};

export default Nodes;
