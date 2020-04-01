import React from 'react';
import { ReadOnlyObj, SelectNetwork } from '../App.d';

type Props = {
  networks: ReadOnlyObj;
  selectNetwork: SelectNetwork;
  selectedNetwork: string;
};

const NetworksDropDown: React.FC<Props> = ({
  networks,
  selectNetwork,
  selectedNetwork,
}) => {
  const groupNetworks = (): JSX.Element | void => {
    if (Object.keys(networks).length === 1) return;
    const title: string =
      Object.keys(networks).length > 1 ? 'group networks' : 'default';
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
