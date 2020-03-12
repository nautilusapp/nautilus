import React from 'react';
import { Button, Form } from 'react-bootstrap';

type Props = {
  fileUploaded: () => void;
};

const FileSelector: React.FC<Props> = ({ fileUploaded }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.currentTarget;
    const formData = new FormData();
    const file = target.yaml.files[0];
    if (file !== null) {
      formData.append('yaml', file);
      fetch('/api/file', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          fileUploaded();
          console.log(data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Form.Label htmlFor="files">Upload your yaml file</Form.Label>
        <Form.Control
          id="files"
          type="file"
          name="yaml"
          accept=".yml,.yaml"
          style={{ display: 'none' }}
        ></Form.Control>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};
export default FileSelector;
