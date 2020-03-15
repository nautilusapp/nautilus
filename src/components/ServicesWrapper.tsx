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
import TempService from './tempService';

import { State } from '../app.d';

type Props = {
  serviceInfo: State;
};

const ServicesWrapper: React.FC<Props> = ({ serviceInfo }) => {
  return (
    <div className="services-wrapper">
      <TempService serviceInfo={serviceInfo} />
    </div>
  );
};

export default ServicesWrapper;
