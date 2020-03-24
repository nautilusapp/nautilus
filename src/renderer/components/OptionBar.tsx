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
import { Options, UpdateOption, UpdateView } from '../App.d';

type Props = {
  view: string;
  options: Options;
  updateView: UpdateView;
  updateOption: UpdateOption;
};

const OptionBar: React.FC<Props> = ({
  view,
  options,
  updateView,
  updateOption,
}) => {
  const networksClass = view === 'networks' ? 'option selected' : 'option';
  const dependsOnClass = view === 'depends_on' ? 'option selected' : 'option';

  const optionsDisplay = Object.keys(options).map((opt, i) => {
    const display = view === 'depends_on' && opt === 'dependsOn' ? 'none' : '';
    const title = opt === 'dependsOn' ? 'depends on' : opt;
    return (
      <span
        key={`opt${i}`}
        className={options[opt] ? 'option selected' : 'option'}
        id={opt}
        onClick={updateOption}
        style={{ display }}
      >
        {title}
      </span>
    );
  });

  return (
    <div className="option-bar">
      <div className="views flex">
        <span className={networksClass} id="networks" onClick={updateView}>
          networks
        </span>
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
