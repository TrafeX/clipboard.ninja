import React from 'react';
import {render} from 'react-dom';
import {renderToString} from 'react-dom/server';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import {BrowserRouter} from 'react-router-dom';
// import { render } from 'react-snapshot';

const renderSwitch = (rootComponent, domElement) => {
  if (navigator.userAgent.match(/Node\.js/i) && window && window.reactSnapshotRender) {
    domElement.innerHTML = renderToString(rootComponent);
    window.reactSnapshotRender()
  } else {
    render(rootComponent, domElement)
  }
};

renderSwitch((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
