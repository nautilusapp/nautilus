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
//import Services from './Service';
import DependsOnView from './DependsOnView';
import { Graph } from '../App.d';
type Props = {};

const ServicesWrapper: React.FC<Props> = props => {
  const data: Graph = {
    nodes: [{ name: '' }],
    links: [{ source: '', target: '' }],
  };
  return (
    <div className="services-wrapper">
      <DependsOnView nodes={data.nodes} links={data.links} />
      <div></div>
    </div>
  );
};

export default ServicesWrapper;
