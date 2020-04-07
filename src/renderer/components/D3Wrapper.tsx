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
import React from 'react';
// IMPORT COMPONENTS
import FileSelector from './FileSelector';
import VolumesWrapper from './VolumesWrapper';
import ErrorDisplay from './ErrorDisplay';
import View from './View';

// IMPORT HELPER FUNCTIONS
import { colorSchemeIndex } from '../helpers/colorSchemeHash';

// IMPORT TYPES
import {
  FileUpload,
  Services,
  SetSelectedContainer,
  Options,
  ReadOnlyObj,
  ViewT,
} from '../App.d';

type Props = {
  fileUpload: FileUpload;
  setSelectedContainer: SetSelectedContainer;
  fileUploaded: boolean;
  services: Services;
  options: Options;
  volumes: Array<ReadOnlyObj>;
  bindMounts: Array<string>;
  view: ViewT;
  networks: ReadOnlyObj;
  selectedNetwork: string;
  uploadErrors: string[];
};

const D3Wrapper: React.FC<Props> = ({
  fileUploaded,
  fileUpload,
  services,
  setSelectedContainer,
  options,
  volumes,
  bindMounts,
  view,
  networks,
  selectedNetwork,
  uploadErrors,
}) => {
  // invoke function that returns a function with the closure object for tracking colors
  const getColor = colorSchemeIndex();

  return (
    <div className="d3-wrapper">
      {!fileUploaded ? (
        <div className="error-upload-wrapper">
          {uploadErrors.length > 0 ? (
            <ErrorDisplay uploadErrors={uploadErrors} />
          ) : (
            <></>
          )}
          <FileSelector fileUpload={fileUpload} />
        </div>
      ) : (
        <>
          <div className="services-wrapper">
            <View
              services={services}
              setSelectedContainer={setSelectedContainer}
              options={options}
              view={view}
              networks={networks}
              selectedNetwork={selectedNetwork}
              getColor={getColor}
            />
          </div>
          <VolumesWrapper
            bindMounts={bindMounts}
            volumes={volumes}
            getColor={getColor}
          />
        </>
      )}
    </div>
  );
};

export default D3Wrapper;
