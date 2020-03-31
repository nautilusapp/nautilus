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
import { ipcRenderer } from 'electron';

//IMPORT HELPER FUNCTIONS
import convertYamlToState from './helpers/yamlParser';
import { firstTwo } from './helpers/selectAll';
import setGlobalVars from './helpers/setGlobalVars';
import parseUploadError from './helpers/parseUploadError';
import runDockerComposeValidation from '../common/dockerComposeValidation';

// IMPORT STYLES
import './styles/app.scss';

// IMPORT REACT CONTAINERS OR COMPONENTS
import LeftNav from './components/LeftNav';
import OptionBar from './components/OptionBar';
import D3Wrapper from './components/D3Wrapper';

import {
  State,
  FileUpload,
  UpdateOption,
  UpdateView,
  SelectNetwork,
} from './App.d';

const initialState: State = {
  uploadErrors: [],
  selectedContainer: '',
  fileUploaded: false,
  services: {},
  dependsOn: {
    name: 'placeholder',
  },
  networks: {},
  selectedNetwork: '',
  volumes: [],
  volumesClicked: {},
  bindMounts: [],
  bindMountsClicked: {},
  view: 'depends_on',
  options: {
    ports: false,
    volumes: false,
    selectAll: false,
  },
  version: '',
};

class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = initialState;
  }
  setSelectedContainer = (containerName: string) => {
    this.setState({ ...this.state, selectedContainer: containerName });
  };
  updateView: UpdateView = e => {
    const view = e.currentTarget.id as 'networks' | 'depends_on';
    if (view === 'depends_on') {
      this.setState(state => {
        return {
          ...state,
          view,
          selectedNetwork: '',
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

  updateOption: UpdateOption = e => {
    const option = e.currentTarget.id;
    const selectAllClicked = option === 'selectAll' ? true : false;
    let newState: State = {
      ...this.state,
      options: { ...this.state.options, [option]: !this.state.options[option] },
    };
    if (firstTwo(newState) === true) {
      newState = {
        ...newState,
        options: { ...newState.options, selectAll: true },
      };
    }
    if (firstTwo(this.state) && selectAllClicked) {
      newState = {
        ...this.state,
        options: {
          ports: false,
          volumes: false,
          selectAll: false,
        },
      };
    } else if (!firstTwo(this.state) && selectAllClicked) {
      newState = {
        ...this.state,
        options: {
          ports: true,
          volumes: true,
          selectAll: true,
        },
      };
    } else if (this.state.options.selectAll === true && !firstTwo(newState)) {
      newState = {
        ...newState,
        options: { ...newState.options, selectAll: false },
      };
    }
    this.setState({
      ...newState,
    });
  };

  selectNetwork: SelectNetwork = e => {
    this.setState({ view: 'networks', selectedNetwork: e.currentTarget.value });
  };

  convertAndStoreYamlJSON = (yamlText: string) => {
    const yamlJSON = yaml.safeLoad(yamlText);
    const yamlState = convertYamlToState(yamlJSON);
    setGlobalVars(yamlState.services);
    localStorage.setItem('state', JSON.stringify(yamlState));
    this.setState(Object.assign(initialState, yamlState));
  };

  fileUpload: FileUpload = (file: File) => {
    const fileReader = new FileReader();
    runDockerComposeValidation(file.path).then((validationResults: any) => {
      if (validationResults.error) {
        this.handleFileUploadError(validationResults.error);
      } else {
        fileReader.onload = () => {
          if (fileReader.result) {
            this.convertAndStoreYamlJSON(fileReader.result.toString());
          }
        };
        fileReader.readAsText(file);
      }
    });
  };

  handleFileUploadError = (errorText: Error) => {
    const uploadErrors = parseUploadError(errorText);
    this.setState({
      ...initialState,
      uploadErrors,
      fileUploaded: false,
    });
  };

  componentDidMount() {
    ipcRenderer.on('file-upload-error-within-electron', (event, arg) => {
      this.handleFileUploadError(arg);
    });
    ipcRenderer.on('file-uploaded-within-electron', (event, arg) => {
      this.convertAndStoreYamlJSON(arg);
    });
    const stateJSON = localStorage.getItem('state');
    if (stateJSON) {
      const stateJS = JSON.parse(stateJSON);
      setGlobalVars(stateJS.services);
      this.setState(Object.assign(initialState, stateJS));
    }
  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners('file-uploaded-within-electron');
    ipcRenderer.removeAllListeners('file-upload-error-within-electron');
  }

  render() {
    return (
      <div className="app-class">
        <div className="draggable"></div>
        <LeftNav
          fileUploaded={this.state.fileUploaded}
          fileUpload={this.fileUpload}
          selectedContainer={this.state.selectedContainer}
          service={this.state.services[this.state.selectedContainer]}
        />
        <div className="main flex">
          <OptionBar
            services={this.state.services}
            view={this.state.view}
            options={this.state.options}
            networks={this.state.networks}
            updateView={this.updateView}
            updateOption={this.updateOption}
            selectNetwork={this.selectNetwork}
            selectedNetwork={this.state.selectedNetwork}
          />
          <D3Wrapper
            uploadErrors={this.state.uploadErrors}
            fileUploaded={this.state.fileUploaded}
            fileUpload={this.fileUpload}
            services={this.state.services}
            setSelectedContainer={this.setSelectedContainer}
            options={this.state.options}
            volumes={this.state.volumes}
            bindMounts={this.state.bindMounts}
            view={this.state.view}
            networks={this.state.networks}
            selectedNetwork={this.state.selectedNetwork}
          />
        </div>
      </div>
    );
  }
}

export default App;
