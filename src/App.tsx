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
import { render } from 'react-dom';

// IMPORT REACT CONTAINERS OR COMPONENTS
import Title from './components/Title';

type AppState = {
  projectName: string,
}

class App extends Component<{}, AppState> {
  state: {
    projectName: 'Nautilus',
  }

  render() {
    return (
      <>
        <Title projectName={this.state.projectName}/>
      </>
    )
  }
}

export default App;