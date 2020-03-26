import React from 'react';
import { Services, Networks, SelectNetwork } from '../App.d';

type Props = {
  services: Services;
  networks: Networks;
  selectNetwork: SelectNetwork;
};

const NetworksDropDown: React.FC<Props> = ({
  services,
  networks,
  selectNetwork,
}) => {
  const AllSeperateNetworks = () => {
    const networksArray = Object.keys(networks);
    const serviceValues = Object.values(services);
    console.log('networks', networksArray);
    // for(let i=0; i < serviceValues.length, i++){

    //   if(serviceValues[i].length > 1){

    //   }
    // }
  };

  const networksOptions = Object.keys(networks).map(network => {
    return (
      <option key={`networks option: ${network}`} id={network} value={network}>
        {network}
      </option>
    );
  });

  const renderDropdown = () => {
    return (
      <>
        {AllSeperateNetworks()}
        <select id="networks" name="networks" onChange={selectNetwork}>
          <option
            key={`networks option header`}
            id={'networkHeader'}
            value={''}
          >
            {`networks`}
          </option>
          {networksOptions}
        </select>
      </>
    );
  };

  return renderDropdown();
};

export default NetworksDropDown;
