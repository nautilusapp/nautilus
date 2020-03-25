/**
 * ************************************
 *
 * @module  InfoDropdown.tsx
 * @author Danny Scheiner & Josh Nordstrom
 * @date 3/11/20
 * @description Dropdown display to show categories of service info
 *
 * ************************************
 */
import React from 'react';

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

type TwoDimension = {
  [prop: string]: any;
};

const InfoDropdown: React.FC<ReactProps> = ({ service, selectedContainer }) => {
  // Create an object to house text intros for each docker-compose property
  const dockerComposeCommands: DockerComposeCommands = {
    build: 'Build: ',
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
  const portsArray: string[] = [];

  // loop through each command in the selected container,
  // if the command exists in the DC properties, correspond it to an empty string in the serviceOverview object
  // also, do the following for each of the specific commands with 2D values, as well as the "build" command because it has options:
  // ENVIRONMENT: we want to take an environment variable such as: "JACOCO=${REPORT_COVERAGE}" and set the 2d line to look like - JACOCO: $(REPORT_COVERAGE)
  // Thus, if its value is an array, loop through it, split the value at the the '=', and set the key in the environmentVariables cache to the first half, and the value to the second half
  // Otherwise, if it's an object, it's already split for you, so set the serviceOverview key to the environment variable's key, and the serviceOverview value to the environment's value
  // ENV_FILE: an env file can have a 1D string, so if it does, just set the key in serviceOverview equal to its value as passed down from state
  // If it's an array, loop through the env_file values, and push them into the env_file "cache" on line 46
  // PORTS: if ports incorrectly is given a string, just set the key in serviceOverview equal to its value as passed down from state
  // Finally, for all commands with 1D values and no options (image and command), just set the key in serviceOverview equal to its value as passed down from state
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
          //  *********************
          //  Ports
          //  *********************
        } else if (command === 'ports') {
          for (let i = 0; i < service[command].length; i += 1) {
            if (typeof service[command][i] === 'object') {
              portsArray.push(
                `${service[command][i].published}:${
                  service[command][i].target
                } - ${service[command][i].protocol.toUpperCase()} : ${
                  service[command][i].mode
                }`,
              );
            } else if (!service[command][i].includes(':')) {
              portsArray.push(`Auto-assigned:${service[command][i]}`);
            } else portsArray.push(service[command][i]);
          }
          //  *********************
          //  * Build
          //  *********************
        } else if (
          command === 'build' &&
          typeof service[command] !== 'string'
        ) {
          //  *********************
          //  * Command
          //  *********************
        } else if (command === 'command' && Array.isArray(service[command])) {
          //  *********************
          //  * General 1D Objects
          //  *********************
        } else {
          serviceOverview[command] = service[command];
        }
      }
    });
  }

  const commandToJSX = (command: any) => {
    const optionJSX = Object.keys(command).map(option => {
      if (typeof command[option] === 'string') {
        return (
          <div>
            <span className="option-key">{option}:</span>
            {command[option]}
          </div>
        );
      } else if (Array.isArray(command[option])) {
        const optionJSX = (command[option] as []).map((element: string, i) => {
          const valueArray = element.split('=');
          return (
            <li key={i}>
              <span>{valueArray[0]}:</span> {valueArray[1]}
            </li>
          );
        });
        return (
          <div>
            <span className="option-key">{option}:</span>
            <ul>{optionJSX}</ul>
          </div>
        );
      } else {
        const optionJSX = Object.keys(command[option]).map((key: string, i) => {
          return (
            <li key={i}>
              <span>{key}:</span> {command[option][key]}
            </li>
          );
        });
        return (
          <div>
            <span className="option-key">{option}:</span>
            <ul>{optionJSX}</ul>
          </div>
        );
      }
    });
    return <div className="options">{optionJSX}</div>;
  };

  const infoToJsx = (
    serviceOverview: ServiceOverview,
    dockerComposeCommands: DockerComposeCommands,
    environmentVariables: TwoDimension,
    env_file: string[],
    portsArray: string[],
    service: any,
  ) => {
    return Object.keys(serviceOverview).length === 0
      ? 'Please select a container with details to display.'
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
            //  *********************
            //  Build
            //  *********************
          } else if (command === 'build' && !serviceOverview[command].length) {
            valueJSX = commandToJSX(service[command]);
            //  *********************
            //  Command
            //  *********************
          } else if (
            command === 'command' &&
            !serviceOverview[command].length
          ) {
            valueJSX = (
              <span className="command-values">
                {service[command].join(', ')}
              </span>
            );
            //  *********************
            //  Ports
            //  *********************
          } else if (command === 'ports' && !serviceOverview[command].length) {
            if (portsArray.length) {
              let portsArraySquared: JSX.Element[] = [];
              portsArray.forEach(el => {
                portsArraySquared.push(
                  <li className="second-level" key={el}>
                    {el}
                  </li>,
                );
              });
              valueJSX = (
                <span className="command-values">
                  <ul>{portsArraySquared}</ul>
                </span>
              );
            }
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
      <div className="card-body">
        {infoToJsx(
          serviceOverview,
          dockerComposeCommands,
          environmentVariables,
          env_file,
          portsArray,
          service,
        )}
      </div>
    </div>
  );
};

export default InfoDropdown;
