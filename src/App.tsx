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

// IMPORT REACT CONTAINERS OR COMPONENTS
import { LeftNav } from './containers/LeftNav';
import Title from './components/Title';
import Button from 'react-bootstrap/Button';
import FileSelector from './components/FileUpload';

//bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';

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
      <div>
        <Title projectName={this.state.projectName} />
        <LeftNav />
        <Button variant="secondary">hello noobs</Button>
        <FileSelector />
      </div>
    );
  }
}

export default App;
