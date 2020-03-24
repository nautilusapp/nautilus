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
import { convertYamlToState } from './helpers/yamlParser';

// IMPORT STYLES
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.scss';

// IMPORT REACT CONTAINERS OR COMPONENTS
import LeftNav from './components/LeftNav';
import OptionBar from './components/OptionBar';
import D3Wrapper from './components/D3Wrapper';

import { State, FileUpload, UpdateOption, UpdateView } from './App.d';

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
  view: 'depends_on',
  options: {
    ports: false,
    volumes: false,
    dependsOn: true,
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
          options: { ...state.options, dependsOn: true },
        };
      });
    } else {
      this.setState(state => {
        return {
          ...state,
          view,
          options: { ...state.options, dependsOn: false, selectAll: false },
        };
      });
    }
  };

  getSelected = (state: State): number => {
    console.log('inside getSelected');
    const optionValues = Object.values(state.options);
    let selected = 0;
    console.log(optionValues);
    optionValues.forEach(val => {
      if (val === true) {
        selected += 1;
      }
    });
    console.log(selected);
    return selected;
  };

  allSelected = (state: State): boolean => {
    console.log('inside allSelected');
    if (this.getSelected(state) === 4) {
      console.log('true');
      return true;
    } else {
      console.log('false');
      return false;
    }
  };

  firstThree = (state: State): boolean => {
    console.log('inside firstThree');
    const selected = this.getSelected(state);
    if (selected === 3) return true;
    console.log('first three = false');
    return false;
  };

  updateOption: UpdateOption = e => {
    const option = e.currentTarget.id;
    // const optionValues = Object.values(this.state.options);
    const selectAllClicked = option === 'selectAll' ? true : false;
    console.log('selectAllClicked clicked = ', selectAllClicked);
    let newState: State = {
      ...this.state,
      options: { ...this.state.options, [option]: !this.state.options[option] },
    };
    if (this.firstThree(newState) === true) {
      console.log('setting selectAll to true because first three are true');
      newState = {
        ...newState,
        options: { ...newState.options, selectAll: true },
      };
    }
    if (this.allSelected(this.state) && selectAllClicked) {
      if (this.state.view === 'depends_on') {
        newState = {
          ...this.state,
          options: {
            ports: false,
            volumes: false,
            dependsOn: true,
            selectAll: false,
          },
        };
      } else {
        newState = {
          ...this.state,
          options: {
            ports: false,
            volumes: false,
            dependsOn: false,
            selectAll: false,
          },
        };
      }
    } else if (!this.allSelected(this.state) && selectAllClicked) {
      newState = {
        ...this.state,
        options: {
          ports: true,
          volumes: true,
          dependsOn: true,
          selectAll: true,
        },
      };
    }
    this.setState({
      ...newState,
    });
    // if (option != 'selectAll') {
    //   this.setState(state => {
    //     return {
    //       ...state,
    //       options: { ...state.options, [option]: !state.options[option] },
    //     };
    //   });
    // } else {
    //   for (let i = 0; i < optionValues.length - 1; i++) {
    //     if (optionValues[i] === false) {
    //       return this.setState(state => {
    //         return {
    //           ...state,
    //           options: {
    //             ports: true,
    //             volumes: true,
    //             dependsOn: true,
    //             selectAll: true,
    //           },
    //         };
    //       });
    //     } else {
    //       if (this.state.view === 'depends_on') {
    //         return this.setState(state => {
    //           return {
    //             ...state,
    //             options: {
    //               ports: false,
    //               volumes: false,
    //               dependsOn: true,
    //               selectAll: false,
    //             },
    //           };
    //         });
    //       } else {
    //         return this.setState(state => {
    //           return {
    //             ...state,
    //             options: {
    //               ports: false,
    //               volumes: false,
    //               dependsOn: false,
    //               selectAll: false,
    //             },
    //           };
    //         });
    //       }
    //     }
    //   }
    // }
  };

  convertAndStoreYamlJSON = (yamlText: string) => {
    const yamlJSON = yaml.safeLoad(yamlText);
    const yamlState = convertYamlToState(yamlJSON);
    localStorage.setItem('state', JSON.stringify(yamlState));
    this.setState(Object.assign(initialState, yamlState));
  };

  fileUpload: FileUpload = (file: File) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.result) {
        this.convertAndStoreYamlJSON(fileReader.result.toString());
      }
    };
    fileReader.readAsText(file);
  };

  componentDidMount() {
    ipcRenderer.on('file-uploaded-within-electron', (event, arg) => {
      this.convertAndStoreYamlJSON(arg);
    });
    const stateJSON = localStorage.getItem('state');
    if (stateJSON) {
      const stateJS = JSON.parse(stateJSON);
      this.setState(Object.assign(initialState, stateJS));
    }
  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners('file-uploaded-within-electron');
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
            options={this.state.options}
            volumes={this.state.volumes}
            bindMounts={this.state.bindMounts}
            view={this.state.view}
            networks={this.state.networks}
          />
        </div>
      </div>
    );
  }
}

export default App;
