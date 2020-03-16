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
import ServiceInfoDisplay from './ServiceInfoDisplay';
import FileSelector from './FileUpload';
import Title from './Title';
import { FileUpload } from '../App.d';

type Props = {
  fileUpload: FileUpload;
  fileUploaded: boolean;
};

const LeftNav: React.FC<Props> = ({ fileUpload, fileUploaded }) => {
  return (
    <div className="left-nav">
      <Title />
      {fileUploaded ? <FileSelector fileUpload={fileUpload} /> : null}
      <ServiceInfoDisplay />
    </div>
  );
};

export default LeftNav;
