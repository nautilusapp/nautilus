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
import { runDockerSwarmDeployment } from '../../common/runShellTasks';



const DeploySwarm = () => {
  const path: string = `/Users/k.c.wysocka/Desktop/Codesmith/production_project/hello_docker/docker-compose.yml`;
  const hiddenDiv = document.getElementById('hidden-swarm-div');

  const getNameAndDeploy = async (event: any) => {
    const swarmName: string = event.target.parentNode.querySelector('#stack-name').value;
    event.target.parentNode.querySelector('#stack-name').value = null;

    const returnedFromPromise = await runDockerSwarmDeployment(path, swarmName);
    const infoFromSwarm = JSON.parse(returnedFromPromise);
    console.log(infoFromSwarm);
  };

  return (
    <div id="swarm-deploy-div"> 
      <button
        id="swarm-deploy-btn"
        style={{backgroundColor: "teal", color: "white", fontSize: "1.3em", width: "100%"}}
        onClick={() => {
          if (hiddenDiv) {
            hiddenDiv.style.visibility = "visible";
          }}}>
          Deploy to Swarm
      </button>

      <div id="hidden-swarm-div">
        <label htmlFor="stack-name" id="stack-name-label">Stack Name</label><br></br>
        <input id="stack-name" name="stack-name" placeholder="Enter name...."></input><br></br>
        <button 
          id="create-swarm" 
          onClick={() => getNameAndDeploy(event)}
          style={{backgroundColor: "teal", color: "white", fontSize: "1em", width: "40%"}}>
          Create Swarm</button>

        <div className="message-from-swarm-div">
          <p className="error-p">Sorry, there was an issue deploying your swarm</p>
          <p className="success-p">Success! Your swarm has been deployed!</p>
        </div>  
      </div>
    </div> 
  )
};

export default DeploySwarm;
