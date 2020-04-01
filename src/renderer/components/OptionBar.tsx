/**
 * ************************************
 *
 * @module  OptionBar.tsx

 * @author Tyler Hurtt
 * @date 3/11/20
 * @description Used to display toggle options
 *
 * ************************************
 */
import React from 'react';

import NetworksDropdown from './NetworksDropdown';

import {
  ViewT,
  Options,
  Networks,
  UpdateOption,
  UpdateView,
  SelectNetwork,
} from '../App.d';

type Props = {
  view: ViewT;
  options: Options;
  networks: Networks;
  updateView: UpdateView;
  updateOption: UpdateOption;
  selectNetwork: SelectNetwork;
  selectedNetwork: string;
};

const OptionBar: React.FC<Props> = ({
  view,
  options,
  networks,
  updateView,
  updateOption,
  selectNetwork,
  selectedNetwork,
}) => {
  const dependsOnClass = view === 'depends_on' ? 'option selected' : 'option';

  const optionsDisplay = Object.keys(options).map((opt, i) => {
    let title = '';
    if (opt === 'selectAll') title = 'select all';
    else title = opt;

    return (
      <span
        key={`opt${i}`}
        className={options[opt] ? 'option selected' : 'option'}
        id={opt}
        onClick={updateOption}
      >
        {title}
      </span>
    );
  });

  return (
    <div className="option-bar">
      <div className="views flex">
        <NetworksDropdown
          networks={networks}
          selectNetwork={selectNetwork}
          selectedNetwork={selectedNetwork}
        />
        <span className={dependsOnClass} id="depends_on" onClick={updateView}>
          depends on
        </span>
      </div>
      <div className="titles flex">
        <h2>Views</h2>
        <div className="vl"></div>
        <h2>Options</h2>
      </div>
      <div className="options flex">{optionsDisplay}</div>
    </div>
  );
};

export default OptionBar;
