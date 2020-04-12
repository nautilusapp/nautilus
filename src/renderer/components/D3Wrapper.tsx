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
import colorSchemeIndex from '../helpers/colorSchemeIndex';

// IMPORT TYPES
import {
  FileOpen,
  Services,
  SetSelectedContainer,
  Options,
  ReadOnlyObj,
  ViewT,
} from '../App.d';

type Props = {
  fileOpen: FileOpen;
  setSelectedContainer: SetSelectedContainer;
  fileOpened: boolean;
  services: Services;
  options: Options;
  volumes: ReadOnlyObj;
  bindMounts: Array<string>;
  view: ViewT;
  networks: ReadOnlyObj;
  selectedNetwork: string;
  openErrors: string[];
};

const D3Wrapper: React.FC<Props> = ({
  fileOpened,
  fileOpen,
  services,
  setSelectedContainer,
  options,
  volumes,
  bindMounts,
  view,
  networks,
  selectedNetwork,
  openErrors,
}) => {
  // invoke function that returns a function with the closure object for tracking colors
  const getColor = colorSchemeIndex();

  return (
    <div className="d3-wrapper">
      {/**
       * if a file hasn't been opened
       * ** if errors, display them
       * ** always display open button
       * else display visualizer
       * (yes, this is nested terinary operator)
       */}
      {!fileOpened ? (
        <div className="error-open-wrapper">
          {openErrors.length > 0 ? (
            <ErrorDisplay openErrors={openErrors} />
          ) : (
            <></>
          )}
          <FileSelector fileOpen={fileOpen} />
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
