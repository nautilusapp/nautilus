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
import setD3State from './helpers/setD3State';
import parseOpenError from './helpers/parseOpenError';
import runDockerComposeValidation from '../common/dockerComposeValidation';
import resolveEnvVariables from '../common/resolveEnvVariables';

// IMPORT REACT CONTAINERS OR COMPONENTS
import LeftNav from './components/LeftNav';
import OptionBar from './components/OptionBar';
import D3Wrapper from './components/D3Wrapper';
import TabBar from './components/TabBar';

//IMPORT TYPES
import {
  State,
  FileOpen,
  UpdateOption,
  UpdateView,
  SelectNetwork,
} from './App.d';

const initialState: State = {
  openFiles: [],
  openErrors: [],
  selectedContainer: '',
  fileOpened: false,
  services: {},
  dependsOn: {
    name: 'placeholder',
  },
  networks: {},
  selectedNetwork: '',
  volumes: {},
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

  updateView: UpdateView = (view) => {
    this.setState((state) => {
      return {
        ...state,
        view,
        selectedNetwork: '',
      };
    });
  };

  updateOption: UpdateOption = (option) => {
    const newState: State = {
      ...this.state,
      options: { ...this.state.options, [option]: !this.state.options[option] },
    };
    // check if toggling select all on or off
    if (option === 'selectAll') {
      if (newState.options.selectAll) {
        newState.options.ports = true;
        newState.options.volumes = true;
      } else {
        newState.options.ports = false;
        newState.options.volumes = false;
      }
      // check if select all should be on or off
    } else {
      if (newState.options.ports && newState.options.volumes) {
        newState.options.selectAll = true;
      } else {
        newState.options.selectAll = false;
      }
    }

    this.setState(newState);
  };

  selectNetwork: SelectNetwork = (network) => {
    this.setState({ view: 'networks', selectedNetwork: network });
  };

  convertAndStoreYamlJSON = (yamlText: string, filePath: string) => {
    const yamlJSON = yaml.safeLoad(yamlText);
    const yamlState = convertYamlToState(yamlJSON);
    const openFiles = this.state.openFiles.slice()
    openFiles.push(filePath);
    // set global variables for d3 simulation
    window.d3State = setD3State(yamlState.services);
    localStorage.setItem('state', JSON.stringify(yamlState));
    localStorage.setItem(`${filePath}`, JSON.stringify(yamlState));
    this.setState(Object.assign(initialState, yamlState, { openFiles }));
  };

  /**
   * @param file: a File classed object
   * @returns void
   * @description validates the docker-compose file
   * ** if no errors, passes file string along to convert and store yaml method
   * ** if errors, passes error string to handle file open errors method
   */
  fileOpen: FileOpen = (file: File) => {
    const fileReader = new FileReader();
    // check for valid file path
    if (file.path) {
      runDockerComposeValidation(file.path).then((validationResults: any) => {
        if (validationResults.error) {
          this.handleFileOpenError(validationResults.error);
        } else {
          console.log('Validation results: ', validationResults)
          // event listner to run after the file has been read as text
          fileReader.onload = () => {
            // if successful read, invoke method to convert and store to state
            if (fileReader.result) {
              console.log('fileReader.result: ', fileReader.result)
              let yamlText = fileReader.result.toString();
              //if docker-compose uses env file, replace the variables with value from env file
              if (validationResults.envResolutionRequired) {
                yamlText = resolveEnvVariables(yamlText, file.path);
              }
              this.convertAndStoreYamlJSON(yamlText, file.path);
            }
          };
          // read the file
          fileReader.readAsText(file);
        }
      });
    }
  };

  /**
   * @param errorText -> string
   * @returns void
   * @description sets state with array of strings of different errors
   */
  handleFileOpenError = (errorText: Error) => {
    const openErrors = parseOpenError(errorText);
    this.setState({
      ...initialState,
      openErrors,
      fileOpened: false,
    });
  };

  componentDidMount() {
    if (ipcRenderer) {
      ipcRenderer.on('file-open-error-within-electron', (event, arg) => {
        this.handleFileOpenError(arg);
      });
      ipcRenderer.on('file-opened-within-electron', (event, arg) => {
        console.log('arg: ', arg)
        this.convertAndStoreYamlJSON(arg, '');
      });
    }
    const stateJSON = localStorage.getItem('state');
    if (stateJSON) {
      const stateJS = JSON.parse(stateJSON);
      // set d3 state
      window.d3State = setD3State(stateJS.services);
      this.setState(Object.assign(initialState, stateJS));
    }
  }

  componentWillUnmount() {
    if (ipcRenderer) {
      ipcRenderer.removeAllListeners('file-opened-within-electron');
      ipcRenderer.removeAllListeners('file-open-error-within-electron');
    }
  }

  render() {
    return (
      <div className="app-class">
        {/* dummy div to create draggable bar at the top of application to replace removed native bar */}
        <div className="draggable"></div>
        <LeftNav
          fileOpened={this.state.fileOpened}
          fileOpen={this.fileOpen}
          selectedContainer={this.state.selectedContainer}
          service={this.state.services[this.state.selectedContainer]}
        />
        <div className="main flex">
          <OptionBar
            view={this.state.view}
            options={this.state.options}
            networks={this.state.networks}
            updateView={this.updateView}
            updateOption={this.updateOption}
            selectNetwork={this.selectNetwork}
            selectedNetwork={this.state.selectedNetwork}
          />
          <TabBar openFiles={this.state.openFiles} />
          <D3Wrapper
            openErrors={this.state.openErrors}
            fileOpened={this.state.fileOpened}
            fileOpen={this.fileOpen}
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
