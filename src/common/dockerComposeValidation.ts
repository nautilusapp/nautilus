/**
 * ************************
 * @name runDockerComposeValidation
 * @input filePath: string, which is the file path to the docker-compose file on host computer
 * @output object: storing output of docker-compose shell command
 * ************************
 */

import child_process from 'child_process';
import { ValidationResults } from '../renderer/App.d';

const runDockerComposeValidation = (filePath: string) =>
  // promise for the electron application
  new Promise((resolve, reject) => {
    try {
      // run docker's validation command in a bash shell
      child_process.exec(
        `docker-compose -f ${filePath} config`,
        // callback function to access output of docker-compose command
        (error, stdout, stderr) => {
          // add output to object
          const validationResult: ValidationResults = {
            out: stdout.toString(),
            filePath,
          };
          // if there is an error, add the error object to validationResult obj
          if (error) {
            // filter errors we don't care about
            if (
              !error.message.includes("Couldn't find env file") &&
              !error.message.includes(
                'either does not exist, is not accessible',
              )
            ) {
              validationResult.error = error;
            }
          }
          // resolve promise when shell command finishes
          resolve(validationResult);
        },
      );
    } catch {}
  });

export default runDockerComposeValidation;
