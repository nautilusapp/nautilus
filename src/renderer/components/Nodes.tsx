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
import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';

// IMPORT HELPER FUNCTIONS
import {
  getHorizontalPosition,
  getVerticalPosition,
} from '../helpers/getSimulationDimensions';
import { getStatic } from '../helpers/static';

// IMPORT TYPES
import { SNode, SetSelectedContainer, Services, Options } from '../App.d';
import boxPath from '../../../static/boxPath';

// IMPORT COMPONENTS

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
  const [boxPorts, setBoxPorts] = useState<d3.Selection<SVGRectElement, SNode, any, any>[] | []>([]);
  const [boxPortTexts, setBoxPortTexts] = useState<d3.Selection<SVGTextElement, SNode, any, any>[] | []>([]);
  const [boxVolumes, setBoxVolumes] = useState<d3.Selection<SVGSVGElement, SNode, any, any>[] | []>([]);
  const [boxVolumesTexts, setBoxVolumesTexts] = useState<d3.Selection<SVGTextElement, SNode, any, any>[] | []>([]);

  /** HELPER FUNCTIONS */
  const removeVolumes = () => {
    boxVolumes.forEach((node) => node.remove());
    boxVolumesTexts.forEach((node) => node.remove());
    setBoxVolumes([]);
    setBoxVolumesTexts([]);
  }

  const addVolumes = () => {
    const x = 0;
    const y = 0;
    const width = 133;
    const height = 133;
    // VOLUMES VARIABLES
    let nodesWithVolumes: d3.Selection<SVGGElement, SNode, any, any>;
    const volumes: d3.Selection<SVGSVGElement, SNode, any, any>[] = [];
    const volumeText: d3.Selection<SVGTextElement, SNode, any, any>[] = [];
      // select all nodes with volumes
    nodesWithVolumes = d3
      .select('.nodes')
      .selectAll<SVGGElement, SNode>('.node')
      .filter((d: SNode) => d.volumes.length > 0);

    // iterate through all nodes with volumes
    nodesWithVolumes.each(function (d: SNode) {
      const node = this;
      // iterate through all volumes of node
      d.volumes.reverse().forEach((vString, i) => {
        let onClick = false;
        let onceClicked = false;
        // add svg volume
        const volume = d3
          .select<SVGElement, SNode>(node)
          .insert('svg', 'image')
          .attr('viewBox', '0 0 133 133')
          .html(boxPath)
          .attr('class', 'volumeSVG')
          .attr('fill', () => {
            let slicedVString = vString.slice(0, vString.indexOf(':'));
            return vString.includes(':')
              ? getColor(slicedVString)
              : getColor(vString);
          })
          .attr('width', width + (d.volumes.length - i) * 20)
          .attr('height', height + (d.volumes.length - i) * 20)
          .attr('x', x - (d.volumes.length - i) * 10)
          .attr('y', y- (d.volumes.length - i) * 10)
          .on('mouseover', () => {
            return vText.style('visibility', 'visible');
          })
          .on('mouseout', () => {
            !onClick
              ? vText.style('visibility', 'hidden')
              : vText.style('visibility', 'visible');
          })
          .on('click', () => {
            onceClicked = !onceClicked;
            onClick = onceClicked;
          });
        // store d3 object in volumes array so that they can be removed
        volumes.push(volume);
        // add svg volume text
        const vText = d3
          .select<SVGElement, SNode>(node)
          .append('text')
          .text(vString)
          .attr('class', 'volume-text')
          .attr('fill', 'black')
          .attr('text-anchor', 'end')
          .attr('dx', x - 5)
          .attr('dy', y + (i + 1) * 11)
          .style('visibility', 'hidden');
        // store d3 object in volumes text array
        volumeText.push(vText);
      });
      setBoxVolumes(volumes);
      setBoxVolumesTexts(volumeText);
    });
  }

  const removePorts = () => {
    boxPorts.forEach((node) => node.remove());
    boxPortTexts.forEach((node) => node.remove());
    setBoxPorts([]);
    setBoxPortTexts([]);
  }

  const addPorts = () => {
    const rx = 3;
    // size of rectangle
    const pWidth = 78;
    const pHeight = 15;
    // ports location
    const x = 133 - 60;
    const y = 133 - 30;
    // text location
    const dx = x + 21; // center of text element because of text-anchor
    const dy = y + pHeight;
    // PORTS VARIABLES
    console.log('adding ports');
    let nodesWithPorts: d3.Selection<SVGGElement, SNode, any, any>;
    const ports: d3.Selection<SVGRectElement, SNode, any, any>[] = [];
    const portText: d3.Selection<SVGTextElement, SNode, any, any>[] = [];
  
    // select all nodes with ports
    nodesWithPorts = d3
      .select('.nodes')
      .selectAll<SVGGElement, SNode>('.node')
      .filter((d: SNode) => {
        return d.ports.length > 0
      });
    // iterate through all nodes with ports
    nodesWithPorts.each(function (d: SNode) {
      const node = this;
      // iterate through all ports of node
      d.ports.forEach((pString, i) => {
        // set font size based on length of ports text
        const textSize = '12px';
        // add svg port
        const port = d3
          .select<SVGElement, SNode>(node)
          .append('rect')
          .attr('class', 'port')
          .attr('rx', rx)
          .attr('x', x)
          .attr('y', y + i * pHeight)
          .attr('width', pWidth)
          .attr('height', pHeight);
        // store d3 object in ports array
        ports.push(port);
        // add svg port text
        const pText = d3
          .select<SVGElement, SNode>(node)
          .append('text')
          .attr('class', 'ports-text')
          .attr('color', 'white')
          .attr('dx', dx + 18)
          .attr('dy', dy + i * pHeight - 2)
          .attr('text-anchor', 'middle')
          .attr('font-size', textSize)
          // center the text in the rectangle
          .append('tspan')
          .text(pString)
          .attr('text-anchor', 'middle');
  
        // store d3 object in ports text array
        portText.push(pText);
      });
    });
    setBoxPorts(ports);
    setBoxPortTexts(portText);
  }
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

    if(options.ports) addPorts();
    if(options.volumes) addVolumes();

    return () => {
      // remove containers when services change
      nodeContainers.remove();
    };
  }, [services]);

  useEffect(() => {
    if(options.ports) addPorts();
    else if(boxPorts.length !== 0) removePorts();

    return () => {
      // before unmounting, if ports option was on, remove the ports
      if (options.ports) removePorts();
    };
  }, [options.ports])

  useEffect(() => {
    if(options.volumes) addVolumes();
    else if(boxVolumes.length !== 0) removeVolumes();

    return () => {
      // before unmounting, if volumes option was on, remove the ports
      if (options.volumes) removeVolumes();
    };
  }, [options.volumes])

  return <g className="nodes"></g>
};

export default Nodes;
