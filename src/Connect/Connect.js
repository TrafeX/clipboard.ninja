// @flow
import React, { Component } from 'react';

import './index.css';

class Connect extends Component {
  room: Object;
  props: {
    ownRoomNumber: number,
    connectedToRoom: string,
    connectToRoom: Function,
  };

  connectToRoom = () => {
    this.props.connectToRoom(this.room.value);
  };

  render() {
    return (
      <div className="Connect">
        <h3>Connect</h3>
        <div>{`Own room number: ${this.props.ownRoomNumber}`}</div>
        <div>{`Connected to room: ${this.props.connectedToRoom}`}</div>
        <input ref={(input: Object) => { this.room = input; }} />
        <input type="submit" onClick={() => this.connectToRoom()} />
      </div>
    );
  }
}

export default Connect;
