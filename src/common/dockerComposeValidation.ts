import child_process from 'child_process';
import { ValidationResults } from '../renderer/App.d';

const runDockerComposeValidation = (filePath: string) =>
  new Promise((resolve, reject) => {
    try {
      child_process.exec(
        `docker-compose -f ${filePath} config`,
        (error, stdout, stderr) => {
          const validationResult: ValidationResults = {
            out: stdout.toString(),
            filePath,
          };
          if (error) {
            if (
              !error.message.includes("Couldn't find env file") &&
              !error.message.includes(
                'either does not exist, is not accessible',
              )
            ) {
              validationResult.error = error;
            }
          }
          resolve(validationResult);
        },
      );
    } catch {}
  });

export default runDockerComposeValidation;
