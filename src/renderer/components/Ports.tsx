/**
 * ************************************
 *
 * @module  Ports.tsx
 * @author Joshua Nordstrom
 * @date 3/18/20
 * @description Used to display ports on containers
 *
 * ************************************
 */
import React, { useEffect } from 'react';
import * as d3 from 'd3';

type Props = {};

const Ports: React.FC<Props> = props => {
  let ports;
  useEffect(() => {
    ports = d3
      .selectAll('.nodes')
      .append('circle')
      .attr('class', 'port')
      .attr('cx', 58)
      .attr('cy', 45)
      .attr('r', 5);

    console.log(ports);
  });

  return <svg className="ports">{ports}</svg>;
};

export default Ports;
