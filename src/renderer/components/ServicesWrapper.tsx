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

import { Services, SetSelectedContainer, Options, Networks } from '../App.d';

type Props = {
  services: Services;
  setSelectedContainer: SetSelectedContainer;
  options: Options;
  networks: Networks;
};

const ServicesWrapper: React.FC<Props> = ({
  services,
  setSelectedContainer,
  options,
  networks
}) => {
  return (
    <div className="services-wrapper">
      {/* <Service service={services.app} name="app" /> */}
      {/* <DependsOnView
        services={services}
        setSelectedContainer={setSelectedContainer}
        options={options}
      /> */}
        {console.log('these are the networks: ', networks)}
      <NetworksView
        services={services}
        setSelectedContainer={setSelectedContainer}
        options={options}
        networks={networks}
      />
    </div>
  );
};

export default ServicesWrapper;
