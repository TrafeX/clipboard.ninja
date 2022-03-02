import React from 'react';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-snapshot';
import { createInstance, MatomoProvider } from '@datapunt/matomo-tracker-react';

const matomoInstance = createInstance({
  urlBase: 'https://matomo.trafex.nl',
  siteId: 2,
  linkTracking: false
});

render((
  <BrowserRouter>
    <MatomoProvider value={matomoInstance}>
      <App />
    </MatomoProvider>
  </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
