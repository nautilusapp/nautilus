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
  Networks,
} from '../App.d';

type Props = {
  services: Services;
  setSelectedContainer: SetSelectedContainer;
  options: Options;
  networks: Networks;
};

const NetworksView: React.FC<Props> = ({
  services,
  setSelectedContainer,
  options,
  networks,
}) => {
  let links: Link[] = [];
  const nodes: SNode[] = Object.keys(services).map((name: string, id) => {
    const networks: string[] = [];
    const ports: string[] = [];
    const volumes: string[] = [];
    if (services[name].hasOwnProperty('networks')) {
      services[name].networks.forEach(network => {
        networks.push(network);
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
      // services[name].depends_on.forEach(el => {
      //   links.push({ source: el, target: name });
      // });
      console.log('hey there stop bugging out');
    }
    return {
      id,
      name,
      ports,
      volumes,
      networks,
    };
  });

  const serviceGraph: SGraph = {
    nodes,
    links,
  };

  let textsAndNodes: d3.Selection<SVGGElement, SNode, any, any>;

  const factorial = (n: number): number => {
    if (n === 1) return n;
    return n * factorial(n - 1);
  };

  useEffect(() => {
    const container = d3.select('.networks-wrapper');
    const width = parseInt(container.style('width'));
    const height = parseInt(container.style('height'));
    const topMargin = 20;
    const sideMargin = 20;
    const radius = 60; // Used to determine the size of each container for border enforcement

    //initialize graph
    const forceGraph = d3
      .select('.networks-wrapper')
      .append('svg')
      .attr('class', 'graph')
      .attr('transform', `translate(${0}${0})`);

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
      // link
      //   .attr('x1', (d: any) => d.source.x + 30)
      //   .attr('y1', (d: any) => d.source.y + 30)
      //   .attr('x2', (d: any) => d.target.x + 30)
      //   .attr('y2', (d: any) => d.target.y + 30);

      // simulation.force('center', d3.forceCenter<SNode>(w / 2, h / 2));
    };

    // move force graph with resizing window
    window.addEventListener('resize', ticked);

    // const forceX = d3.forceX(width / 2);
    const networkHolder: { [networkString: string]: boolean } = {};

    const getSpacing = (): number => {
      console.log('<---');
      nodes.forEach((d: SNode): void => {
        if (d.networks) {
          let networkString = '';
          d.networks.sort();
          d.networks.forEach(network => {
            networkString += network;
          });
          networkHolder[networkString] = true;
          console.log('-->', networkHolder);
          networkString = '';
        }
      });
      console.log(networkHolder);
      // if (Object.keys(networkHolder).length <= 0) {
      //   return width / 2;
      // }
      return width / (Object.keys(networkHolder).length + 1);
    };
    const spacing = getSpacing();
    console.log('spacing', spacing);
    const forceX = d3
      .forceX((d: SNode): any => {
        // const networksArray = Object.keys(networks);
        if (d.networks) {
          if (d.networks.length === 0) return width / 2;
          let networkString = '';
          d.networks.sort();
          d.networks.forEach(network => {
            networkString += network;
          });
          const place = Object.keys(networkHolder).indexOf(networkString);
          networkString = '';
          return (place + 1) * spacing;
        }
        return width / 2;
      })
      .strength(0.5);

    const forceY = d3.forceY(height / 2);
    //create force simulation
    const simulation = d3
      .forceSimulation<SNode>(serviceGraph.nodes)
      // .force(
      //   'link',
      //   d3
      //     .forceLink<SNode, Link>(serviceGraph.links)
      //     .distance(130)
      //     .id((node: SNode) => node.name),
      // )
      .force('x', forceX)
      .force('y', forceY)
      .force('charge', d3.forceManyBody<SNode>().strength(-radius * 3))
      .force('collide', d3.forceCollide(radius / 2))
      // .force('center', d3.forceCenter<SNode>(width / 2, height / 2))
      .on('tick', ticked);

    forceGraph
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
    // const link = forceGraph
    //   .append('g')
    //   .selectAll('line')
    //   .data(serviceGraph.links)
    //   .enter()
    //   .append('line')
    //   .attr('stroke-width', 3)
    //   .attr('stroke', 'pink')
    //   .attr('class', 'link')
    //   .attr('marker-end', 'url(#end)');

    const dragstarted = (d: SNode) => {
      // simulation.alphaTarget(0.3).restart();
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d3.event.x;
      d3.event.y;
    };

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
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended);

    //create textAndNodes Group
    textsAndNodes = forceGraph
      .append('g')
      .attr('class', 'nodes')
      .selectAll('.nodes')
      .data<SNode>(serviceGraph.nodes)
      .enter()
      .append('g')
      .on('click', (node: SNode) => {
        setSelectedContainer(node.name);
      })
      .on('dblclick', dblClick)
      .call(drag);
    // .attr('fx', (d: SNode) => {
    //   //assign the initial x location to the relative displacement from the left
    //   return (d.fx =
    //     (width / (servicePosition[d.name].rowLength + 1)) *
    //     servicePosition[d.name].column);
    // })
    // .attr('fy', (d: SNode) => {
    //   return (d.fy = (height / treeDepth) * servicePosition[d.name].row);
    // });

    //create container images
    textsAndNodes
      .append('svg:image')
      .attr('xlink:href', (d: SNode) => {
        return getStatic('container.svg');
      })
      .attr('height', radius)
      .attr('width', radius);

    // create texts
    textsAndNodes
      .append('text')
      .text((d: SNode) => d.name)
      .append('text')
      .text((d: SNode): string => {
        let networkString = '';
        if (d.networks) {
          d.networks.forEach((n: string) => {
            networkString += n + ' ';
          });
        }
        console.error(d);
        return networkString;
      });
    return () => {
      forceGraph.remove();
    };
  }, [services]);

  return (
    <>
      <div className="networks-wrapper" />
    </>
  );
};

export default NetworksView;
