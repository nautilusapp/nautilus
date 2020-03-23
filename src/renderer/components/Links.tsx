/**
 * ************************************
 *
 * @module  Links.tsx
 * @author
 * @date 3/23/20
 * @description Rendering of the nodes in d3 simulation
 *
 * ************************************
 */
import React, { useEffect } from 'react';
import * as d3 from 'd3';
// IMPORT HELPER FUNCTIONS
import { Link, Services } from '../App.d';
// IMPORT TYPES

type Props = {
  links: Link[];
  services: Services;
};

const Links: React.FC<Props> = ({ links, services }) => {
  useEffect(() => {
    //initialize graph
    const forceGraph = d3.select('.graph');

    const arrowsGroup = forceGraph
      .append('svg:defs')
      .attr('class', 'arrowsGroup');

    arrowsGroup
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

    const linkGroup = d3.select('.links');

    const linkLines = linkGroup
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke-width', 3)
      .attr('stroke', 'pink')
      .attr('class', 'link')
      .attr('marker-end', 'url(#end)');

    linkGroup.lower();

    return () => {
      linkLines.remove();
      arrowsGroup.remove();
    };
  }, [services]);

  return <g className="links"></g>;
};

export default Links;
