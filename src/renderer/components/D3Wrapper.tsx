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
import ServicesWrapper from './ServicesWrapper';
import FileSelector from './FileUpload';
import VolumesWrapper from './VolumesWrapper';
import ErrorDisplay from './ErrorDisplay';
import { colorSchemeIndex } from '../helpers/colorSchemeHash';
//type import
import {
  FileUpload,
  Services,
  SetSelectedContainer,
  Options,
  ReadOnlyObj,
  ViewT,
  Networks,
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
  networks: Networks;
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
  uploadErrors,
}) => {
  const getColor: any = colorSchemeIndex();
  const bindMountsProps = {
    bindMounts: bindMounts,
    getColor: getColor,
  };
  const dockerEngineProps = {
    volumes: volumes,
    getColor: getColor,
  };

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
          <ServicesWrapper
            services={services}
            setSelectedContainer={setSelectedContainer}
            options={options}
            view={view}
            networks={networks}
            {...dockerEngineProps}
            {...bindMountsProps}
          />
          <VolumesWrapper {...dockerEngineProps} {...bindMountsProps} />
        </>
      )}
    </div>
  );
};

export default D3Wrapper;
