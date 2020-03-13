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
};

const LeftNav: React.FC<Props> = ({ fileUpload }) => {
  return (
    <div className="left-nav">
      <Title />
      <FileSelector fileUpload={fileUpload} />
      <ServiceInfoDisplay />
    </div>
  );
};

export default LeftNav;
