import React from 'react';
import { Button, Form } from 'react-bootstrap';

const FileSelector: React.FC = props => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.currentTarget as typeof e.currentTarget & {
      yaml: HTMLFormElement;
    };
    const formData = new FormData();
    const file = target.yaml.files[0];
    if (file !== null) {
      formData.append('yaml', file);
      fetch('https://testbackend.c0d3.com/file', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
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
