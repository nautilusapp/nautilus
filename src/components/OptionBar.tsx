/**
 * ************************************
 *
 * @module  OptionBar.tsx
 * @author
 * @date 3/11/20
 * @description Used to display toggle options
 *
 * ************************************
 */
import React, { useState, ReactFragment } from 'react';
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
  let dependsViewFlag = false;

  const viewClickToggle = (element: EventTarget & Element): void => {

  }
  const handleViewClick = (e: React.MouseEvent<Element, MouseEvent>) => {
    const element = e.currentTarget
    const v = element.id;

    // Toggle Text Color
    if(element.classList.contains('selected')){
      element.classList.remove('selected')
    } else {
      element.classList.add('selected')
    }

    // Drop Depends_On Option if already in that view
    if (v === 'depends_on') {
      dependsViewFlag = true;
    } else {
      dependsViewFlag = false;
    }

    // Update view in state
    updateView(v);
  };

  const handleOptionClick = (e: React.MouseEvent<Element, MouseEvent>) => {
    const element = e.currentTarget
    const option = e.currentTarget.id;
    console.log('inside handleOptionClick...')
    console.log('options...', options);
    console.log('clicked...', option);

    // Toggle Text Color
    if(element.classList.contains('selected')){
      element.classList.remove('selected')
    } else {
      element.classList.add('selected')
    }

    // Update options in state
    updateOption(option);
  };

  let dependsOption = (
    <Navbar.Text
      className="option"
      id="dependsOnOption"
      onClick={handleOptionClick}
    >
      Depends On
    </Navbar.Text>
  );
  if (view === 'depends_on') {
    dependsOption = (
      <Navbar.Text
        className="option"
        id="dependsOnOption"
        style={{ display: 'none' }}
      >
        Depends On
      </Navbar.Text>
    );
  }

  return (
    <Navbar className="option-bar" variant="dark">
      <Nav className="group-by">
        <Navbar.Text>Group By: </Navbar.Text>
        <Navbar.Text className="option view" id="networks" onClick={handleViewClick}>
          Networks
        </Navbar.Text>
        <Navbar.Text
          className="option view"
          id="depends_on"
          onClick={handleViewClick}
        >
          Depends On
        </Navbar.Text>
      </Nav>
      <Nav className="view-options">
        <Navbar.Text>View Options: </Navbar.Text>
        <Navbar.Text className="option" id="ports" onClick={handleOptionClick}>
          Ports
        </Navbar.Text>
        <Navbar.Text
          className="option"
          id="volumes"
          onClick={handleOptionClick}
        >
          Volumes
        </Navbar.Text>
        {dependsOption}
      </Nav>
    </Navbar>
  );
};

export default OptionBar;
