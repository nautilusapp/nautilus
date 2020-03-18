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
    image: 'Image: ',
    container_name: 'Container Name: ',
    environment: 'Environment: ',
    env_file: 'Env_file: ',
    depends_on: 'Depends On: ',
    working_dir: 'Working Directory: ',
  };
  const storageProps: FilteredServiceProps = {};
  const networkProps: FilteredServiceProps = {
    networks: 'Networks: ',
    ports: 'Ports: ',
  };
  const securityProps: FilteredServiceProps = {
    security_opt: 'Security Options: ',
  };
  const miscProps: FilteredServiceProps = {
    stop_grace_Period: 'Stop Grace Period: ',
    stop_signal: 'Stop Signal: ',
    restart: 'Restart: ',
    pid: 'Pid: ',
  };

  // Objects to hold filtered 1D service properties
  const serviceOverview: FilteredServiceSection = {};
  const serviceStorage: FilteredServiceSection = {};
  const serviceNetwork: FilteredServiceSection = {};
  const serviceSecurity: FilteredServiceSection = {};
  const serviceMisc: FilteredServiceSection = {};

  // Arrays/Objects to hold filtered 2D service properties
  const security_opt: string[] = [];
  const environmentVars: EnvironmentVars = {};

  if (service) {
    Object.keys(service).forEach((key: string) => {
      if (overviewProps[key]) {
        if (key === 'environment') {
          environmentVars[key] = key;
        }
        serviceOverview[key] = service[key];
      }
      if (storageProps[key]) {
        serviceStorage[key] = service[key];
      }
      if (networkProps[key]) {
        serviceNetwork[key] = service[key];
      }
      if (securityProps[key]) {
        if (key === 'security_opt') security_opt.push(service[key]);
        serviceSecurity[key] = service[key];
      }
      if (miscProps[key]) {
        serviceMisc[key] = service[key];
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
        {/* STORAGE */}
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              Storage <FaAngleDown />
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              {Object.keys(serviceStorage).length === 0
                ? 'There are no storage details in your Docker-Compose file'
                : Object.keys(serviceStorage).map(
                    el => `${storageProps[el]}${serviceStorage[el]}`,
                  )}
            </Card.Body>
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
            <Card.Body>
              {Object.keys(serviceNetwork).length === 0
                ? 'There are no network details in your Docker-Compose file'
                : Object.keys(serviceNetwork).map(
                    el => `${networkProps[el]}${serviceNetwork[el]}`,
                  )}
            </Card.Body>
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
            <Card.Body>
              {Object.keys(serviceSecurity).length === 0
                ? 'There are no storage details in your Docker-Compose file'
                : Object.keys(serviceSecurity).map(
                    el => `${securityProps[el]}${serviceSecurity[el]}`,
                  )}
            </Card.Body>
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
            <Card.Body>
              {Object.keys(serviceMisc).length === 0
                ? 'There are no miscellaneous details in your Docker-Compose file'
                : Object.keys(serviceMisc).map(
                    el => `${miscProps[el]}${serviceMisc[el]}`,
                  )}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
};

export default InfoDropdown;
