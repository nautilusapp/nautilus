/* eslint-disable */
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

  const hiddenDivStyle = {
    visibility: "hidden" as "hidden", 
    position: "absolute" as "absolute", 
    width: "30em", 
    height: "15em", 
    marginLeft: "25em",
    marginBottom: "25em",
    backgroundColor: "#DfE9FD"
  }


  const getNameAndDeploy = (event: any) => {
    console.log(event.target.parentNode.querySelector('#stack-name').value);
    const swarmName: string = event.target.parentNode.querySelector('#stack-name').value;

    runDockerSwarmDeployment(path, swarmName);
  }

  return (
    <div id="swarm-deploy-div" 
      style={{display: "flex", justifyContent: "space-around", backgroundColor: "teal", color: "white", width: "100", height: "6em", textAlign: "center", marginBottom: "3em"}}>
      <button
        style={{backgroundColor: "teal", color: "white", fontSize: "1.3em", width: "100%"}}
        onClick={() => {
          if (hiddenDiv) {
            hiddenDiv.style.visibility = "visible";
          }
        }}>
          Deploy to Swarm
      </button>

      <div id="hidden-swarm-div" style={hiddenDivStyle}>

        <label htmlFor="stack-name" style={{color: "teal", fontSize: "1.2em"}}>Stack Name</label><br></br>
        <input id="stack-name" name="stack-name" placeholder="Enter name...."></input><br></br>
        <button 
          id="create-swarm" 
          onClick={() => getNameAndDeploy(event)}
          style={{backgroundColor: "teal", color: "white", fontSize: "1em", width: "40%"}}>
          Create Swarm</button>
      </div>
    </div> 
  )
};

export default DeploySwarm;
