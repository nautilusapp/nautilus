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

type Props = {

}

const ServiceInfoDisplay: React.FC<Props> = props => {

  return (
    <div className="service-info-display">
      <InfoDropdown />
    </div>
  );
}

export default ServiceInfoDisplay;
