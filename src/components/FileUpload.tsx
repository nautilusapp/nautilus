import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { FileUpload } from '../App.d';

type Props = {
  fileUpload: FileUpload;
};

const FileUpload: React.FC<Props> = ({ fileUpload }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.currentTarget;
    const formData = new FormData();
    const file = target.yaml.files[0];
    formData.append('yaml', file);

    fileUpload(formData);
  };

  return (
    <div >
      <Form className="file-upload" onSubmit={handleSubmit} encType="multipart/form-data">
        <Form.Label htmlFor="files">Upload your Docker Compose File</Form.Label>
        <Form.Control
          id="files"
          type="file"
          name="yaml"
          accept=".yml,.yaml"
          style={{ display: 'none' }}
        ></Form.Control>
        <Button type="submit">Upload</Button>
      </Form>
    </div>
  );
};
export default FileUpload;
