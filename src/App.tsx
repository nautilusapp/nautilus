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

type State = {
  projectName: string;
};


class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      projectName: 'Nautilus',
    }

  }
  render() {
    return (
      <div className="app" >
        <LeftNav projectName={this.state.projectName} />
        <OptionBar />
        <D3Wrapper />
      </div>
    );
  }
}

export default App;
