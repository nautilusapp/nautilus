import React from 'react';
import { FaUpload } from 'react-icons/fa';
/*
enum DeploymentStatus {
    Healthy = 1,
    Moderate,
    InProgress,
    Dead
};*/

type Props = {
    onDeploy: () => void;
    onKill: () => void;
    deployState: number;
    /*title: string;
    status: DeploymentStatus;
    info: string;*/
};

const Deployment: React.FC<Props> = ({ onDeploy, onKill, deployState }) => {
  let title = 'Deploy Compose';
  let onClick = onDeploy;
  if(deployState === 1){
    title = 'Deploying..';
    onClick = () => {};
  }
  else if (deployState >= 2) {
    title = 'Kill Compose';
    onClick = onKill;
  }
  
  return (
    <div className='deployment-container'>
      <div onClick={onClick} className='button-container'>
        <FaUpload className="deployment-button" size={24} />
        <span className='deployment-title'>{title}</span>
      </div>
      <div className='status-container'>
        <span className={`deployment-status status-healthy ${deployState === 3 || deployState === 2 ? 'status-active' : ''}`}></span>
        <span className={`deployment-status status-moderate ${deployState === 1 || deployState === 2 ? 'status-active' : ''}`}></span>
        <span className={`deployment-status status-dead ${deployState === 0 ? 'status-active' : ''}`}></span>
      </div>
    </div>
  );
};

export default Deployment;