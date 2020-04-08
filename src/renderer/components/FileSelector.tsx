/**
 * ************************************
 *
 * @module  FileSelector.tsx
 * @author Mike D
 * @date 3/11/20
 * @description Button to allow user to upload docker-compose file
 *
 * ************************************
 */
import React from 'react';
import { FaUpload } from 'react-icons/fa';

import { FileUpload } from '../App.d';

type Props = {
  fileUpload: FileUpload;
};

const FileSelector: React.FC<Props> = ({ fileUpload }) => {
  return (
    <div className="file-upload">
      <label htmlFor="files">
        <div className="select-file-button upload-flex">
          <FaUpload className="upload-button" size={24} />
          <h5>Upload</h5>
        </div>
      </label>
      <input
        id="files"
        type="file"
        name="yaml"
        accept=".yml,.yaml"
        style={{ display: 'none' }}
        onChange={(event: React.SyntheticEvent<HTMLInputElement>) => {
          // make sure there was something selected
          if (event.currentTarget) {
            // make sure user uploaded a file
            if (event.currentTarget.files) {
              // fire fileUpload function on first file uploaded
              fileUpload(event.currentTarget.files[0]);
            }
          }
        }}
      />
    </div>
  );
};
export default FileSelector;
