import React, { useState } from 'react';
// import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaUpload } from 'react-icons/fa';

import { FileUpload } from '../App.d';

type Props = {
  fileUpload: FileUpload;
};

const FileUpload: React.FC<Props> = ({ fileUpload }) => {
  const [fileName, setFileName] = useState('');
  const [fileSelected, setFileSelected] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const file = e.currentTarget.yaml.files[0];
    fileUpload(file);
    setFileSelected(false);
    setFileName('');
  };
  return (
    <div>
      <Form
        className="file-upload"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h5>{!fileSelected ? 'Upload your Docker-Compose file' : fileName}</h5>
        <Form.Label htmlFor="files">
          {!fileSelected ? (
            <div className="select-file-button">
              <FaUpload size={32} />
            </div>
          ) : (
            <button type="submit" className="uploadButton">
              <FaUpload size={32} />
            </button>
          )}
        </Form.Label>
        <Form.Control
          id="files"
          type="file"
          name="yaml"
          accept=".yml,.yaml"
          style={{ display: 'none' }}
          onChange={(event: React.SyntheticEvent<HTMLInputElement>) => {
            if (event.currentTarget) {
              if (event.currentTarget.files) {
                setFileSelected(true);
                setFileName(event.currentTarget.files[0].name);
              }
            }
          }}
        />
      </Form>
    </div>
  );
};
export default FileUpload;
