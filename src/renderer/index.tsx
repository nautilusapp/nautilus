/**
 * ************************************
 *
 * @module  index.tsx
 * @author Joshua Nordstrom
 * @date 3/7/20
 * @description entry point for application.  Hangs React app off of #root in index.html
 *
 * ************************************
 */

import * as React from 'react';
import { render } from 'react-dom';
import App from './App';
import { Simulation, SGraph } from '../renderer/App.d';

if (module.hot) {
  module.hot.accept();
}

declare global {
  interface Window {
    simulation: Simulation;
    treeDepth: number;
    serviceGraph: SGraph;
  }
}

render(
  <>
    <App />
  </>,
  document.getElementById('app'),
);
