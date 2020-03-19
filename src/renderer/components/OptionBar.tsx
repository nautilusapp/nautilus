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
  const handleViewClick = (e: React.MouseEvent<Element, MouseEvent>) => {
    updateView(e.currentTarget.id as 'networks' | 'depends_on');
  };

  const handleOptionClick = (e: React.MouseEvent<Element, MouseEvent>) => {
    updateOption(e.currentTarget.id);
  };

  const networksClass = view === 'networks' ? 'option selected' : 'option';
  const dependsOnClass = view === 'depends_on' ? 'option selected' : 'option';

  const optionsArr = ['ports', 'volumes', 'dependsOn'];

  const optionsDisplay = optionsArr.map(opt => {
    const display = view === 'depends_on' && opt === 'dependsOn' ? 'none' : '';
    let title = '';
    if (opt === 'dependsOn') title = 'depends on';
    else title = opt;
    return (
      <Navbar.Text
        className={options[opt] ? 'option selected' : 'option'}
        id={opt}
        onClick={handleOptionClick}
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
          onClick={handleViewClick}
        >
          networks
        </Navbar.Text>
        <Navbar.Text
          className={dependsOnClass}
          id="depends_on"
          onClick={handleViewClick}
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
