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
import LeftNav from './components/LeftNav';

//bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.scss';

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
      </div>
    );
  }
}

export default App;
