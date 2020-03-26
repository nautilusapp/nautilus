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
  const groupNetworks = (): JSX.Element | void => {
    if (Object.values(networks).length === 0) return;
    let title = '';
    const serviceValues = Object.values(services);
    for (let i = 0; i < serviceValues.length; i++) {
      if (serviceValues[i].networks.length > 1) {
        title = 'group networks';
      }
    }
    if (title === '') title = 'all networks';
    return (
      <option
        className={'networkOption'}
        key={`networks option: group`}
        id={'groupNetworks'}
        value={'groupNetworks'}
      >
        {title}
      </option>
    );
  };

  const networksOptions = Object.keys(networks).map((network, i) => {
    return (
      <option
        className={'networkOption'}
        key={`networks option: ${network}`}
        id={network}
        value={network}
      >
        {network}
      </option>
    );
  });

  const renderDropdown = () => {
    return (
      <>
        <select
          id="networks"
          className={'selected'}
          name="networks"
          onChange={selectNetwork}
        >
          <option
            key={`networks option header`}
            id={'networkHeader'}
            value={''}
          >
            {`networks`}
          </option>
          {networksOptions}
          {groupNetworks()}
        </select>
      </>
    );
  };

  return renderDropdown();
};

export default NetworksDropDown;
