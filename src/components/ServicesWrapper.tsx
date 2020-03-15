/**
 * ************************************
 *
 * @module  ServicesWrapper.tsx
 * @author
 * @date 3/11/20
 * @description Display area for services containers
 *
 * ************************************
 */
import React from 'react';
import Services from './Service';
import DependsOnTest from './DependsOn-Test';
import { Node, Link, Graph } from '../App.d';
type Props = {};

const ServicesWrapper: React.FC<Props> = props => {
  const data: Graph = {
    nodes: [{ name: '' }],
    links: [{ source: '', target: '' }],
  };
  return (
    <div className="services-wrapper">
      <DependsOnTest nodes={data.nodes} links={data.links} />
      <div></div>
    </div>
  );
};

export default ServicesWrapper;

// width={900}
// height={900}
// data={{ nodes: [{ name: '' }], links: [{ source: '', target: '' }] }
