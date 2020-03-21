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
// import { getStatic } from '../scripts/static';
import {
  Services,
  Link,
  SGraph,
  SNode,
  // SetSelectedContainer,
  Options,
} from '../App.d';

type Props = {
  services: Services;
  // setSelectedContainer: SetSelectedContainer;
  options: Options;
};

const NetworksView: React.FC<Props> = ({
  services,
  // setSelectedContainer,
  options,
}) => {
  let links: Link[] = [];
  const nodes: SNode[] = Object.keys(services).map((name: string, id) => {
    const networks: { [network: string]: string } = {};
    const ports: string[] = [];
    const volumes: string[] = [];
    if (services[name].hasOwnProperty('networks')) {
      services[name].networks.forEach(network => {
        networks[name]
      });
    }
  if (services[name].hasOwnProperty('ports')) {
    services[name].ports.forEach(port => {
      ports.push(port);
    });
  }
  if (services[name].hasOwnProperty('volumes')) {
    services[name].volumes.forEach(vol => {
      volumes.push(vol);
    });
  }
  if (services[name].hasOwnProperty('depends_on')) {
    services[name].depends_on.forEach(el => {
      links.push({ source: el, target: name });
    });
  }
  return {
    id,
    name,
    ports,
    volumes,
    networks
  };
  });

  const serviceGraph: SGraph = {
    nodes,
    links,
  };

  useEffect(() => {
    const container = d3.select('.depends-wrapper');
    const width = parseInt(container.style('width'), 10);
    const height = parseInt(container.style('height'), 10);
    const topMargin = 20;
    const sideMargin = 20;
    const radius = 60; // Used to determine the size of each container for border enforcement

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
     // simulation.force('center', d3.forceCenter<SNode>(w / 2, h / 2));
   };
    return () => {
      // forceGraph.remove();
    };
  }, [services]);

  return (
    <>
      <div className="networks-wrapper" />
    </>
  );
};

export default NetworksView;
