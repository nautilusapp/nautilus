/* eslint-disable */
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
import { runDockerComposeValidation } from '../common/runShellTasks';
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
  SwitchTab,
} from './App.d';

const initialState: State = {
  openFiles: [],
  openErrors: [],
  selectedContainer: '',
  fileOpened: false,
  filePath: '',
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
  version: ''
};

class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    // Copy of initial state object
    this.state = {...initialState};
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
    // Make copy of current state;
    const yamlJSON = yaml.safeLoad(yamlText);
    const yamlState = convertYamlToState(yamlJSON, filePath);
    const openFiles = this.state.openFiles.slice();
    const { options } = this.state
    // Don't add a file that is already opened to the openFiles array
    if (!openFiles.includes(filePath)) openFiles.push(filePath);

    // set global variables for d3 simulation
    window.d3State = setD3State(yamlState.services);

    // store opened file state in localStorage under the current state item call "state" as well as an individual item using the filePath as the key.
    localStorage.setItem('state', JSON.stringify(yamlState));
    localStorage.setItem(`${filePath}`, JSON.stringify(yamlState));
    this.setState({...initialState, ...yamlState,  openFiles, options });
  };

  /**
   * @param file: a File classed object
   * @returns void
   * @description validates the docker-compose file
   * ** if no errors, passes file string along to convert and store yaml method
   * ** if errors, passes error string to handle file open errors method
   */
  fileOpen: FileOpen = (file: File) => {
    console.log('Opening file')
    const fileReader = new FileReader();
    // check for valid file path
    if (file.path) {
      /* TODO: refactor error handling */
      runDockerComposeValidation(file.path).then((validationResults: any) => {
        if (validationResults.error) {
          this.handleFileOpenError(validationResults.error);
        } else {
          // event listner to run after the file has been read as text
          fileReader.onload = () => {
            // if successful read, invoke method to convert and store to state
            if (fileReader.result) {
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
   * @param filePath -> string
   * @returns void
   * @description sets state to the state stored in localStorage of the file
   * associated with the given filePath.
   */
  switchToTab: SwitchTab = (filePath: string, openFiles?: Array<string>) => {
    // Copy of current options
    const { options }= this.state;
    // Extract the desired tab state from localStorage
    const tabState = JSON.parse(localStorage.getItem(filePath) || '{}');
    // Create new state object with the returned tab state
    let newState;
    if (openFiles) newState = {...this.state, ...tabState, openFiles, options}
    else newState = {...this.state, ...tabState, options};
    // Set the 'state' item in localStorage to the tab state. This means that tab is the current tab, which would be used if the app got reloaded.
    localStorage.setItem('state', JSON.stringify(tabState));
    // console.log('Services', newState.services)
    // Set the d3 state using the services extracted from the tabState and then setState
    window.d3State = setD3State(newState.services);
    this.setState(newState);
  }

  /**
   * @param filePath -> string
   * @returns void
   * @description removes the tab corresponding to the given file path
   */
  closeTab: SwitchTab = (filePath: string) => {
    // Grab current open files and remove the file path of the tab to be closed, assign the updated array to newOpenFiles
    const { openFiles, options } = this.state;
    const newOpenFiles = openFiles.filter(file => file != filePath);
    // Remove the state object associated with the file path in localStorage
    localStorage.removeItem(filePath);
    // If the tab to be closed is the active tab, reset d3 and delete "state" object from local storage and set state to the initial state with the updated open files array included.
    if (filePath === this.state.filePath){
      // Remove the 'state' localStorage item, which represents the services of the currently opened file.
      // Stop the simulation to prevent d3 transform errors related to 'tick' events
      localStorage.removeItem('state');
      const { simulation } = window.d3State;
      simulation.stop();
      if (openFiles.length > 1 ) this.switchToTab(newOpenFiles[0], newOpenFiles)
      else this.setState({...initialState, openFiles: newOpenFiles, options});
      
    }
    else this.setState({...this.state, openFiles: newOpenFiles });
  }

  /**
   * @param errorText -> string
   * @returns void
   * @description sets state with array of strings of different errors
   */
  handleFileOpenError = (errorText: Error) => {
    // Stop the simulation to prevent hundreds of d3 transform errors from occuring. This is rare but its a simple fix to prevent it.
    const { simulation } = window.d3State;
      simulation 
        .stop();
    // Grab the current openFiles array so that we don't lose them when setting state.
    const openErrors = parseOpenError(errorText);
    const { openFiles } = this.state;
    this.setState({
      ...initialState,
      openErrors,
      openFiles,
      fileOpened: false,
    });
  };

  componentDidMount() {
    console.log('D3State: ', window.d3State)
    console.log('ipcRenderer: ', ipcRenderer)
    if (ipcRenderer) {
      ipcRenderer.on('file-open-error-within-electron', (event, arg) => {
        this.handleFileOpenError(arg);
      });
      ipcRenderer.on('file-opened-within-electron', (event, arg) => {
        console.log('arg: ', arg);
        this.convertAndStoreYamlJSON(arg, '');
      });
    }
    const stateJSON = localStorage.getItem('state');
    if (stateJSON) {
      const stateJS = JSON.parse(stateJSON);
      // set d3 state
      window.d3State = setD3State(stateJS.services);

      //Create openFile state array from items in localStorage
      const openFiles = [];
      const keys = Object.keys(localStorage);
      for (let key of keys) {
        if (key !== 'state') {
          const item = localStorage.getItem(key);
          try {
            const parsed = JSON.parse(item || '{}');
            openFiles.push(parsed.filePath);
          } catch {
            console.log(
              'Item from localStorage not included in openFiles: ',
              item,
            );
          }
        }
      }
      // Copy of initialState to enture we are not mutating it
      const currentState = { ...initialState }
      this.setState(Object.assign(currentState, stateJS, { openFiles }));
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
        <div className="draggable" />
        <LeftNav
          fileOpened={this.state.fileOpened}
          fileOpen={this.fileOpen}
          selectedContainer={this.state.selectedContainer}
          service={this.state.services[this.state.selectedContainer]}
          currentFile={this.state.filePath}
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
          <TabBar
            activePath={this.state.filePath}
            openFiles={this.state.openFiles}
            switchToTab={this.switchToTab}
            closeTab={this.closeTab}
          />
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
