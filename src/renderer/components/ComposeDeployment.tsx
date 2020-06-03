import React, { useState, useEffect } from 'react';
import { FaUpload, FaDownload } from 'react-icons/fa';
import { remote } from 'electron';
import { 
  runDockerComposeDeployment,
  runDockerComposeKill,
  runDockerComposeListContainer
} from '../../common/runShellTasks';

enum DeploymentStatus {
    NoFile = -1,
    Dead,
    DeadError,
    Checking,
    Deploying,
    Undeploying,
    Warning,
    Running
};

type Props = {
    currentFilePath: string;
};

const Deployment: React.FC<Props> = ({ currentFilePath }) => {
  const [ deployState, setDeployState ] = useState(DeploymentStatus.NoFile);
  const [ errorMessage, setErrorMessage ] = useState('');

  useEffect(() => {
    if(currentFilePath !== '') deployCheck();
    else if(deployState !== DeploymentStatus.NoFile) setDeployState(DeploymentStatus.NoFile);
  }, [currentFilePath]);

  const deployCheck = () => {
    setDeployState(DeploymentStatus.Checking)
    runDockerComposeListContainer(currentFilePath)
    .then((results: any) => {
      if(results.error) {
        setErrorMessage(results.error.message);
        setDeployState(DeploymentStatus.DeadError);
      } 
      else if(results.out.split('\n').length > 3){
        if(results.out.includes('Exit')) setDeployState(DeploymentStatus.Dead);
        else setDeployState(DeploymentStatus.Running);
      }
      else setDeployState(DeploymentStatus.Dead);
    });
  };

  const deployCompose = () => {
    setDeployState(DeploymentStatus.Deploying)
    runDockerComposeDeployment(currentFilePath)
      .then((results: any) => { 
        if(results.error) {;
          setErrorMessage(results.error.message);
          setDeployState(DeploymentStatus.DeadError);
        }
      else setDeployState(DeploymentStatus.Running);
    })
    .catch(err => console.log('err', err));
  }

  const deployKill = () => {
    runDockerComposeKill(currentFilePath).then(() => setDeployState(DeploymentStatus.Dead));
    setDeployState(DeploymentStatus.Undeploying);
  }

  const onErrorClick = () => {
    const dialog = remote.dialog;
    dialog.showErrorBox('Error Message:', errorMessage);
  }

  let title, onClick, iconButton = <FaUpload className="deployment-button" size={24} />;
  if(deployState === DeploymentStatus.NoFile){
    title = 'No Container To Deploy :(';
    onClick = () => {};
  }
  if(deployState === DeploymentStatus.Checking){
    title = 'Checking..'
    onClick = () => {}
  }
  else if(deployState === DeploymentStatus.Dead || deployState === DeploymentStatus.DeadError){
    title = "Deploy Container"
    onClick = deployCompose;
  }
  else if(deployState === DeploymentStatus.Deploying){
    title = 'Deploying..';
    onClick = () => {};
  }
  else if(deployState === DeploymentStatus.Undeploying){
    iconButton = <FaDownload className="deployment-button" size={24} />
    title = 'Undeploying..'
    onClick = () => {}
  }
  else if (deployState === DeploymentStatus.Running || deployState === DeploymentStatus.Warning) {
    iconButton = <FaDownload className="deployment-button" size={24} />
    title = 'Kill Container';
    onClick = deployKill;
  } 

  return (
    <div className='deployment-container'>
      <div onClick={onClick} className='button-container'>
        {iconButton}
        <span className='deployment-title'>{title}</span>
      </div>
      <div className='status-container'>
        <span className={`deployment-status status-healthy 
          ${deployState === DeploymentStatus.Running || 
            deployState === DeploymentStatus.Warning ? 'status-active' : ''}`}>
        </span>
        <span className={`deployment-status status-moderate 
          ${deployState === DeploymentStatus.Deploying || 
            deployState === DeploymentStatus.Undeploying ||
            deployState === DeploymentStatus.Warning ? 'status-active' : ''}`}>
        </span>
        <span onClick={deployState === DeploymentStatus.DeadError ? onErrorClick : () => {}}className={`deployment-status status-dead 
          ${deployState === DeploymentStatus.Dead || 
            deployState === DeploymentStatus.DeadError ? 'status-active' : ''}
          ${deployState === DeploymentStatus.DeadError ? 'clickable-status' : ''}`}>
          {deployState === DeploymentStatus.DeadError ? '!' : ''}
        </span>
      </div>
    </div>
  );
};

export default Deployment;