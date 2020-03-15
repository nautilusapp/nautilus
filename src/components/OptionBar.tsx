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
import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { Options, UpdateOption } from '../App.d';

type Props = {
  // updateOption: UpdateOption
  options: Options;
};

const OptionBar: React.FC<Props> = ({ options /* updateOption */ }) => {
  // ports: false,
  // volumes: false,
  // dependsOn: false,

  // const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log(e.target)
  // };

  const [ports, setPorts] = useState(options.ports);
  const [volumes, setVolumes] = useState(options.volumes);
  const [dependsOn, setDependsOn] = useState(options.dependsOn);


  const handleClick = (e: React.MouseEvent<Element, MouseEvent>) => {
    const option = e.currentTarget.id;
    // updateOption(e.currentTarget.id)
    // console.log(option)
    // console.log('this is the object', options)

    if (option === 'ports') {
      console.log(options.ports);
      if (options.ports === false) {
        setPorts((options.ports = true));
      } else {
        setPorts((options.ports = false));
      }
      console.log(options.ports);
    } else if (option === 'volumes') {
      console.log(options.volumes);
      if (options.volumes === false) {
        setVolumes((options.volumes = true));
      } else {
        setVolumes((options.volumes = false));
      }
      console.log(options.volumes);
    } else if (option === 'dependsOn') {
      console.log(options.dependsOn);
      if (options.dependsOn === false) {
        setDependsOn((options.dependsOn = true));
      } else {
        setDependsOn((options.dependsOn = false));
      }
      console.log(options.dependsOn);
    }
    // console.log('this is the option I selected', options[option])
  };

  return (
    <Navbar className="option-bar" variant="dark">
      <Nav className="group-by">
        <Navbar.Text>Group By: </Navbar.Text>
        <Navbar.Text className="option" id="networks" onClick={handleClick}>
          Networks
        </Navbar.Text>
        <Navbar.Text className="option" id="dependsOn" onClick={handleClick}>
          Depends On
        </Navbar.Text>
      </Nav>
      <Nav className="view-options">
        <Navbar.Text>View Options: </Navbar.Text>
        <Navbar.Text className="option" id="ports" onClick={handleClick}>
          Ports
        </Navbar.Text>
        <Navbar.Text className="option" id="volumes" onClick={handleClick}>
          Volumes
        </Navbar.Text>
        <Navbar.Text className="option" id="dependsOn" onClick={handleClick}>
          Depends On
        </Navbar.Text>
      </Nav>
    </Navbar>
  );
};

export default OptionBar;
