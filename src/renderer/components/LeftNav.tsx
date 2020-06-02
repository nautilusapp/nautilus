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
import Title from './Title';
import { FileOpen, Service } from '../App.d';
//import { runDockerComposeDeployment } from '../../common/runBashTasks';
import Deployment from './Deployment';

type Props = {
  service: Service;
  selectedContainer: string;
  fileOpen: FileOpen;
  fileOpened: boolean;
  deployCompose: () => void;
};

/*
const onClick = () => {
  const fp = '/Users/yevgeniyskroznikov/Desktop/docker/docker-compose.yml';
  runDockerComposeDeployment(fp).then((validationResults: any) => console.log(validationResults));
};*/

const LeftNav: React.FC<Props> = ({
  fileOpen,
  fileOpened,
  selectedContainer,
  service,
  deployCompose
}) => {
  return (
    <div className="left-nav">
      <div className="top-half">
        <Title />
        {fileOpened ? <FileSelector fileOpen={fileOpen} /> : null}
      </div>
      <ServiceInfo selectedContainer={selectedContainer} service={service} />
      <Deployment onDeploy={deployCompose}/>
    </div>
  );
};

export default LeftNav;
