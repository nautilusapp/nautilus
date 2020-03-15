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
import React, {ReactFragment} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { View, Options, UpdateOption, UpdateView } from '../App.d';

type Props = {
  view: View;
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
  let dependsViewFlag = false;

  // const viewClickToggle = (element: EventTarget & Element): void => {

  // }
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
  let renderViewOptions = (): ReactFragment => {
    if (view === 'networks') {
      return (
        <React.Fragment>
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
        </React.Fragment>
      );
    } else if (view === 'depends_on') {
      return (
        <React.Fragment>
          <Navbar.Text
            className="view"
            id="networks"
            onClick={handleViewClick}
          >
            Networks
          </Navbar.Text>
          <Navbar.Text
            className="view selected"
            id="depends_on"
            onClick={handleViewClick}
          >
            Depends On
          </Navbar.Text>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Navbar.Text
            className="view"
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
        </React.Fragment>
      );
    }
  };

  // Options text
  let portsOption = (
    <Navbar.Text className="option" id="ports" onClick={handleOptionClick}>
      Ports
    </Navbar.Text>
  );
  let volumesOption = (
    <Navbar.Text className="option" id="volumes" onClick={handleOptionClick}>
      Volumes
    </Navbar.Text>
  );
  let dependsOption = (
    <Navbar.Text className="option" id="dependsOn" onClick={handleOptionClick}>
      Depends On
    </Navbar.Text>
  );
  
  // Selected options text
  if(options.ports === true){
    portsOption = (
      <Navbar.Text className="option selected" id="ports" onClick={handleOptionClick}>
        Ports
      </Navbar.Text>
    );
  } else {
    portsOption
  }
  if( options.volumes === true){
    volumesOption = (
      <Navbar.Text className="option selected" id="volumes" onClick={handleOptionClick}>
        Volumes
      </Navbar.Text>
    );
  } else {
    volumesOption
  }
  if(options.dependsOn === true){
    dependsOption = (
      <Navbar.Text className="option selected" id="dependsOn" onClick={handleOptionClick}>
        Depends On
      </Navbar.Text>
    );
  } else {
    dependsOption
  }

  // Remove dependsOn Option when view is depends on
  if (view === 'depends_on') {
    dependsOption = (
      <Navbar.Text
        className="option"
        id="dependsOn"
        style={{ display: 'none' }}
      >
        Depends On
      </Navbar.Text>
    );
  }

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
