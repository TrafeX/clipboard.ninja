import React, { useEffect } from 'react';
import { orange600, orange800, blueGrey400 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'; // v1.x
import { MuiThemeProvider as V0MuiThemeProvider } from 'material-ui';
import { Helmet } from "react-helmet";
import ReactGA from 'react-ga';
import { Route, Switch, useHistory } from 'react-router-dom';
import AppHeader from './components/AppHeader';
import Clipboard from './components/Clipboard';
import About from './components/About';
import { createInstance, MatomoProvider, useMatomo } from '@datapunt/matomo-tracker-react';
import { socket, SocketContext } from './context/SocketContext';
import Status from './components/Status';
import useSocketClient from './hooks/useSocketClient';

const muiThemeV0 = getMuiTheme({
  palette: {
    primary1Color: orange600,
    accent1Color: orange800,
  },
  tabs: {
    backgroundColor: blueGrey400,
  },
});

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: orange600,
    },
    secondary: {
      main: orange800,
    }
  },
  tabs: {
    backgroundColor: blueGrey400,
  },
});

const style = {
  footer: {
    color: blueGrey400,
    margin: 10,
    paddingLeft: 10,
  },
  a: {
    color: blueGrey400,
  },
  background: {
    backgroundColor: blueGrey400,
    paddingBottom: 10,
    height: 240,
  }
};

const matomoInstance = createInstance({
  urlBase: 'https://matomo.trafex.nl',
  siteId: 2,
  linkTracking: false
});

ReactGA.initialize(process.env.REACT_APP_GA_CODE, {
  gaOptions: {
    siteSpeedSampleRate: 10
  }
});

const App = () => {

  const { trackPageView, enableLinkTracking } = useMatomo()
  enableLinkTracking();

  const history = useHistory();

  // Track page view
  useEffect(() => {
    trackPageView()
    history.listen(trackPageView) // To track the subsequent pageviews
  }, [history, trackPageView])

  useEffect(() => {
    const trackPage = () => {
      ReactGA.set({ page: history.location.pathname });
      ReactGA.pageview(history.location.pathname);
    };

    trackPage();
    history.listen(trackPage); // To track the subsequent pageviews
  }, [history]);

  const { ownRoomNumber, connectedToRoom, status, usersInRoom, messages } = useSocketClient(socket);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <V0MuiThemeProvider muiTheme={muiThemeV0}>
        <MatomoProvider value={matomoInstance}>
          <SocketContext.Provider value={socket}>
            <div style={style.background}>
              <Helmet>
                <link rel="manifest" href="/manifest-v1.json" />
              </Helmet>
              <AppHeader />
              <Status
                status={status}
              />
              <Switch>
                <Route exact path="/">
                  <Clipboard ownRoomNumber={ownRoomNumber} connectedToRoom={connectedToRoom} usersInRoom={usersInRoom} messages={messages} />
                </Route>
                <Route path="/index.html">
                  <Clipboard ownRoomNumber={ownRoomNumber} connectedToRoom={connectedToRoom} usersInRoom={usersInRoom} messages={messages} />
                </Route>
                <Route path="/about.html">
                  <About />
                </Route>
              </Switch>
              <footer style={style.footer}>
                <a href="https://github.com/TrafeX/clipboard.ninja/blob/master/PRIVACY.md" style={style.a} target="_blank" rel="noopener noreferrer">Privacy Policy</a> - <a href="https://github.com/trafex/clipboard.ninja" style={style.a} target="_blank" rel="noopener noreferrer">Source on GitHub</a> - Created by <a href="https://www.trafex.nl" style={style.a} target="_blank" rel="noopener noreferrer">Tim de Pater</a>
              </footer>
            </div>
          </SocketContext.Provider>
        </MatomoProvider>
      </V0MuiThemeProvider>
    </MuiThemeProvider>
  )
};

export default App;
