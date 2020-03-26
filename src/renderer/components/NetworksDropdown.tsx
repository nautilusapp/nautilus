import React /*{ JSXElementConstructor }*/ from 'react';
import { Networks, SelectNetwork } from '../App.d';

type Props = {
  networks: Networks;
  selectNetwork: SelectNetwork;
};

const NetworksDropDown: React.FC<Props> = ({ networks, selectNetwork }) => {
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
