import React from 'react';
import { Networks, SelectNetwork } from '../App.d';

type Props = {
  networks: Networks;
  selectNetwork: SelectNetwork;
  selectedNetwork: string;
  multipleNetworks: boolean;
};

const NetworksDropDown: React.FC<Props> = ({
  multipleNetworks,
  networks,
  selectNetwork,
  selectedNetwork,
}) => {
  const groupNetworks = (): JSX.Element | void => {
    //if no networks
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
    const title = multipleNetworks ? 'group networks' : 'all networks';
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

  let selectClass = selectedNetwork ? 'option selected' : 'option';
  return (
    <>
      <select
        id="networks"
        className={selectClass}
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
