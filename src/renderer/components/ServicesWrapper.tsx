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
// import Service from './Service';
import DependsOnView from './DependsOnView';
// import DefaultView from './DefaultView';

import { Services } from '../App.d';

type Props = {
  services: Services;
};

const ServicesWrapper: React.FC<Props> = ({ services }) => {
  return (
    <div className="services-wrapper">
      {/* <Service service={services.app} name="app" /> */}
      <DependsOnView services={services} />
      {/* <DefaultView services={services} /> */}
    </div>
  );
};

export default ServicesWrapper;
