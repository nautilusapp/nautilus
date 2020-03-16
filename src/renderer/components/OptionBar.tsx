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
import Nav from 'react-bootstrap/Nav';
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
    const element = e.currentTarget;
    const v = element.id;

    // Update view in state
    updateView(v);
  };

  const handleOptionClick = (e: React.MouseEvent<Element, MouseEvent>) => {
    const element = e.currentTarget;
    const option = element.id;

    // Update options in state
    updateOption(option);
  };

  // Function for toggling group-by view
  let renderViewOptions = () => {
    if (view === 'networks') {
      return (
        <>
          <Navbar.Text
            className="view selected"
            id="networks"
            onClick={handleViewClick}
          >
            Networks
          </Navbar.Text>
          <Navbar.Text
            className="view"
            id="depends_on"
            onClick={handleViewClick}
          >
            Depends On
          </Navbar.Text>
        </>
      );
    } else if (view === 'depends_on') {
      return (
        <>
          <Navbar.Text className="view" id="networks" onClick={handleViewClick}>
            Networks
          </Navbar.Text>
          <Navbar.Text
            className="view selected"
            id="depends_on"
            onClick={handleViewClick}
          >
            Depends On
          </Navbar.Text>
        </>
      );
    } else {
      return (
        <>
          <Navbar.Text className="view" id="networks" onClick={handleViewClick}>
            Networks
          </Navbar.Text>
          <Navbar.Text
            className="view"
            id="depends_on"
            onClick={handleViewClick}
          >
            Depends On
          </Navbar.Text>
        </>
      );
    }
  };

  const portsClass = options.ports ? 'option selected' : 'option';
  const volumesClass = options.volumes ? 'option selected' : 'option';
  const dependsClass = options.dependsOn ? 'option selected' : 'option';
  const dependsOptionDisplay = view === 'depends_on' ? 'none' : '';
  // Options text
  let portsOption = (
    <Navbar.Text className={portsClass} id="ports" onClick={handleOptionClick}>
      Ports
    </Navbar.Text>
  );
  let volumesOption = (
    <Navbar.Text
      className={volumesClass}
      id="volumes"
      onClick={handleOptionClick}
    >
      Volumes
    </Navbar.Text>
  );
  let dependsOption = (
    <Navbar.Text
      className={dependsClass}
      id="dependsOn"
      onClick={handleOptionClick}
      style={{ display: dependsOptionDisplay }}
    >
      Depends On
    </Navbar.Text>
  );

  return (
    <Navbar className="option-bar" variant="dark">
      <Nav className="group-by">
        <Navbar.Text className="tag">Group By: </Navbar.Text>
        {renderViewOptions()}
      </Nav>
      <Nav className="options">
        <Navbar.Text className="tag">View Options: </Navbar.Text>
        {portsOption}
        {volumesOption}
        {dependsOption}
      </Nav>
    </Navbar>
  );
};

export default OptionBar;
