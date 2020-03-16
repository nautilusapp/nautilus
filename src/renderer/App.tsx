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
//IMPORT LIBRARIES
import React, { Component } from 'react';
import yaml from 'js-yaml';

//IMPORT HELPER FUNCTIONS
import { convertYamlToState } from './helpers/yamlParser';

// IMPORT STYLES
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.scss';

// IMPORT REACT CONTAINERS OR COMPONENTS
import LeftNav from './components/LeftNav';
import OptionBar from './components/OptionBar';
import D3Wrapper from './components/D3Wrapper';

import { State, FileUpload } from './App.d';

const initialState: State = {
  selectedContainer: 'app',
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

  fileUpload: FileUpload = (file: File) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.result) {
        const yamlJSON = yaml.safeLoad(fileReader.result.toString());
        const yamlState = convertYamlToState(yamlJSON);
        localStorage.setItem('state', JSON.stringify(yamlState));
        this.setState(
          Object.assign(
            initialState,
            { options: this.state.options, view: this.state.view },
            yamlState,
          ),
        );
      }
    };
    fileReader.readAsText(file);
  };

  componentDidMount() {
    const stateJSON = localStorage.getItem('state');
    if (stateJSON) {
      const stateJS = JSON.parse(stateJSON);
      this.setState(Object.assign(initialState, stateJS));
    }
  }

  render() {
    return (
      <div className="app-class">
        <LeftNav
          fileUploaded={this.state.fileUploaded}
          fileUpload={this.fileUpload}
          selectedContainer={this.state.selectedContainer}
          service={this.state.services[this.state.selectedContainer]}
        />
        <OptionBar />
        <D3Wrapper
          fileUploaded={this.state.fileUploaded}
          fileUpload={this.fileUpload}
          serviceInfo={this.state.services}
        />
      </div>
    );
  }
}

export default App;
