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

import React, { useState, useEffect } from 'react';
import { FaUpload } from 'react-icons/fa';
import { runDockerSwarmDeployment, runLeaveSwarm } from '../../common/runShellTasks';

type Props = {
  currentFile: string,
};

const DeploySwarm: React.FC<Props> = ({
  currentFile
}) => {
  // Create React hooks to hold onto state
  const [success, setSuccess] = useState(false);
  const [swarmExists, setSwarmExists] = useState(false);
  const [stdOutMessage, setStdOutMessage] = useState('');
  const [nodeAddress, setNodeAddress] = useState('');
  const [infoFromSwarm, setInfoFromSwarm] = useState({});
  const [swarmDeployState, setSwarmDeployState] = useState(0);
  const [popUpContent, setPopupContent] = useState(<div>Hey</div>);


  
  const hiddenDiv: any = document.getElementById('hidden-swarm-div');
  // const successMessageDiv: any = document.querySelector('.success-div');
  // const successMessage: any = document.querySelector('.success-p');
  // const errorMessageDiv: any = document.querySelector('.error-div');
  // const errorMessage: any = document.querySelector('.error-p');
  // const initSwarmDiv: any = document.querySelector('#initialize-swarm');
  // const popupWrapper: any = document.querySelector('.popup-content-wrapper');
  
  // save html code in variables for easier access later
  const popupStartDiv = (<div id="initialize-swarm">
                            <label htmlFor="stack-name" id="stack-name-label">Stack Name</label>
                            <input id="stack-name" name="stack-name" placeholder="Enter name...."></input>
                            <button 
                              id="create-swarm" 
                              onClick={() => getNameAndDeploy(event)}>
                              Create Swarm
                            </button>
                          </div>);
  
  const successDiv = (<div className="success-div">
                        <p className="success-p"><span className="swarm-spans">Success! Your swarm has been deployed!</span>
                                                                <br></br>The current node {nodeAddress} is now a manager</p>
                      </div>);
  const errorDiv = (<div className="error-div">
                      <p className="error-p">Sorry, there was an issue initializing your swarm</p>

                      <button
                        className="swarm-btn" 
                        onClick={() => {
                          leaveSwarm();
                      }}>Try Again</button>
                    </div>);


  // change visibility of HTML element from hidden to visible or vice versa
  const toggleVisible = (element: any) => {
    if (element) element.style.visibility = 'visible';
  }
  const toggleHidden = (element: any) => {
    if (element) element.style.visibility = 'hidden';
  }

  // retrieve input from user and pass it to runDockerSwarmDeployment as an argument
  // the function will return stdout from running each function, so that we have access to that info
  const getNameAndDeploy = async (event: any) => {
    const stackName: string = event.target.parentNode.querySelector('#stack-name').value;
    event.target.parentNode.querySelector('#stack-name').value = null;

    setSwarmDeployState(1);
    // toggleHidden(initSwarmDiv);

    const returnedFromPromise = await runDockerSwarmDeployment(currentFile, stackName);
    const infoReturned = JSON.parse(returnedFromPromise);
    setInfoFromSwarm(infoReturned);
    
    console.log(infoReturned);

    if (!infoReturned.init.error) {
      setStdOutMessage(infoReturned.init.out.split('\n')[0]);
      console.log(stdOutMessage);
      console.log(infoFromSwarm);
      setNodeAddress(infoReturned.init.out.split('\n')[0].split(' ')[4].replace(/[()]/g, ''));
      setSuccess(true);
      setSwarmExists(true);
      setSwarmDeployState(2);
    } else {
      setSwarmExists(true);
      setSuccess(false);
      setSwarmDeployState(0);
    }
  };

  const leaveSwarm = () => {
    toggleHidden(hiddenDiv);
    setSwarmExists(false);
    setSuccess(false);
    runLeaveSwarm();
    setSwarmDeployState(0);
  }

  let swarmBtnTitle: any, swarmOnClick: any;

  if (!swarmExists || swarmExists && !success) {
    swarmBtnTitle = 'Deploy to Swarm';
    swarmOnClick = () => {
      if (hiddenDiv) {
        toggleVisible(hiddenDiv);
        // toggleVisible(initSwarmDiv);
      }
    };
  } else if (swarmExists && success) {
    swarmBtnTitle = 'Leave Swarm';
    swarmOnClick = () => {
      leaveSwarm();
    }
  } 

    // if (!infoFromSwarm.init.error) {
    //   const stdOutMessage = infoFromSwarm.init.out.split('\n')[0];
    //   // setStdOutMessage(infoFromSwarm.init.out.split('\n')[0]);
    //   let nodeManagerAddress = stdOutMessage.split(' ')[4].replace(/[()]/g, '');
    //   console.log(nodeManagerAddress);

    //   if (successMessageDiv) {
    //     const posMsg = `Success! Your swarm has been deployed!\nThe current node ${nodeAddress} is now a manager`;
    //     successMessage.innerText = posMsg;
    //     toggleVisible(successMessageDiv);
    //   } 
    // } else {
    //   if (errorMessageDiv) {
    //     toggleVisible(errorMessageDiv);
    //   }
    // }

  useEffect(() => {
    console.log(swarmExists);

    if (!swarmExists) {
      setPopupContent(popupStartDiv);
    }
  }, [swarmExists]);

  useEffect(() => {
    if (swarmExists && success) {
      setPopupContent(successDiv);
    }
  }, [success, swarmExists]);

  useEffect(() => {
    if (swarmExists && !success) {
      setPopupContent(errorDiv);
    } 
  }, [success, swarmExists]);

  return (
    <div className="deploy-container" > 
        <button
          className="deploy-btn"
          onClick={swarmOnClick}>
              <span><FaUpload className="open-button" size={24} /></span>
               {swarmBtnTitle}
        </button>
        <div className='status-container'>
          <span className={`deployment-status status-healthy ${swarmDeployState === 3 || swarmDeployState === 2 ? 'status-active' : ''}`}></span>
          <span className={`deployment-status status-moderate ${swarmDeployState === 1 ? 'status-active' : ''}`}></span>
          <span className={`deployment-status status-dead ${swarmDeployState === 0 ? 'status-active' : ''}`}></span>
      </div>


      <div id="hidden-swarm-div">
        <div id="button-and-other-divs">
          <div id="exit-swarm-deploy-div">
            <button id="exit-swarm-deploy-box"
              onClick={() => {
                if (hiddenDiv) {
                  // toggleHidden(errorMessageDiv);
                  // toggleHidden(successMessageDiv);
                  // toggleHidden(initSwarmDiv);
                  toggleHidden(hiddenDiv);
              }}}>X</button> 
          </div>

          <div className="popup-content-wrapper">    
            {popUpContent}
          </div>

        </div>
      </div>
    </div>
  )
};

export default DeploySwarm;
