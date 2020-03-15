/**
 * ************************************
 *
 * @module  App.tsx
 * @author Joshua Nordstrom, Tyler Hurtt
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

import { State, FileUpload, /*View,*/ Options, UpdateOption, UpdateView } from './App.d';
import { stat } from 'fs';
import { stringify } from 'querystring';

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
    // this.updateOption = this.updateOption.bind(this);
  }
  
  updateView: UpdateView = (view) => {
    // console.log('in updateView...');
    // console.log('current view in state...', this.state.view);
    // console.log('...', view);
    // console.log('changing state...');
      this.setState(state => {
        return {
          ...state, view
        }
      })
  };

  updateOption: UpdateOption = option => {
    console.log('in updateOption...');
    console.log('current options in state...', this.state.options);
    console.log('option...', option);
    // console.log('grabbing that options value from state...', this.state.options[option])
    const clone: object = Object.assign(this.state.options)
    this.setState(state => {
      return {
        ...state,        }
      }
    )
    console.log('stateOptions...', this.state.options);
  };

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
        <LeftNav fileUpload={this.fileUpload} />
        <OptionBar
          view={this.state.view}
          options={this.state.options}
          updateView={this.updateView}
          updateOption={this.updateOption} 
        />
        <D3Wrapper />
      </div>
    );
  }
}

export default App;
