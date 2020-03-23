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

import { Services, SetSelectedContainer, Options, View } from '../App.d';

type Props = {
  services: Services;
  setSelectedContainer: SetSelectedContainer;
  options: Options;
  view: View;
};

const ServicesWrapper: React.FC<Props> = ({
  services,
  setSelectedContainer,
  options,
  view,
}) => {
  return (
    <div className="services-wrapper">
      {/* <Service service={services.app} name="app" /> */}
      <DependsOnView
        services={services}
        setSelectedContainer={setSelectedContainer}
        options={options}
        view={view}
      />
    </div>
  );
};

export default ServicesWrapper;
