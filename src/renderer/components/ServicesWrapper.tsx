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
type Props = {};

const ServicesWrapper: React.FC<Props> = props => {
  return (
    <div className="services-wrapper">
      <DependsOnView />
      <div></div>
    </div>
  );
};

export default ServicesWrapper;
