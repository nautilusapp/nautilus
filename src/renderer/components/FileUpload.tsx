import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { FileUpload } from '../App.d';

type Props = {
  fileUpload: FileUpload;
  locatedWithinVisualizer?: boolean;
};

const FileUpload: React.FC<Props> = ({
  fileUpload,
  locatedWithinVisualizer,
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const file = e.currentTarget.yaml.files[0];
    //if no file, do nothing
    if (!file) return;
    fileUpload(file);
  };
  // const color = locatedWithinVisualizer ? 'black' : 'white';
  return (
    <div>
      <Form
        className="file-upload"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <Form.Label htmlFor="files">
          <div>Upload your Docker Compose File</div>
        </Form.Label>
        <Form.Control id="files" type="file" name="yaml" accept=".yml,.yaml" />
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};
export default FileUpload;
