import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const MOUNT_NODE = document.getElementById('app');

const render = () => ReactDOM.render(
  <App/>,
  MOUNT_NODE
);

if (module.hot) {
  module.hot.accept(App, function() {
    // HMR
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

render();