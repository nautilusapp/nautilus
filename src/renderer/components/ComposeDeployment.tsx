import React from 'react';
import { FaUpload, FaDownload } from 'react-icons/fa';
import { remote } from 'electron';

enum DeploymentStatus {
    Dead = 0,
    DeadError,
    Checking,
    Deploying,
    Undeploying,
    Warning,
    Running
};

type Props = {
    onDeploy: () => void;
    onKill: () => void;
    deployState: number;
    deployErrorMessage: string;
};

const Deployment: React.FC<Props> = ({ onDeploy, onKill, deployState, deployErrorMessage }) => {
  deployCheck = (filePath: string) => {
    this.setState({deployComposeState: DeploymentStatus.Checking})
    runDockerComposeListContainer(filePath)
    .then((results: any) => {
      console.log(results);
      if(results.error) this.setState({deployComposeState: DeploymentStatus.DeadError, deployErrorMessage: results.error.message})
      else if(results.out.split('\n').length > 3){
        console.log(results.out.split('\n'));
        if(results.out.includes('Exit')) this.setState({deployComposeState: DeploymentStatus.Dead})
        else this.setState({deployComposeState: DeploymentStatus.Running})
      }
      else this.setState({deployComposeState: DeploymentStatus.Dead});
    });
  }

  deployCompose = () => {
    this.setState({deployComposeState: DeploymentStatus.Deploying})
    runDockerComposeDeployment(this.state.filePath)
      .then((results: any) => { 
        if(results.error) {
            this.setState({deployComposeState: DeploymentStatus.DeadError, deployErrorMessage: results.error.message})
        }
        else this.setState({deployComposeState: DeploymentStatus.Running})
      })
      .catch(err => console.log('err', err));
  }

  deployKill = () => {
    runDockerComposeKill(this.state.filePath).then(() => this.setState({ deployComposeState: DeploymentStatus.Dead }));
    this.setState({ deployComposeState: DeploymentStatus.Undeploying });
  }
    
  const onErrorClick = () => {
    const dialog = remote.dialog;
    dialog.showErrorBox('Error Message:', JSON.stringify(deployErrorMessage));
  }

  let title, onClick, iconButton = <FaUpload className="deployment-button" size={24} />;
  if(deployState === DeploymentStatus.Checking){
    title = 'Checking..'
    onClick = () => {}
  }
  else if(deployState === DeploymentStatus.Dead || deployState === DeploymentStatus.DeadError){
    title = "Deploy Container"
    onClick = onDeploy;
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
    onClick = onKill;
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
export { DeploymentStatus };