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

import { State } from './App.d';

const initialState: State = {
  selectedContainer: '',
  fileUploaded: false,
  services: {},
  dependsOn: {},
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
};

class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = initialState;

    this.fileUploaded = this.fileUploaded.bind(this);
  }

  fileUploaded() {
    this.setState(state => {
      return {
        ...state,
        fileUploaded: state.fileUploaded ? false : true,
      };
    });
  }

  render() {
    return (
      <div className="app">
        <LeftNav fileUploaded={this.fileUploaded} />
        <OptionBar />
        <D3Wrapper />
      </div>
    );
  }
}

export default App;
