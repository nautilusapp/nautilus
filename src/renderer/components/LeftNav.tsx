/**
 * ************************************
 *
 * @module  LeftNav.tsx
 * @author
 * @date 3/11/20
 * @description
 *
 * ************************************
 */
import React from 'react';

// IMPORT REACT COMPONENTS
import InfoDropdown from './InfoDropdown';
import FileSelector from './FileUpload';
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
