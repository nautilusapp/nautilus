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
    updateView(e.currentTarget.id);
  };

  const handleOptionClick = (e: React.MouseEvent<Element, MouseEvent>) => {
    updateOption(e.currentTarget.id);
  };

  const networksClass = view === 'networks' ? 'option selected' : 'option';
  const dependsOnClass = view === 'depends_on' ? 'option selected' : 'option';
  const dependsOptionDisplay = view === 'depends_on' ? 'none' : '';

  const optionsArr = ['ports', 'volumes', 'dependsOn'];

  const optionsDisplay = optionsArr.map(opt => (
    <Navbar.Text
      className={'options ' + options[opt] ? 'selected' : ''}
      id="ports"
      onClick={handleOptionClick}
    >
      {opt}
    </Navbar.Text>
  ));

  return (
    <div className="option-bar">
      <div className="views flex">
        <div className={networksClass} id="networks" onClick={handleViewClick}>
          networks
        </div>
        <div
          className={dependsOnClass}
          id="depends_on"
          onClick={handleViewClick}
        >
          depends on
        </div>
      </div>
      {/* <div className="vl"></div> */}
      <div className="options flex">{optionsDisplay}</div>
    </div>
  );
};

export default OptionBar;
