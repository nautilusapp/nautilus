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
import Navbar from 'react-bootstrap/Navbar';
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
    let title = '';
    if (opt === 'dependsOn') title = 'depends on';
    else if (opt === 'selectAll') title = 'select all';
    else title = opt;

    return (
      <Navbar.Text
        key={`opt${i}`}
        className={options[opt] ? 'option selected' : 'option'}
        id={opt}
        onClick={updateOption}
        style={{ display }}
      >
        {title}
      </Navbar.Text>
    );
  });

  return (
    <div className="option-bar">
      <div className="views flex">
        <Navbar.Text
          className={networksClass}
          id="networks"
          onClick={updateView}
        >
          networks
        </Navbar.Text>
        <Navbar.Text
          className={dependsOnClass}
          id="depends_on"
          onClick={updateView}
        >
          depends on
        </Navbar.Text>
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
