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

const DeploySwarm: React.FC<Props> = ({
  currentFile
}) => {

  const hiddenDiv: any = document.getElementById('hidden-swarm-div');
  // const messageFromSwarmDiv: any = document.querySelector('.message-from-swarm-div');
  const successMessageDiv: any = document.querySelector('.success-div');
  const successMessage: any = document.querySelector('.success-p');
  const errorMessageDiv: any = document.querySelector('.error-div');
  // const errorMessage: any = document.querySelector('.error-p');
  const initSwarmDiv: any = document.querySelector('#initialize-swarm');

  // change visibility of HTML element from hidden to visible or vice versa
  const toggleVisible = (element: any) => {
    element.style.visibility = 'visible';
  }
  const toggleHidden = (element: any) => {
    element.style.visibility = 'hidden';
  }

  // retrieve input from user and pass it to runDockerSwarmDeployment as an argument
  // the function will return stdout from running each function, so that we have access to that info
  const getNameAndDeploy = async (event: any) => {
    const stackName: string = event.target.parentNode.querySelector('#stack-name').value;
    event.target.parentNode.querySelector('#stack-name').value = null;

    toggleHidden(initSwarmDiv);

    const returnedFromPromise = await runDockerSwarmDeployment(currentFile, stackName);
    const infoFromSwarm = JSON.parse(returnedFromPromise);
    console.log(infoFromSwarm);

    if (!infoFromSwarm.init.error) {
      const stdOutMessage = infoFromSwarm.init.out.split('\n')[0];
      let nodeManagerAddress = stdOutMessage.split(' ')[4];

      if (successMessageDiv) {
        const posMsg = `Success! Your swarm has been deployed!\nThe current node ${nodeManagerAddress} is now a manager`;
        successMessage.innerText = posMsg;
        toggleVisible(successMessageDiv);
      } 
    } else {
      if (errorMessageDiv) {
        toggleVisible(errorMessageDiv);
      }
    }
  };

  return (
    <div id="swarm-deploy-div"> 
      <div id="swarm-btn-div">
        <button
          id="swarm-deploy-btn"
          onClick={() => {
            if (hiddenDiv) {
              toggleVisible(hiddenDiv);
            }}}>
              <span><FaUpload className="open-button" size={24} /></span>
               Deploy to Swarm
        </button>
      </div>

      <div id="hidden-swarm-div">
        <div id="button-and-other-divs">
          <div id="exit-swarm-deploy-div">
            <button id="exit-swarm-deploy-box"
              onClick={() => {
                if (hiddenDiv) {
                  toggleHidden(errorMessageDiv);
                  toggleHidden(successMessageDiv);
                  toggleHidden(hiddenDiv);
              }}}>X</button> 
          </div>

          <div id="initialize-swarm">
            <label htmlFor="stack-name" id="stack-name-label">Stack Name</label>
            <input id="stack-name" name="stack-name" placeholder="Enter name...."></input>
            <button 
              id="create-swarm" 
              onClick={() => getNameAndDeploy(event)}>
              Create Swarm
            </button>
          </div>

          <div className="message-from-swarm-div">
            <div className="error-div">
              <p className="error-p">Sorry, there was an issue initializing your swarm</p>

            </div>
            <div className="success-div">
              <p className="success-p"></p>
            </div>
          </div> 
        </div>
      </div>
    </div>
  )
};

export default DeploySwarm;
