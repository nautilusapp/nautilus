import React from 'react';

/*
enum DeploymentStatus {
    Healthy = 1,
    Moderate,
    NotHealthy
};*/
/*
type Props = {
    onDeploy: () => void;
    title: string;
    status: DeploymentStatus;
    info: string;
  };*/

const Deployment: React.FC = () => {
  return (
    <div className='deployment-container'>
      <button>Deploy Compose</button>
      <span className='deployment-status status-healthy status-active'></span>
      <span className='deployment-status status-moderate'></span>
      <span className='deployment-status status-dead'></span>
    </div>
  );
};

export default Deployment;