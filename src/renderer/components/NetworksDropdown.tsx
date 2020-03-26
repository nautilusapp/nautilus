import React from 'react';
import { Services, Networks, SelectNetwork } from '../App.d';

type Props = {
  services: Services;
  networks: Networks;
  selectNetwork: SelectNetwork;
  selectedNetwork: string;
};

const NetworksDropDown: React.FC<Props> = ({
  services,
  networks,
  selectNetwork,
  selectedNetwork,
}) => {
  const groupNetworks = (): JSX.Element | void => {
    if (!Object.values(networks).length) {
      return (
        <option
          className="networkOption"
          key={'default'}
          id="groupNetworks"
          value="groupNetworks"
        >
          default
        </option>
      );
    }
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
        className="networkOption"
        key={title}
        id="groupNetworks"
        value="groupNetworks"
      >
        {title}
      </option>
    );
  };

  const networksOptions = Object.keys(networks).map((network, i) => {
    return (
      <option
        className="networkOption"
        key={`networks option: ${network}`}
        id={network}
        value={network}
      >
        {network}
      </option>
    );
  });

  return (
    <>
      <select
        id="networks"
        className="networks-dropdown"
        name="networks"
        onChange={selectNetwork}
        value={selectedNetwork}
      >
        <option
          key="networks option header"
          id="networkHeader"
          value=""
          disabled
        >
          networks
        </option>
        {networksOptions}
        {groupNetworks()}
      </select>
    </>
  );
};

export default NetworksDropDown;
