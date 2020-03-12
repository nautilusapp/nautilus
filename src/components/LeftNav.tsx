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

type Props = {
  fileUploaded: () => void;
};

const LeftNav: React.FC<Props> = ({ fileUploaded }) => {
  return (
    <div className="left-nav">
      <h1>Nautilus</h1>
      <Button variant="secondary">hello noobs</Button>
      <FileSelector fileUploaded={fileUploaded} />
      <ServiceInfoDisplay />
    </div>
  );
};

export default LeftNav;
