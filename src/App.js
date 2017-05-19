// @flow
import React, { Component } from 'react';
import ninjalogo from './ninja.svg';
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
};

class App extends Component {
  socket: Object;

  state = {
    messages: [],
    ownRoomNumber: -1,
    connectedToRoom: '',
    status: 'Connecting..',
  };

  componentDidMount = () => {
    this.socket = SocketIOClient(process.env.REACT_APP_BACKEND_URL);

    this.socket.on('connect', () => {
      this.setState({
        status: 'Connected to server',
      })
    });
    this.socket.on('connect_error', () => {
      this.setState({
        status: 'Connection to server failed',
        ownRoomNumber: -1,
      })
    });
    this.socket.on('message', (message) => {
      const msgs = this.state.messages;
      msgs.unshift(message);

      this.setState({
        messages: msgs,
      });
    });
    this.socket.on('registered', (room) => {
      this.setState({
        ownRoomNumber: room,
      });
    });
    this.socket.on('subscribed', (room) => {
      this.setState({
        status: `Connected to device with ID ${room}`,
        connectedToRoom: room,
      });
    });
    this.socket.on('deviceid-not-exists', () => {
      this.setState({
        status: 'Device ID doesn\'t exists. Enter the device ID of the other device',
        connectedToRoom: '',
        // @todo: Trigger error on Connect input element
      });
    });
  };

  sendMessage = (message: string) => {
    this.socket.emit('publish', message);
  };

  connectToRoom = (room: string) => {
    this.socket.emit('join', room);
  };

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>

          <AppBar
            title="Clipboard.ninja"
            iconElementLeft={<img src={ninjalogo} alt="logo" height="50px" />}
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            showMenuIconButton={true}
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
                  />
              </CardText>
            </Card>
            <Card style={style.cardRight}>
              <CardTitle
                title="Receive"
                subtitle="The text of the other device will be shown here"
              />
              <CardText>
                <Receive
                  receivedMessages={this.state.messages}
                  />
              </CardText>
            </Card>
          </div>
          <footer style={style.footer}>
            Created by <a href="https://www.trafex.nl">Tim de Pater</a> - Check out the <a href="https://github.com/trafex/clipboard.ninja">source on GitHub</a>
          </footer>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
