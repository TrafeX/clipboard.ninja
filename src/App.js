// @flow
import React from 'react';
import {orange600, orange800, blueGrey400} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Helmet} from "react-helmet";
import {Route, Switch} from 'react-router-dom';
import AppHeader from './AppHeader';
import Clipboard from './Clipboard';
import About from './About';
import withTracker from './withTracker';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: orange600,
    accent1Color: orange800,
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

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div style={style.background}>
      <Helmet>
        <link rel="manifest" href="/manifest-v1.json" />
      </Helmet>
      <AppHeader/>
      <Switch>
        <Route exact path="/" component={withTracker(Clipboard)}/>
        <Route path="/index.html" component={withTracker(Clipboard)}/>
        <Route path="/about.html" component={withTracker(About)}/>
      </Switch>
      <footer style={style.footer}>
        <a href="https://github.com/TrafeX/clipboard.ninja/blob/master/PRIVACY.md" style={style.a} target="_blank" rel="noopener noreferrer">Privacy Policy</a> - <a href="https://github.com/trafex/clipboard.ninja" style={style.a} target="_blank" rel="noopener noreferrer">Source on GitHub</a> - Created by <a href="https://www.trafex.nl" style={style.a} target="_blank" rel="noopener noreferrer">Tim de Pater</a>
      </footer>
    </div>
  </MuiThemeProvider>
);

export default App;
