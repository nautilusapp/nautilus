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
  ReadOnlyObj,
  ViewT,
} from '../App.d';

type Props = {
  services: Services;
  setSelectedContainer: SetSelectedContainer;
  options: Options;
  networks: ReadOnlyObj;
  view: ViewT;
  selectedNetwork: string;
  getColor: any;
};

const View: React.FC<Props> = ({
  services,
  setSelectedContainer,
  options,
  view,
  networks,
  selectedNetwork,
  getColor,
}) => {
  const { treeDepth, simulation } = window.d3State;

  /**
   *********************
   * Depends On View
   *********************
   */
  useEffect(() => {
    // calculate dimensions of the view wrapper DOM element
    const container = d3.select('.view-wrapper');
    const width = parseInt(container.style('width'));
    const height = parseInt(container.style('height'));
    const topMargin = 20;
    const sideMargin = 20;
    // Used to determine the size of each container for border enforcement
    const radius = 120;

    // selecting the d3 svg nodes and links to manipulate via d3 simulation
    const d3Nodes = d3.select('.nodes').selectAll('.node');
    const linkLines = d3.select('.links').selectAll('line');

    // TICK FUNCTION
    // Function to be called every tick of the d3 simulation
    // used in both networks and depends view
    function ticked() {
      // calculate height and width for border reinforcement
      const w = parseInt(container.style('width'));
      const h = parseInt(container.style('height'));
      // reinforce borders and move nodes in accord with the simulation
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

      // link position
      const x = 66;
      const y = 10;
      // move links as the nodes move
      linkLines
        .attr('x1', (l: any) => l.source.x + x)
        .attr('y1', (l: any) => l.source.y + y)
        .attr('x2', (l: any) => l.target.x + x)
        .attr('y2', (l: any) => l.target.y + y);
    }

    // SET DEPENDS ON VIEW
    if (view === 'depends_on') {
      // setting force simulation for the x position of the nodes
      const dependsForceX = (w: number) =>
        d3
          .forceX((d: SNode) => {
            return getHorizontalPosition(d, w);
          })
          .strength(0.3);

      // setting force simulation for the y position of the nodes
      const dependsForceY = (h: number) =>
        d3
          .forceY((d: SNode) => {
            return getVerticalPosition(d, treeDepth, h);
          })
          .strength(0.3);

      // initialize the simulation for the depends on view
      simulation
        .alpha(0.8)
        // set how strogly nodes are forced into postion
        .force('charge', d3.forceManyBody<SNode>().strength(-400))
        // removes repelling force set in networks view
        .force('collide', null)
        // set the x force into given position of each node
        .force('x', dependsForceX(width))
        // set the y force into given position of each node
        .force('y', dependsForceY(height))
        // fired every step of the simulation
        .on('tick', ticked)
        // restart the simulation when switching so it keeps running
        .restart();

      // reposition the simulation when the window size changes
      window.onresize = () => {
        // recalculate height and width of view
        const width = parseInt(container.style('width'));
        const height = parseInt(container.style('height'));
        // restart the simulation based on new dimensions
        simulation
          .alpha(0.5)
          .force('x', dependsForceX(width))
          .force('y', dependsForceY(height))
          .restart();
      };

      /**
       *********************
       * Networks View
       *********************
       */
    } else {
      // declaring inital forces
      let forceX = d3.forceX<SNode>(0);
      let forceY = d3.forceY<SNode>(height / 2);

      /**
       * @type GROUP BY NETWORKS
       * @description Groups nodes by seperate networks or shared networks
       */
      if (selectedNetwork === 'groupNetworks') {
        // initialize an object to store network names / groups
        const networkHolder: { [networkString: string]: boolean } = {};
        /**
         * @params none
         * @output number : spacing between each network grouping for simluation
         * @description function to determine spacing of newtork groups based on total number of groups
         */
        const getSpacing = (): number => {
          // iterate through each node
          console.log('spacing', d3Nodes);
          d3Nodes.each((d: any) => {
            // if the node is part of a network
            if (d.networks) {
              // create one string of all networks sorted that node is a part
              let networkString = '';
              d.networks.sort();
              d.networks.forEach((network: string) => {
                networkString += network;
              });
              // add network name or group to network holder
              networkHolder[networkString] = true;
            }
          });
          // divide view container width by the total number of network groups
          return width / (Object.keys(networkHolder).length + 1);
        };
        // invoke getSpacing function
        const spacing = getSpacing();
        // determine the force of each node on the x axis
        forceX = d3
          .forceX((d: SNode): any => {
            // if node has a network
            if (d.networks) {
              // if no networks in networks object, set networks in center
              if (d.networks.length === 0) return width / 2;
              // create one string of all networks sorted that node is a part
              let networkString = '';
              d.networks.sort();
              d.networks.forEach((network) => {
                networkString += network;
              });
              // find the location of node along x axis based on networks string
              const place = Object.keys(networkHolder).indexOf(networkString);
              return (place + 1) * spacing;
            }
            return width / 2;
          })
          .strength(1);
        /**
         * @type INDIVIDUAL NETWORK VIEW
         * @description Center nodes from one network and push all other nodes to left
         */
      } else {
        // set the force of all nodes that have that network to the center
        forceX = d3
          .forceX((d: SNode): number => {
            if (d.networks) {
              for (let n = 0; n < d.networks.length; n++) {
                if (d.networks[n] === selectedNetwork) {
                  return width / 2;
                }
              }
            }
            // all other nodes are set to the left side of the creen
            return 0;
          })
          // set high strength for nodes not part of selected network
          // make sure they end up on the left
          // allows center group to be more of a circle
          .strength((d: SNode): number => {
            if (d.networks) {
              for (let n = 0; n < d.networks.length; n++) {
                if (d.networks[n] === selectedNetwork) {
                  return 0.5;
                }
              }
            }
            return 1;
          });
        // set low strength y force for nodes not part of selected network
        // so they can spread out along the left side
        forceY = d3
          .forceY((d: SNode) => height / 2)
          .strength((d: SNode): number => {
            if (d.networks) {
              for (let n = 0; n < d.networks.length; n++) {
                if (d.networks[n] === selectedNetwork) {
                  return 0.3;
                }
              }
              return 0.025;
            }
            return 0.025;
          });
      }
      //   }
      // }

      // create force simulation
      simulation
        .alpha(1)
        .force('x', forceX)
        .force('y', forceY)
        .force('charge', d3.forceManyBody<SNode>().strength(-150))
        .force('collide', d3.forceCollide(radius / 1.3))
        .on('tick', ticked)
        .restart()
    }

    console.log('view d3 render line 281 View.tsx');
    return () => {
      // clear window resize if changing away from depends view
      if (view === 'depends_on') {
        window.onresize = null;
      }
    };
  }, [view, services, selectedNetwork]);

  return (
    <>
      <div className="view-wrapper">
        <svg className="graph">
          <Nodes
            setSelectedContainer={setSelectedContainer}
            services={services}
            options={options}
            getColor={getColor}
          />
          <Links services={services} view={view} />
        </svg>
      </div>
    </>
  );
};

export default View;
