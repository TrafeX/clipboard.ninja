// @flow
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import muiThemeable from 'material-ui/styles/muiThemeable';
import spinner from 'most-awesome-spinner-ever';

const style = {
  button: {
    margin: 12,
  },
};

class Connect extends Component {
  props: {
    ownRoomNumber: number,
    connectedToRoom: string,
    connectToRoom: (number) => void,
    muiTheme: Object,
  };
  state = {
    roomNumber: '',
    spinner: ' ',
  };
  state: {
    roomNumber: number,
    spinner: string,
  };

  componentDidMount = () => {
    spinner((char) => {
      this.setState({
        spinner: char,
      }
    )}, 200);
  };

  connectToRoom = () => {
    if (this.state.roomNumber === '') {
      return null;
    }
    this.props.connectToRoom(this.state.roomNumber);
  };

  handleChange = (event: Object) => {
    this.setState({
      roomNumber: event.target.value,
    })
  };

  render() {
    if (this.props.connectedToRoom !== '') {
      return null;
    }

    // @todo: Add spacing between first 3 and last 3 numbers
    let ownRoomNumber = this.props.ownRoomNumber;
    if (ownRoomNumber === -1) {
      ownRoomNumber = `Waiting for server connection.. ${this.state.spinner}`;
    }
    return (
      <div>
        <h3>
          Device ID:&nbsp;
          <span style={{color: this.props.muiTheme.palette.accent1Color}}>
            <strong>
              {ownRoomNumber}
            </strong>
          </span>
        </h3>
        <p>
          Use the above Device ID to connect to the other device.<br />
          Or enter the Device ID of the other device below.
        </p>
        <TextField
          type="number"
          floatingLabelText="Enter the device ID"
          value={this.state.roomNumber}
          onChange={this.handleChange}
        />
        <RaisedButton
            label="Connect"
            primary={true}
            style={style.button}
            onClick={() => this.connectToRoom()}
            disabled={this.state.roomNumber === ''}
          />
      </div>
    );
  }
}

export default muiThemeable()(Connect);
