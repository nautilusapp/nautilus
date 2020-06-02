import React from 'react';
import { FaUpload } from 'react-icons/fa';
/*
enum DeploymentStatus {
    Healthy = 1,
    Moderate,
    NotHealthy
};*/

type Props = {
    onDeploy: () => void;
    /*title: string;
    status: DeploymentStatus;
    info: string;*/
};

const Deployment: React.FC<Props> = ({onDeploy}) => {
  return (
    <div className='deployment-container'>
      <div className='button-container'>
        <FaUpload onClick={onDeploy} className="deployment-button" size={24} />
        <span className='deployment-title'>Deploy Compose</span>
      </div>
      <div className='status-container'>
        <span className='deployment-status status-healthy'></span>
        <span className='deployment-status status-moderate'></span>
        <span className='deployment-status status-dead status-active'></span>
      </div>
    </div>
  );
};

export default Deployment;