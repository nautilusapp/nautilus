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

import {
  Services,
  SetSelectedContainer,
  Options,
  View,
  Networks,
} from '../App.d';

type Props = {
  services: Services;
  setSelectedContainer: SetSelectedContainer;
  options: Options;
  view: View;
  networks: Networks;
};

const ServicesWrapper: React.FC<Props> = ({
  services,
  setSelectedContainer,
  options,
  view,
  networks,
}) => {
  return (
    <div className="services-wrapper">
      {/* <Service service={services.app} name="app" /> */}
      <DependsOnView
        services={services}
        setSelectedContainer={setSelectedContainer}
        options={options}
        view={view}
        networks={networks}
      />
    </div>
  );
};

export default ServicesWrapper;
