/**
 * ************************************
 *
 * @module  LeftNav.tsx
 * @author
 * @date 3/11/20
 * @description container for the title, the service info and the file open
 *
 * ************************************
 */
import React from 'react';

// IMPORT REACT COMPONENTS
import ServiceInfo from './ServiceInfo';
import FileSelector from './FileSelector';
import DeploySwarm from './SwarmDeployment';
// import SwarmButtonCluster from '../../common/dockerSwarmDeployment';
import Title from './Title';
import { FileOpen, Service } from '../App.d';

import Deployment from './Deployment';

type Props = {
  service: Service;
  selectedContainer: string;
  fileOpen: FileOpen;
  fileOpened: boolean;
  deployCompose: () => void;
  deployKill: () => void;
  deployState: number;
  currentFile: string;
};

const LeftNav: React.FC<Props> = ({
  fileOpen,
  fileOpened,
  selectedContainer,
  service,
  deployCompose,
  deployKill,
  deployState,
  currentFile,
}) => {
  return (
    <div className="left-nav">
      <div className="top-half">
        <Title />
        {fileOpened ? <FileSelector fileOpen={fileOpen} /> : null}
      </div>
      <ServiceInfo selectedContainer={selectedContainer} service={service} />
      <Deployment onDeploy={deployCompose} onKill={deployKill} deployState={deployState}/>
      <DeploySwarm currentFile={currentFile} />
    </div>
  );
};

export default LeftNav;
