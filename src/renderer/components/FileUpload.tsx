import React from 'react';
import { FaUpload } from 'react-icons/fa';

import { FileUpload } from '../App.d';

type Props = {
  fileUpload: FileUpload;
};

const FileUpload: React.FC<Props> = ({ fileUpload }) => {
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
          if (event.currentTarget) {
            if (event.currentTarget.files) {
              fileUpload(event.currentTarget.files[0]);
            }
          }
        }}
      />
    </div>
  );
};
export default FileUpload;
