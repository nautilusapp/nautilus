/**
 * ************************************
 *
 * @module  InfoDropdown.tsx
 * @author Aris Razuri, but mostly Danny Scheiner
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
        } else if (command === 'command' && Array.isArray(service[command])) {
        } else serviceOverview[command] = service[command];
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
      <div className="content-wrapper">
        <div className="overflow-container">
          <div className="overview">
            {infoToJsx(
              serviceOverview,
              dockerComposeCommands,
              environmentVariables,
              env_file,
              service,
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoDropdown;
