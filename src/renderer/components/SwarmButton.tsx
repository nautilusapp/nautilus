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
// import deploySwarmCluster from '../../common/dockerSwarmDeployment';
// import { FileOpen } from '../App.d';

// type Props = {
//   openFileAndSendName: FileOpen;
// };

const SwarmButton = () => {
  const path = `/Users/k.c.wysocka/Desktop/Codesmith/production_project/hello_docker/docker-compose.yml`;

  return (
    <div id="swarm-deploy-div" 
      style={{display: "flex", justifyContent: "space-around", backgroundColor: "teal", color: "white", width: "100", height: "6em", textAlign: "center", marginBottom: "3em"}}>
      <button
        style={{backgroundColor: "teal", color: "white", fontSize: "1.3em", width: "100%"}}
        onClick={() => {
          console.log(path);
        }}
      >
        Deploy to Swarm</button>
    </div> 

  )
};

export default SwarmButton;
