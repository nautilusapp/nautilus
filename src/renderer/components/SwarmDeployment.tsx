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
import Draggable from 'react-draggable';
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
  const [noFile, setNoFile] = useState(false);
  const [stdOutMessage, setStdOutMessage] = useState('');
  const [nodeAddress, setNodeAddress] = useState('');
  const [infoFromSwarm, setInfoFromSwarm] = useState({});
  const [swarmDeployState, setSwarmDeployState] = useState(0);
  const [popUpContent, setPopupContent] = useState(<div>Hey</div>);

  // keep a variable for access to hidden div in order to toggle hidden/visible
  // may be better way to do this?
  const hiddenDiv: any = document.getElementById('hidden-swarm-div');
  // save html code in variables for easier access later
  // the default for the pop-up div, before any interaction with swarm / after leaving swarm
  const popupStartDiv = (<div id="initialize-swarm">
                            <label htmlFor="stack-name" id="stack-name-label">Stack Name</label>
                            <input id="stack-name" name="stack-name" placeholder="Enter name...."></input>
                            <button 
                              id="create-swarm" 
                              onClick={() => { 
                                console.log('inside onclick', currentFile);
                                if (currentFile) {
                                  getNameAndDeploy(event)
                                } else {
                                  setSuccess(false);
                                  setNoFile(true);
                                  setSwarmDeployState(0);
                                }
                              }}>
                              Create Swarm
                            </button>
                          </div>);
  
  // render this div if successful joining swarm
  const successDiv = (<div className="success-div">
                        <p className="success-p"><span className="swarm-spans">Success! Your swarm has been deployed!</span>
                                                                <br></br>The current node {nodeAddress}<br></br>is now a manager</p>
                      </div>);

  // if unsuccessful / if no active file, render error dive                          
  const errorDiv = (<div className="error-div">
                      <p className="error-p">Sorry, there was an issue initializing your swarm</p>

                      <button
                        className="swarm-btn" 
                        onClick={() => {
                          leaveSwarm();
                      }}>Try Again</button>
                    </div>);


  // change visibility of HTML element from hidden to visible or vice versa
  // used for the popup box
  const toggleVisible = (element: any) => {
    if (element) element.style.visibility = 'visible';
  }
  const toggleHidden = (element: any) => {
    if (element) element.style.visibility = 'hidden';
  }

  // retrieve input from user and pass it to runDockerSwarmDeployment as an argument
  // the function will return stdout from running each function, so that we have access to that information
  const getNameAndDeploy = async (event: any) => {
    // get value from user's input
    const stackName: string = event.target.parentNode.querySelector('#stack-name').value;
    event.target.parentNode.querySelector('#stack-name').value = null;

    // hide pop-up while running commands
    toggleHidden(hiddenDiv);
    setSwarmDeployState(1);

    // await results from running dwarm deployment shell tasks 
    const returnedFromPromise = await runDockerSwarmDeployment(currentFile, stackName);
    const infoReturned = JSON.parse(returnedFromPromise);
    console.log(infoReturned);
    setInfoFromSwarm(infoReturned);

    // if there is no error on the returned object, swarm initialisation was successful 
    if (!infoReturned.init.error) {
      setStdOutMessage(infoReturned.init.out.split('\n')[0]);
      console.log(stdOutMessage);
      console.log(infoFromSwarm);
      // the split here is to get just the 25-character node ID of the swarm
      setNodeAddress(infoReturned.init.out.split('\n')[0].split(' ')[4].replace(/[()]/g, ''));
      setSuccess(true);
      setSwarmExists(true);
      setSwarmDeployState(2);
      toggleVisible(hiddenDiv);
    } else {
      setSwarmExists(true);
      setSuccess(false);
      setSwarmDeployState(0);
      toggleVisible(hiddenDiv);
    }
  };

  // function to allow the user to leave the swarm
  // called in onClicks
  const leaveSwarm = () => {
    toggleHidden(hiddenDiv);
    setSwarmExists(false);
    setSuccess(false);
    setNoFile(false);
    runLeaveSwarm();
    setSwarmDeployState(0);
  }

  // uninitialised variable allowing the values to change depending on state
  // used for swarm deploy button in leftNav
  let swarmBtnTitle: any, swarmOnClick: any;

  if (!swarmExists || swarmExists && !success) {
    swarmBtnTitle = 'Deploy to Swarm';
    swarmOnClick = () => {
      if (hiddenDiv) {
        toggleVisible(hiddenDiv);
      }
    };
  } else if (swarmExists && success) {
    swarmBtnTitle = 'Leave Swarm';
    swarmOnClick = () => {
      toggleHidden(hiddenDiv);

      leaveSwarm();
    }
  } 

  // Once component has mounted, check for changes in state and update component
  // depending on change
  // if there's no swarm and there is a file (defaults to true), show popup with input 
  useEffect(() => {
    if (!swarmExists && !noFile) {
      setPopupContent(popupStartDiv);
    }
  }, [swarmExists, noFile]);

  // if swarm exists and deployment was successful, render success div
  // else if swarm exists but deployment was unsuccessful, render error message
  useEffect(() => {
    if (swarmExists && success) {
      setPopupContent(successDiv);
    } else if (swarmExists && !success) {
      setPopupContent(errorDiv);
    } 
  }, [success, swarmExists]);

  // if there is no active file, ask user to open a file to deploy
  // TO DO - have different message from default error message
  // currently using default, but would be best to have a 'please open a file' message
  useEffect(() => {
    if (noFile) {
      setPopupContent(errorDiv);
    }
  }, [noFile]);

  return (
    <div className="deploy-container" > 
        <button
          className="deploy-btn"
          onClick={swarmOnClick}>
              <span><FaUpload className="deployment-button" size={24} /></span>
               {swarmBtnTitle}
        </button>
        <div className='status-container'>
          <span className={`deployment-status status-healthy ${swarmDeployState === 3 || swarmDeployState === 2 ? 'status-active' : ''}`}></span>
          <span className={`deployment-status status-moderate ${swarmDeployState === 1 ? 'status-active' : ''}`}></span>
          <span className={`deployment-status status-dead ${swarmDeployState === 0 ? 'status-active' : ''}`}></span>
      </div>


      <Draggable>
            <div id="hidden-swarm-div">
              <div id="button-and-other-divs">
                <div id="exit-swarm-deploy-div">
                  <button id="exit-swarm-deploy-box"
                    onClick={() => {
                      if (hiddenDiv) {
                        toggleHidden(hiddenDiv);
                    }}}>X</button> 
                </div>

                <div className="popup-content-wrapper">    
                  {popUpContent}
                </div>

              </div>
            </div>
      </Draggable>
    </div>
  )
};

export default DeploySwarm;
