/**
 * ************************************
 *
 * @module  FileSelector.tsx
 * @author Mike D
 * @date 3/11/20
 * @description Button to allow user to open docker-compose file
 *
 * ************************************
 */
import React from 'react';
import { FaUpload } from 'react-icons/fa';

import { FileOpen } from '../App.d';

type Props = {
  fileOpen: FileOpen;
};

const FileSelector: React.FC<Props> = ({ fileOpen }) => {
  return (
    <div className="file-open">
      <label htmlFor="files">
        <div className="select-file-button open-flex">
          <FaUpload className="open-button" size={24} />
          <h5>Open</h5>
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
          // console.log('FileSelector Event and event.currentTarget', event, event.currentTarget)
          if (event.currentTarget) {
            // make sure user opened a file
            if (event.currentTarget.files) {
              // fire fileOpen function on first file opened
              // console.log('Event.currentTarget.file', event.currentTarget.files[0] )
              fileOpen(event.currentTarget.files[0]);
            }
          }
        }}
      />
    </div>
  );
};
export default FileSelector;
