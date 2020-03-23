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
//import types
import { SNode, SetSelectedContainer } from '../App.d';

type Props = {
  nodes: SNode[];
  setSelectedContainer: SetSelectedContainer;
};

const Nodes: React.FC<Props> = ({ nodes, setSelectedContainer }) => {
  useEffect(() => {
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
    //create textAndNodes Group
    const textsAndNodes = d3
      .select('.nodes')
      .selectAll('g')
      .data<SNode>(nodes)
      .enter()
      .append('g')
      .on('click', (node: SNode) => {
        setSelectedContainer(node.name);
      })
      .on('dblclick', dblClick)
      .call(drag)
      .attr('fx', (d: SNode) => {
        //assign the initial x location to the relative displacement from the left
        return (d.fx = getHorizontalPosition(d, width));
      })
      .attr('fy', (d: SNode) => {
        return (d.fy = getVerticalPosition(d, treeDepth, height));
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
  });

  return <g className="nodes"></g>;
};

export default Nodes;
