/**
 * ************************************
 *
 * @module  LeftNav.tsx
 * @author
 * @date 3/11/20
 * @description container for the title, the service info and the file upload
 *
 * ************************************
 */
import React from 'react';

// IMPORT REACT COMPONENTS
import InfoDropdown from './ServiceInfo';
import FileSelector from './FileSelector';
import Title from './Title';
import { FileUpload, Service } from '../App.d';

type Props = {
  service: Service;
  selectedContainer: string;
  fileUpload: FileUpload;
  fileUploaded: boolean;
};

const LeftNav: React.FC<Props> = ({
  fileUpload,
  fileUploaded,
  selectedContainer,
  service,
}) => {
  return (
    <div className="left-nav">
      <div className="top-half">
        <Title />
        {fileUploaded ? <FileSelector fileUpload={fileUpload} /> : null}
      </div>
      <InfoDropdown selectedContainer={selectedContainer} service={service} />
    </div>
  );
};

export default LeftNav;
