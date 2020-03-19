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

type ReactProps = {
  service?: any;
};

type DockerComposeProperties = {
  [prop: string]: string;
};

type ServiceOverview = {
  [prop: string]: any;
};

// type Build = {
//   [prop: string]: string | {};
// };

type context = {
  [prop: string]: string;
}

type EnvironmentVariables = {
  [prop: string]: string;
};

const InfoDropdown: React.FC<ReactProps> = ({ service }) => {
  // Create an object to house text intros for each docker-compose property
  const dockerComposeProperties: DockerComposeProperties = {
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
  const serviceOverview: ServiceOverview = {};

  // Arrays/Objects to hold filtered 2D service properties
  const context: Context = 
  const environmentVariables: EnvironmentVariables = {};

  // if service exists
  if (service) {
    // loop through the properties in each service
    Object.keys(service).forEach((key: string) => {
      // and if the service property can be found in the list of docker-compose properties...
      if (dockerComposeProperties[key]) {
        // ASIDE: if any of the below keys equal the specified strings,
        if (key === 'environment') {
          // ASIDE: set the key at the 2d arrays/objects between lines 55 and x, to be the service's property and set it equal to service's property
          environmentVariables[key] = key;
          console.log(environmentVariables);
        }
        // ...then set the key in the serviceOverview's object to equal the service property and its value to be the service property value
        // ie {Build: ./result}
        serviceOverview[key] = service[key];
        // if the service property is build and it's value is an object,
        if (key === 'build' && typeof service[key] === 'object') {
          // set the key in the serviceOverview object to 'build' and set the value to an empty object
          serviceOverview[key] = '';
        }
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
                    el =>
                      `${dockerComposeProperties[el]}${serviceOverview[el]}`,
                  )}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
};

export default InfoDropdown;
