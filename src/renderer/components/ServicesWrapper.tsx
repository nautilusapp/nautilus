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
import Service from './Service';

import { ServiceInfo } from '../App.d';

type Props = {
  serviceInfo: ServiceInfo;
};

const ServicesWrapper: React.FC<Props> = ({ serviceInfo }) => {
  return (
    <div className="services-wrapper">
      <Service service={serviceInfo.app} name="app" />
    </div>
  );
};

export default ServicesWrapper;
