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
// import YAML from 'yamljs';

// import { Service } from '../App.d';

type ReactProps = {
  service?: any;
  selectedContainer: string;
};

type DockerComposeCommands = {
  [prop: string]: string;
};

type ServiceOverview = {
  [prop: string]: any;
};

// type Build = {
//   [prop: string]: string | {};
// };

type TwoDimension = {
  [prop: string]: any;
};

const InfoDropdown: React.FC<ReactProps> = ({ service, selectedContainer }) => {
  // Create an object to house text intros for each docker-compose property
  const dockerComposeCommands: DockerComposeCommands = {
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

  // Objects to hold filtered 1D service Commands
  const serviceOverview: ServiceOverview = {};

  // Arrays/Objects to hold filtered 2D service Commands
  const environmentVariables: TwoDimension = {};
  const env_file: string[] = [];

  if (service) {
    Object.keys(service).forEach(command => {
      if (dockerComposeCommands[command]) {
        serviceOverview[command] = '';
        //  *********************
        //  * Environment
        //  *********************
        if (command === 'environment') {
          if (Array.isArray(service[command])) {
            service[command].forEach((value: string) => {
              const valueArray = value.split('=');
              environmentVariables[valueArray[0]] = valueArray[1];
            });
          } else {
            const environment = service[command];
            Object.keys(environment).forEach(key => {
              environmentVariables[key] = environment[key];
            });
          }
          //  *********************
          //  Env_File
          //  *********************
        } else if (command === 'env_file') {
          if (typeof service[command] === 'string') {
            serviceOverview[command] = service[command];
          } else {
            for (let i = 0; i < service[command].length; i += 1) {
              env_file.push(service[command][i]);
            }
          }
        }
        //  *********************
        //  * Build
        //  *********************
        else if (command === 'build' && typeof service[command] !== 'string') {
        } else serviceOverview[command] = service[command];
      }
    });
  }

  const infoToJsx = (
    serviceOverview: ServiceOverview,
    dockerComposeCommands: DockerComposeCommands,
    environmentVariables: TwoDimension,
    env_file: string[],
    service: any,
  ) => {
    return Object.keys(serviceOverview).length === 0
      ? 'There are no overview details in your Docker-Compose file'
      : Object.keys(serviceOverview).map((command, i) => {
          let commandJSX = (
            <span className="command">{dockerComposeCommands[command]}</span>
          );
          let valueJSX: JSX.Element = <div></div>;
          //  *********************
          //  * Environment
          //  *********************
          if (command === 'environment' && !serviceOverview[command].length) {
            const environment: JSX.Element[] = [];
            Object.keys(environmentVariables).forEach(key => {
              environment.push(
                <li className="second-level" key={key}>
                  <span>{key}:</span> {environmentVariables[key]}
                </li>,
              );
            });
            valueJSX = (
              <span className="command-values">
                <ul>{environment}</ul>
              </span>
            );
            //  *********************
            //  Env_File
            //  *********************
          } else if (command === 'env_file' && env_file.length) {
            let envFileArray: JSX.Element[] = [];
            env_file.forEach(el => {
              envFileArray.push(
                <li className="second-level" key={el}>
                  {el}
                </li>,
              );
            });
            valueJSX = (
              <span className="command-values">
                <ul>{envFileArray}</ul>
              </span>
            );
          } else if (command === 'build' && !serviceOverview[command].length) {
            const build = service[command];
            Object.keys(build).forEach(option => {
              if (typeof build[option] === 'string') {
                valueJSX = <span className="options">{build[option]}</span>;
              } else if (Array.isArray(build[option])) {
                const optionJSX = (build[option] as []).map(
                  (element: string, i) => {
                    return <li key={i}>{element}</li>;
                  },
                );
                valueJSX = (
                  <span className="third-level">
                    <ul>{optionJSX}</ul>
                  </span>
                );
              } else {
                const optionJSX = Object.keys(build[option]).map(
                  (key: string, i) => {
                    return <li key={i}>{`${key}: ${build[option][key]}`}</li>;
                  },
                );
                valueJSX = (
                  <span className="third-level">
                    <ul>{optionJSX}</ul>
                  </span>
                );
              }
            });
          } else {
            valueJSX = (
              <span className="command-values">{serviceOverview[command]}</span>
            );
          }

          return (
            <div key={`command${i}`}>
              {commandJSX}
              {valueJSX}
            </div>
          );
        });
  };

  return (
    <div className="info-dropdown">
      <h3>
        {selectedContainer !== ''
          ? selectedContainer[0].toUpperCase() + selectedContainer.slice(1)
          : selectedContainer}
      </h3>
      <Accordion defaultActiveKey="0">
        {/* OVERVIEW */}
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Overview <FaAngleDown />
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              {infoToJsx(
                serviceOverview,
                dockerComposeCommands,
                environmentVariables,
                env_file,
                service,
              )}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
};

export default InfoDropdown;
