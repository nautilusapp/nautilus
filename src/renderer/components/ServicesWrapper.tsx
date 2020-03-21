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
// import DependsOnView from './DependsOnView';
import NetworksView from './NetworksView';

import { Services, /*SetSelectedContainer,*/ Options } from '../App.d';

type Props = {
  services: Services;
  // setSelectedContainer: SetSelectedContainer;
  options: Options;
};

const ServicesWrapper: React.FC<Props> = ({
  services,
  // setSelectedContainer,
  options,
}) => {
  return (
    <div className="services-wrapper">
      {/* <Service service={services.app} name="app" /> */}
      {/* <DependsOnView
        services={services}
        setSelectedContainer={setSelectedContainer}
        options={options}
      /> */}\
      <NetworksView
        services={services}
        // setSelectedContainer={setSelectedContainer}
        options={options}
      />
    </div>
  );
};

export default ServicesWrapper;
