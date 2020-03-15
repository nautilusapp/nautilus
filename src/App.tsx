/**
 * ************************************
 *
 * @module  App.tsx
 * @author Joshua Nordstrom
 * @date 3/7/20
 * @description start of the application
 *
 * ************************************
 */
import React, { Component } from 'react';

// IMPORT STYLES
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.scss';

// IMPORT REACT CONTAINERS OR COMPONENTS
import LeftNav from './components/LeftNav';
import OptionBar from './components/OptionBar';
import D3Wrapper from './components/D3Wrapper';
import Button from 'react-bootstrap/Button';

import { State, FileUpload } from './App.d';

const initialState: State = {
  selectedContainer: '',
  fileUploaded: false,
  services: {},
  dependsOn: {
    name: 'placeholder',
  },
  networks: {},
  volumes: [],
  volumesClicked: {},
  bindMounts: [],
  bindMountsClicked: {},
  view: 'default',
  options: {
    ports: false,
    volumes: false,
    dependsOn: false,
  },
  version: '',
};

class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = initialState;

    this.fileUpload = this.fileUpload.bind(this);
  }

  fileUpload: FileUpload = formData => {
    fetch('/api/file', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        this.setState(state => {
          return {
            ...state,
            ...data,
            fileUploaded: state.fileUploaded ? false : true,
          };
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <div className="app">
        <LeftNav
          fileUploaded={this.state.fileUploaded}
          fileUpload={this.fileUpload}
        />
        <OptionBar />
        <D3Wrapper
          fileUploaded={this.state.fileUploaded}
          fileUpload={this.fileUpload}
          serviceInfo={this.state}
        />
      </div>
    );
  }
}

export default App;
