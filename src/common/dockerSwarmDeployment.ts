/**
 * ************************
 * @name deploySwarmCluster
 * @author Kim Wysocki
 * @input filePath: string, which is the file path to the docker-compose file on host computer
 * @output object: storing output of docker-compose shell command
 * ************************
 */

import child_process from 'child_process';
// import { ValidationResults } from '../renderer/App.d';

const deploySwarmCluster = () => {
  // Promise for Electron
  console.log(`Filepath name: will be here`);
  new Promise((resolve, reject) => {
    try {
      // Use child_process.exec to run command to initialise a swarm locally
      console.log('docker swarm init about to run');

      child_process.exec(`docker swarm init`, (error, stdout, stderr) => {
        console.log(stdout.toString());

        if (error) {
          console.log(error);
        }
      });
    } catch (err) {
      console.log(`Error within deploySwarmCluster: ${err}`);
    }
  });
};

export default deploySwarmCluster;
