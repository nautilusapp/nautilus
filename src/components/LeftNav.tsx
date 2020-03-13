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
import Title from './Title';
import Button from 'react-bootstrap/Button';
import FileSelector from './FileUpload';

type Props = {
  projectName: string;
};

const LeftNav: React.FC<Props> = ({ projectName }) => {
  return (
    <div className="left-nav">

      <Title projectName={projectName} />
      <FileSelector />
      <ServiceInfoDisplay />
    </div>
  );
};

export default LeftNav;
