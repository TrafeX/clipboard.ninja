// @flow
import React, { Component } from 'react';
import Send from './../Send';
import Receive from './../Receive';
import Connect from './../Connect';
import Status from './../Status';
import {blueGrey400} from 'material-ui/styles/colors';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import {io} from 'socket.io-client';
import ReactGA from 'react-ga';

const style = {
  cardLeft: {
    flex: '1 1 400px',
    textAlign: 'center',
    margin: 10,
  },
  cardRight: {
    flex: '1 1 400px',
    textAlign: 'center',
    margin: 10,
  },
  footer: {
    color: 'white',
    margin: 10,
    paddingLeft: 10,
  },
  a: {
    color: 'white',
  },
  background: {
    backgroundColor: blueGrey400,
    paddingBottom: 10,
    height: 240,
  }
};
type Props = {};
type State = {
  messages: Array<string>,
  ownRoomNumber: ?number,
  connectedToRoom: ?number,
  status: string,
  usersInRoom: number,
};

class Clipboard extends Component<Props, State> {
  socket: Object;

  state = {
    messages: [],
    ownRoomNumber: null,
    connectedToRoom: null,
    status: '',
    usersInRoom: 0,
  };

  componentDidMount = () => {

    // @todo: Move this to higer component to keep the socket alive?
    this.socket = io(process.env.REACT_APP_BACKEND_URL);

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

  componentWillUnmount = () => {
    this.socket.disconnect();
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
      <div className="container">
        <Status
          status={this.state.status}
        />
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
    );
  }
}

export default Clipboard;
