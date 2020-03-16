/**
 * ************************************
 *
 * @module  ServiceInfoDisplay.tsx
 * @author
 * @date 3/11/20
 * @description Component to display the info of the selected service container
 *
 * ************************************
 */
import React from 'react';

import InfoDropdown from './InfoDropdown';
import { Service } from '../App.d';

type Props = {
  service?: Service;
};

const ServiceInfoDisplay: React.FC<Props> = ({ service }) => {
  return (
    <div className="service-info-display">
      <InfoDropdown service={service} />
    </div>
  );
};

export default ServiceInfoDisplay;
