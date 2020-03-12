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
import Button from 'react-bootstrap/Button';
import FileSelector from './FileUpload';

import { FileUpload } from '../App.d';

type Props = {
  fileUpload: FileUpload;
};

const LeftNav: React.FC<Props> = ({ fileUpload }) => {
  return (
    <div className="left-nav">
      <h1>Nautilus</h1>
      <Button variant="secondary">hello noobs</Button>
      <FileSelector fileUpload={fileUpload} />
      <ServiceInfoDisplay />
    </div>
  );
};

export default LeftNav;
