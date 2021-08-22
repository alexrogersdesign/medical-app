/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import { reducer, StateProvider } from "./state";
import { debugContextDevtool } from 'react-context-devtool';


const container = document.getElementById("root");

ReactDOM.render(
  <StateProvider reducer={reducer}>
    <App />
  </StateProvider>,
  container
);
debugContextDevtool(container);
