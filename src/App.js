// @flow
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Send from './Send';
import Receive from './Receive';
import Connect from './Connect';
import SocketIOClient from 'socket.io-client';

class App extends Component {
  socket: Object;

  state = {
    messages: '',
    ownRoomNumber: 0,
    connectedToRoom: '-',
  };

  constructor() {
    super();
    this.socket = SocketIOClient('http://127.0.0.1:3001');
  }

  componentDidMount = () => {
    this.socket.on('connect', () => {
      console.log('Connected!');
    });

    this.socket.on('message', (message) => {
      this.setState({
        messages: message,
      });
    });
    this.socket.on('registered', (room) => {
      this.setState({
        ownRoomNumber: room,
      });
    });
    this.socket.on('subscribed', (room) => {
      this.setState({
        connectedToRoom: room,
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
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <Connect
          ownRoomNumber={this.state.ownRoomNumber}
          connectedToRoom={this.state.connectedToRoom}
          connectToRoom={this.connectToRoom}
          />
        <Send
          sendMessage={this.sendMessage}
          />
        <Receive
          receivedMessage={this.state.messages}
          />
      </div>
    );
  }
}

export default App;
