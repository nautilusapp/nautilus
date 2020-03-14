/**
 * ************************************
 *
 * @module  InfoDropdown.tsx
 * @author
 * @date 3/11/20
 * @description Dropdown display to show categories of service info
 *
 * ************************************
 */
import React from 'react';
import { FaAngleDown } from 'react-icons/fa';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

type Props = {};

const InfoDropdown: React.FC<Props> = props => {
  return (
    <div className="info-dropdown">
      <Accordion>
        {/* OVERVIEW */}
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              Overview <FaAngleDown />
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>Other services</Card.Body>
          </Accordion.Collapse>
        </Card>
        {/* STORAGE */}
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              Storage <FaAngleDown />
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>Add Storage Info Here</Card.Body>
          </Accordion.Collapse>
        </Card>
        {/* NETWORK */}
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Card.Header} eventKey="2">
              Network <FaAngleDown />
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="2">
            <Card.Body>Add Network Info Here</Card.Body>
          </Accordion.Collapse>
        </Card>
        {/* SECURITY */}
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Card.Header} eventKey="3">
              Security <FaAngleDown />
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="3">
            <Card.Body>Add Security Info Here</Card.Body>
          </Accordion.Collapse>
        </Card>
        {/* MISC */}
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Card.Header} eventKey="4">
              Miscellaneous <FaAngleDown />
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="4">
            <Card.Body>Add Misc. Info Here</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
};

export default InfoDropdown;
