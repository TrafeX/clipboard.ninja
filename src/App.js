// @flow
import React, { Component } from 'react';
import ninjalogo from './ninja.svg';
import manifest from './manifest.json';
import Send from './Send';
import Receive from './Receive';
import Connect from './Connect';
import Status from './Status';
import InfoTabs from './InfoTabs';
import SocketIOClient from 'socket.io-client';
import {orange600, orange800, blueGrey400} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import {Helmet} from "react-helmet";
import ReactGA from 'react-ga';

ReactGA.initialize(process.env.REACT_APP_GA_CODE);

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
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexFlow: 'row wrap'
  },
  cardLeft: {
    flex: 1,
    textAlign: 'center',
    margin: 10,
  },
  cardRight: {
    flex: 1,
    textAlign: 'center',
    margin: 10
  },
  tabs: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignContent: 'flex-start',
  },
  footer: {
    color: blueGrey400,
    margin: 10,
  },
  a: {
    color: blueGrey400,
  },
};

class App extends Component {
  socket: Object;

  state = {
    messages: [],
    ownRoomNumber: null,
    connectedToRoom: null,
    status: '',
    usersInRoom: 0,
  };
  state: {
    messages: Array<string>,
    ownRoomNumber: ?number,
    connectedToRoom: ?number,
    status: string,
    usersInRoom: number,
  };

  componentDidMount = () => {
    this.socket = SocketIOClient(process.env.REACT_APP_BACKEND_URL);

    this.socket.on('connect_error', () => {
      this.setState({
        status: 'Connection to server failed',
        ownRoomNumber: null,
      })
    });
    this.socket.on('message', (message: string) => {
      const msgs = this.state.messages;
      msgs.unshift(message);

      this.setState({
        messages: msgs,
      });
    });
    this.socket.on('registered', (room: number) => {
      this.setState({
        ownRoomNumber: room,
      });
    });
    this.socket.on('subscribed', (room: number, usersInRoom: number) => {
      this.setState({
        status: `Connected to device with ID ${room}`,
        ownRoomNumber: room,
        connectedToRoom: room,
        usersInRoom: usersInRoom,
      });
    });
    this.socket.on('unsubscribed', (usersInRoom: number) => {
      if (usersInRoom <= 1) {
        // Only one left in room
        this.setState({
          status: 'The other device is gone',
          connectedToRoom: null,
          usersInRoom: usersInRoom,
        });
      }
      this.setState({
        usersInRoom: usersInRoom,
      });
    });
    this.socket.on('deviceid-not-exists', () => {
      this.setState({
        status: 'Device ID doesn\'t exists. Enter the device ID of the other device',
        connectedToRoom: null,
        // @todo: Trigger error on Connect input element
      });
    });
  };

  sendMessage = (message: string) => {
    this.socket.emit('publish', message);
    ReactGA.event({
      category: 'user-interaction',
      action: 'publish-message'
    });
  };

  connectToRoom = (room: ?number) => {
    this.socket.emit('join', room);
    ReactGA.event({
      category: 'user-interaction',
      action: 'connect-to-device'
    });
  };

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Helmet>
            <link rel="manifest" href={manifest} />
          </Helmet>
          <AppBar
            title="Clipboard.ninja"
            iconElementLeft={<img src={ninjalogo} alt="logo" height="50px" />}
          />
          <Status
            status={this.state.status}
            />
          <InfoTabs />
          <div style={style.container}>
            <Card style={style.cardLeft}>
              <CardTitle
                title="Connect & Send"
                subtitle="First you need to connect to the other device by entering the Device ID"
                />
              <CardText style={{paddingTop: 0}}>
                <Connect
                  ownRoomNumber={this.state.ownRoomNumber}
                  connectedToRoom={this.state.connectedToRoom}
                  connectToRoom={this.connectToRoom}
                  />
                <Send
                  connectedToRoom={this.state.connectedToRoom}
                  sendMessage={this.sendMessage}
                  usersInRoom={this.state.usersInRoom}
                  />
              </CardText>
            </Card>
            <Card style={style.cardRight}>
              <CardTitle
                title="Received text"
                subtitle="The text you send to and receive from the other device will be shown here"
                />
              <CardText>
                <Receive
                  receivedMessages={this.state.messages}
                  />
              </CardText>
            </Card>
          </div>
          <footer style={style.footer}>
            Created by <a href="https://www.trafex.nl" style={style.a}>Tim de Pater</a> - Check out the <a href="https://github.com/trafex/clipboard.ninja" style={style.a}>source on GitHub</a>
          </footer>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
