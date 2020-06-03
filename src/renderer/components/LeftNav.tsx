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

import ComposeDeployment from './ComposeDeployment';

type Props = {
  service: Service;
  selectedContainer: string;
  fileOpen: FileOpen;
  fileOpened: boolean;
  filePath: string;
};

const LeftNav: React.FC<Props> = ({
  fileOpen,
  fileOpened,
  selectedContainer,
  service,
  filePath
}) => {
  return (
    <div className="left-nav">
      <div className="top-half">
        <Title />
        {fileOpened ? <FileSelector fileOpen={fileOpen} /> : null}
      </div>
      <ServiceInfo selectedContainer={selectedContainer} service={service} />
      <ComposeDeployment filePath={filePath}/>
    </div>
  );
};

export default LeftNav;
