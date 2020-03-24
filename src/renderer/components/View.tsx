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
import * as d3 from 'd3';

// IMPORT COMPONENTS
import Nodes from './Nodes';
import Links from './Links';

//IMPORT HELPER FNS
import {
  getHorizontalPosition,
  getVerticalPosition,
} from '../helpers/getSimulationDimensions';

// IMPORT STYLES
import {
  Services,
  SNode,
  SetSelectedContainer,
  Options,
  Networks,
  ViewT,
} from '../App.d';

type Props = {
  services: Services;
  setSelectedContainer: SetSelectedContainer;
  options: Options;
  networks: Networks;
  view: ViewT;
};

const DependsOnView: React.FC<Props> = ({
  services,
  setSelectedContainer,
  options,
  view,
  networks,
}) => {
  const { treeDepth } = window;

  /**
   *********************
   * Depends On View
   *********************
   */
  useEffect(() => {
    const container = d3.select('.depends-wrapper');
    const width = parseInt(container.style('width'), 10);
    const height = parseInt(container.style('height'), 10);
    const topMargin = 20;
    const sideMargin = 20;
    const radius = 60; // Used to determine the size of each container for border enforcement

    const d3Nodes = d3.select('.nodes').selectAll('g');
    const linkLines = d3.select('.links').selectAll('line');

    //set location when ticked
    function ticked() {
      const w = parseInt(container.style('width'));
      const h = parseInt(container.style('height'));
      // Enforces borders

      d3Nodes
        .attr('cx', (d: any) => {
          return (d.x = Math.max(
            sideMargin,
            Math.min(w - sideMargin - radius, d.x as number),
          ));
        })
        .attr('cy', (d: any) => {
          return (d.y = Math.max(
            15 + topMargin,
            Math.min(h - topMargin - radius, d.y as number),
          ));
        })
        .attr('transform', (d: any) => {
          return 'translate(' + d.x + ',' + d.y + ')';
        });

      linkLines
        .attr('x1', (d: any) => d.source.x + 30)
        .attr('y1', (d: any) => d.source.y + 30)
        .attr('x2', (d: any) => d.target.x + 30)
        .attr('y2', (d: any) => d.target.y + 30);

      // simulation.force('center', d3.forceCenter<SNode>(w / 2, h / 2));
    }
    simulation.nodes(serviceGraph.nodes);
    if (view === 'depends_on') {
      window.simulation.force(
        'charge',
        d3.forceManyBody<SNode>().strength(-400),
      );
      d3Nodes
        .attr('fx', (d: any) => {
          //assign the initial x location to the relative displacement from the left
          return (d.fx = getHorizontalPosition(d, width));
        })
        .attr('fy', (d: any) => {
          return (d.fy = getVerticalPosition(d, treeDepth, height));
        });
      window.simulation.on('tick', ticked);
      window.simulation.tick();
    } else {
      d3Nodes
        .attr('fx', (d: any) => {
          return (d.fx = null);
        })
        .attr('fy', (d: any) => {
          return (d.fy = null);
        });

      const networkHolder: { [networkString: string]: boolean } = {};
      const getSpacing = (): number => {
        d3Nodes.each((d: any) => {
          console.log(d.networks);
          if (d.networks) {
            let networkString = '';
            d.networks.sort();
            d.networks.forEach((network: string) => {
              networkString += network;
            });
            networkHolder[networkString] = true;
          }
        });
        return width / (Object.keys(networkHolder).length + 1);
      };
      const spacing = getSpacing();
      const forceX = d3
        .forceX((d: SNode): any => {
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
        .strength(1);

      const forceY = d3.forceY(height / 2).strength(1);
      //create force simulation
      window.simulation
        .force('x', forceX)
        .force('y', forceY)
        .force('charge', d3.forceManyBody<SNode>().strength(-radius * 3))
        .force('collide', d3.forceCollide(radius / 2))
        .on('tick', ticked);
    }

    // move force graph with resizing window
    window.addEventListener('resize', () => {
      window.simulation.tick();
    });
  }, [view, services]);

  return (
    <>
      <div className="depends-wrapper">
        <svg className="graph">
          <Nodes
            setSelectedContainer={setSelectedContainer}
            services={services}
            options={options}
          />
          <Links services={services} options={options} />
        </svg>
      </div>
    </>
  );
};

export default DependsOnView;
