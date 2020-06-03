/**
 * ************************************
 *
 * @module  DeploySwarm.tsx
 * @author
 * @date 3/11/20
 * @description container for the title, the service info and the file open
 *
 * ************************************
 */

import React from 'react';
import { FaUpload } from 'react-icons/fa';
import { runDockerSwarmDeployment } from '../../common/runShellTasks';

type Props = {
  currentFile: string,
};

const DeploySwarm: React.FC<Props> = () => {
  const hiddenDiv: any = document.getElementById('hidden-swarm-div');
  const successMessage: any = document.querySelector('.success-p');

  // retrieve input from user and pass it to runDockerSwarmDeployment as an argument
  // the function will return stdout from running each function, so that we have access to that info
  const getNameAndDeploy = async (event: any) => {
    const swarmName: string = event.target.parentNode.querySelector('#stack-name').value;
    event.target.parentNode.querySelector('#stack-name').value = null;

    const returnedFromPromise = await runDockerSwarmDeployment(this.props.currentFile, swarmName);
    const infoFromSwarm = JSON.parse(returnedFromPromise);
    console.log(infoFromSwarm);
    if (!infoFromSwarm.init.error) {
      const stdOutMessage = infoFromSwarm.init.out.split('\n')[0];
      let nodeManagerAddress = stdOutMessage.split(' ')[4];

      // console.log(stdOutMessage);
      // console.log(nodeManagerAddress);

      if (successMessage) {
        const posMsg = `Success! Your swarm has been deployed!\nThe current node ${nodeManagerAddress} is now a manager`;
        successMessage.innerText = posMsg;
        successMessage.style.visibility = 'visible';
      } 
    }
  };

  return (
    <div id="swarm-deploy-div"> 
      <button
        id="swarm-deploy-btn"
        onClick={() => {
          if (hiddenDiv) {
            hiddenDiv.style.visibility = 'visible';
          }}}>
          <FaUpload className="open-button" size={24} />
          Deploy to Swarm
      </button>

      <div id="hidden-swarm-div">
        <label htmlFor="stack-name" id="stack-name-label">Stack Name</label><br></br>
        <input id="stack-name" name="stack-name" placeholder="Enter name...."></input><br></br>
        <button 
          id="create-swarm" 
          onClick={() => getNameAndDeploy(event)}>
          Create Swarm
        </button>

        <div className="message-from-swarm-div">
          <p className="error-p">Sorry, there was an issue deploying your swarm</p>
          <p className="success-p"></p>
        </div>  
      </div>
    </div> 
  )
};

export default DeploySwarm;
