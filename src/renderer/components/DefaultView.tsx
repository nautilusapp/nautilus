import React, { useEffect } from 'react';
import * as d3 from 'd3';
import { Services, Link } from '../App.d';

type Props = {
  services: Services;
};

type SNode = {
  id: number;
  name: string;
  ports: string[];
  volumes: string[];
};

type SGraph = {
  nodes: SNode[];
  links: Link[];
};

const DefaultView: React.FC<Props> = ({ services }) => {
  let links: Link[] = [];
  const nodes: SNode[] = Object.keys(services).map((sName: string, i) => {
    const ports: string[] = [];
    const volumes: string[] = [];
    if (services[sName].hasOwnProperty('ports')) {
      services[sName].ports.forEach(port => {
        ports.push(port);
      });
    }
    if (services[sName].hasOwnProperty('volumes')) {
      services[sName].volumes.forEach(vol => {
        volumes.push(vol);
      });
    }
    if (services[sName].hasOwnProperty('depends_on')) {
      services[sName].depends_on.forEach(el => {
        links.push({ source: el, target: sName });
      });
    }
    return {
      id: i,
      name: sName,
      ports: ports,
      volumes: volumes,
    };
  });

  const serviceGraph: SGraph = {
    nodes,
    links,
  };

  console.log(serviceGraph);
  useEffect(() => {
    const container = d3.select('.default-view');
    const width = parseInt(container.style('width'), 10);
    const height = parseInt(container.style('height'), 10);

    const view = d3
      .select('.dfv-svg')
      .attr('width', width)
      .attr('height', height);

    return () => {
      view.remove();
    };
  });
  return (
    <div className="default-view">
      <svg className="dfv-svg"></svg>
    </div>
  );
};

export default DefaultView;
