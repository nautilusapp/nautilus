/**
 * ************************************
 *
 * @module  InfoDropdown.tsx
 * @author Aris Razuri, not danny
 * @date 3/11/20
 * @description Dropdown display to show categories of service info
 *
 * ************************************
 */
import React from 'react';
import { FaAngleDown } from 'react-icons/fa';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

// import { Service } from '../App.d';

type Props = {
  service?: any;
};

type FilteredServiceProps = {
  [prop: string]: string;
};

type FilteredServiceSection = {
  [prop: string]: any;
};

type EnvironmentVars = {
  [prop: string]: string;
};

const InfoDropdown: React.FC<Props> = ({ service }) => {
  const overviewProps: FilteredServiceProps = {
    build: 'Build: ',
    context: 'Context: ',
    dockerfile: 'Dockerfile: ',
    args: 'Args: ',
    cache_from: 'Cache_from: ',
    labels: 'Labels: ',
    shm_size: 'Shm_size: ',
    target: 'Target: ',
    image: 'Image: ',
    command: 'Command: ',
    environment: 'Environment: ',
    env_file: 'Env_file: ',
    ports: 'Ports: ',
  };

  // Objects to hold filtered 1D service properties
  const serviceOverview: FilteredServiceSection = {};

  // Arrays/Objects to hold filtered 2D service properties
  const environmentVars: EnvironmentVars = {};

  if (service) {
    Object.keys(service).forEach((key: string) => {
      if (overviewProps[key]) {
        if (key === 'environment') {
          environmentVars[key] = key;
          console.log(environmentVars);
        }
        serviceOverview[key] = service[key];
      }
    });
  }

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
            <Card.Body>
              {Object.keys(serviceOverview).length === 0
                ? 'There are no overview details in your Docker-Compose file'
                : Object.keys(serviceOverview).map(
                    el => `${overviewProps[el]}${serviceOverview[el]}`,
                  )}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
};

export default InfoDropdown;
