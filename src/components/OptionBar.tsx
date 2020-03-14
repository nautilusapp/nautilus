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
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

type Props = {};

const OptionBar: React.FC<Props> = props => {
  // ports: false,
  // volumes: false,
  // dependsOn: false,

  return (
    <Navbar className="option-bar" variant="dark">
      <Nav className="group-by">
        <Navbar.Text>Group By: </Navbar.Text>
        <Nav.Link className="option">Networks</Nav.Link>
        <Nav.Link className="option">Depends On</Nav.Link>
      </Nav>
      <Nav className="view-options">
        <Navbar.Text>View Options: </Navbar.Text>
        <Nav.Link className="option" >Ports</Nav.Link>
        <Nav.Link className="option" >Memory</Nav.Link>
        <Nav.Link className="option" >Depends On</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default OptionBar;
