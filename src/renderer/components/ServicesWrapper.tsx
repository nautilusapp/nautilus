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
// import View from './View';
import View from './View';

import {
  Services,
  SetSelectedContainer,
  Options,
  ViewT,
  Networks,
} from '../App.d';

type Props = {
  services: Services;
  setSelectedContainer: SetSelectedContainer;
  options: Options;
  view: ViewT;
  networks: Networks;
  getColor: any;
};

const ServicesWrapper: React.FC<Props> = ({
  services,
  setSelectedContainer,
  options,
  view,
  networks,
  getColor,
}) => {
  return (
    <div className="services-wrapper">
      <View
        services={services}
        setSelectedContainer={setSelectedContainer}
        options={options}
        view={view}
        networks={networks}
        getColor={getColor}
      />
    </div>
  );
};

export default ServicesWrapper;
