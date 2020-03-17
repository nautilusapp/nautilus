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

import { State, FileUpload, UpdateOption } from './App.d';

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
  view: 'networks',
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
    this.updateOption = this.updateOption.bind(this);
    this.updateView = this.updateView.bind(this);
    this.setSelectedContainer = this.setSelectedContainer.bind(this);
  }
  setSelectedContainer = (containerName: string) => {
    this.setState({ ...this.state, selectedContainer: containerName });
  };
  updateView = (view: string) => {
    if (view === 'depends_on') {
      this.setState(state => {
        return {
          ...state,
          view,
          options: { ...state.options, dependsOn: false },
        };
      });
    } else {
      this.setState(state => {
        return {
          ...state,
          view,
        };
      });
    }
  };

  updateOption: UpdateOption = option => {
    this.setState(state => {
      return {
        ...state,
        options: { ...state.options, [option]: !state.options[option] },
      };
    });
  };

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
        <div className="main">
          <OptionBar
            view={this.state.view}
            options={this.state.options}
            updateView={this.updateView}
            updateOption={this.updateOption}
          />
          <D3Wrapper
            fileUploaded={this.state.fileUploaded}
            fileUpload={this.fileUpload}
            services={this.state.services}
            setSelectedContainer={this.setSelectedContainer}
          />
        </div>
      </div>
    );
  }
}

export default App;
