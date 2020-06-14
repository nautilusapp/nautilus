/**
 * ************************************
 *
 * @module  Ports.tsx
 * @author
 * @date 3/23/20
 * @description Appending volumes to nodes in d3
 * @note Doesn't add a react elemnt to dom
 *
 * ************************************
 */
import React, { useEffect } from 'react';
import * as d3 from 'd3';
// IMPORT HELPERS
//import { colorSchemeIndex } from '../helpers/colorSchemeHash';

//IMPORT SVG
import boxPath from '../../../static/boxPath';

// IMPORT TYPES
import { SNode } from '../App.d';

type Props = {
  volumesOn: boolean;
  getColor: any;
};

const NodeVolumes: React.FC<Props> = ({ volumesOn, getColor }) => {
  useEffect(() => {
    // VOLUMES LOCATION
    const x = 0;
    const y = 0;
    const width = 133;
    const height = 133;
    // VOLUMES VARIABLES
    let nodesWithVolumes: d3.Selection<SVGGElement, SNode, any, any>;
    const volumes: d3.Selection<SVGSVGElement, SNode, any, any>[] = [];
    const volumeText: d3.Selection<SVGTextElement, SNode, any, any>[] = [];
    if (volumesOn) {
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
      });
    }

    return () => {
      // before unmounting, if volumes option was on, remove the volumes
      if (volumesOn) {
        volumes.forEach((node) => node.remove());
        volumeText.forEach((node) => node.remove());
      }
    };
    // only fire when options.volumes changes
  }, [volumesOn]);
  return <></>;
};

export default NodeVolumes;
