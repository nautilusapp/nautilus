/**
 * ************************************
 *
 * @module  D3Wrapper.tsx
 * @author
 * @date 3/11/20
 * @description Container to hold all the d3 visualation components
 *
 * ************************************
 */
import React, { useState } from 'react';
import ServicesWrapper from './ServicesWrapper';
import DockerEngine from './DockerEngine';
import HostOS from './HostOS';
import FileSelector from './FileUpload';

//type import
import { FileUpload, State } from '../App.d';

type Props = {
  fileUpload: FileUpload;
  fileUploaded: boolean;
  serviceInfo: State;
};

const D3Wrapper: React.FC<Props> = ({
  serviceInfo,
  fileUploaded,
  fileUpload,
}) => {
  return (
    <div className="d3-wrapper">
      <ServicesWrapper serviceInfo={serviceInfo} />
      <div className="initial-file-upload">
        {!fileUploaded ? (
          <FileSelector
            fileUpload={fileUpload}
            locatedWithinVisualizer={true}
          />
        ) : null}
      </div>
      <DockerEngine />
      <HostOS />
    </div>
  );
};

export default D3Wrapper;
